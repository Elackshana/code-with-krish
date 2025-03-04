import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrdersStatus } from './dto/update-order.dto';
//import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';
import {Redis} from 'ioredis';

@Injectable()
export class OrdersService  implements OnModuleInit{

    private readonly redis = new Redis({host:'3.0.159.213', port:6379});

  //private readonly Kafka = new Kafka({brokers: ['localhost:9092']});
  private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({groupId: 'elackshana-order-service'});

//   private readonly inventoryServiceUrl = 'http://localhost:3001/products';
//   private readonly customerServiceUrl = 'http://localhost:3002/customers';

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        //private readonly httpService: HttpService,
    ) {}

    async onModuleInit() {
    
        await this.producer.connect();
        await this.consumer.connect();
    
        await this.consumeConfiremedOrders();
    
    }
    async create(createOrderDto: createOrderDto): Promise<any> {
        const { customerId, items, city } = createOrderDto;
        //--------customer
        // Validate customer exists
        // let customerName = '';
        // try {
        //   const response$ = this.httpService.get(
        //     `${this.customerServiceUrl}/${customerId}`,
        //   );
        //   const response = await lastValueFrom(response$);
        //   customerName = response.data.name;
        // } catch (error) {
        //   throw new BadRequestException(
        //     `Customer ID ${customerId} does not exist.`,
        //   );
        // }
        //--------------
        //aquare lock
        for(const item of items){
          const lockKey = `elackshana.product:${item.productId}:lock`;
          const lock = await this.redis.set(
              lockKey, 
              'locked',
              'EX', 
              3600*24, 
              'NX'
            );//NX- to save it into a ATOMIC low //can use current timestamp for 'locked'
            if(!lock){
              throw new BadRequestException(
                `Product id ${item.productId} is locked for processing--------------------`
              )
            }
    
        }
    
        //-----------------
        //producer order an event
    
        this.producer.send({
          topic:`elackshana.order.create`,
          messages:[
            {value : JSON.stringify({ customerId, items, city})}
          ],
    
        });
        return { message: `order is placed. waiting inventory service to process`};
    
        //---------
        /*
        for (const item of items) {
          try {
            const response$ = this.httpService.get(
              `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`,
            );
            const response = await lastValueFrom(response$);
            if (!response.data.available) {
              throw new BadRequestException(
                `Product ID ${item.productId} is out of stock.`,
              );
            }
          } catch (error) {
            throw new BadRequestException(
              `Error checking stock for Product ID ${item.productId}: ${error.message}`,
            );
          }
        }
        //---------
    
        const order = this.orderRepository.create({
          customerId,
          status: 'PENDING',
          city,
        });
        const savedOrder = await this.orderRepository.save(order);
    
        const orderItems = items.map((item) =>
          this.orderItemRepository.create({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
            order: savedOrder,
          }),
        );
        const savedOrderItems = await this.orderItemRepository.save(orderItems);
    
        // Reduce stock in Inventory Service
        for (const item of savedOrderItems) {
          try {
            await lastValueFrom(
              this.httpService.patch(
                `${this.inventoryServiceUrl}/${item.productId}/quantity`,
                { quantity: item.quantity },
              ),
            );
          } catch (error) {
            throw new BadRequestException(
              `Failed to reduce stock for Product ID ${item.productId}`,
            );
          }
        }
        return { ...savedOrder, customerName, items: orderItems }; */
    
    }
    

    async fetch(id:any){
        return await this.orderRepository.findOne({
            where: {id},
            relations:['items'],
        });
    }
    async fetchAll(){
        return await this.orderRepository.find({relations: ['items']});
    }
    async updateOrderStatus(id: number, updateStatus: UpdateOrdersStatus) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
          throw new NotFoundException(`order with id: ${id} is not found`);
        }
        if (
          order.status === OrderStatus.DELEVERED ||
          order.status === OrderStatus.CANCELED
        ) {
          throw new BadRequestException(
            `order status cannot be changed when its delivered or cancelled`,
          );
        }
        order.status = updateStatus.status;
        return await this.orderRepository.save(order);
      }
      async consumeConfiremedOrders(){
        await this.consumer.subscribe({ topic: 'elackshana.order.inventory.update'});
         await this.consumer.run({
            eachMessage: async ({ message}) => {
              console.log(`new meesage arrived in order service------------------------------------------------`);
                const { customerId, customerName, items } = JSON.parse(
                  message.value.toString(),
                );
                const order = this.orderRepository.create({
                  customerId,
                  status: OrderStatus.CONFIRMED,
                });
                //
                const savedOrder = await this.orderRepository.save(order);
    
                const orderItems = items.map(
                  (item) => 
                    this.orderItemRepository.create({
                    productId: item.productId,
                    price: item.price,
                    quantity: item.quantity,
                    order: savedOrder,
                  }),
                );
                await this.orderItemRepository.save(orderItems);
    
                //publishing event to "order.confirmed" topic
                await this.producer.send({
                  topic:`elackshana.order.confirmed`,
                  messages:[
                    {value : JSON.stringify({ 
                      customerId, customerName, items
                    }),
                  },
                  ],
            
                });
                console.log(`order confirmed event published -----------------------------`)
                
            }
         });
      }
}
