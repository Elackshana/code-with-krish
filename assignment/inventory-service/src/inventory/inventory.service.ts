import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './dto/create-product.dto';
import { Kafka } from 'kafkajs';
import {Redis} from 'ioredis';

@Injectable()
export class InventoryService implements OnModuleInit {

    private readonly redis = new Redis({host:'3.0.159.213', port:6379});
  private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});
  //'3.0.159.213:9092'
  //'localhost:9092'
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({groupId: 'elackshana-inventory-service'});

    constructor(
        @InjectRepository(Product) private readonly inventoryRepository:Repository<Product>,
    ){}

    async onModuleInit() {
    
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumerOrderCreated();
    
    }

    async consumerOrderCreated(){
        await this.consumer.subscribe({ topic: 'elackshana.order.create'});
         await this.consumer.run({
            eachMessage: async ({ message}) => {
              console.log(`new meesage arrived at product------------------------------------------------`);
                const { customerId, customerName, items } = JSON.parse(
                  message.value.toString(),
                );
                for ( const item of items){
                  await this.reduceStock(item.productId, item.quantity);
                }
    
                //.........................
                //release the lock
                for(const item of items){
                  const lockKey = `elackshana.product:${item.productId}:lock`;
                  await this.redis.del(lockKey)
                  console.log(' the lock released------------------------------')
                }
    
    
                await this.producer.send({
                  topic: 'elackshana.order.inventory.update',
                  messages: [
                    {value: JSON.stringify({customerId, customerName, items})}],
                })
            }
         })
      }
    

    async create(createProductDto: createProductDto): Promise<Product>{
        const { name , price, quantity } = createProductDto;
        const product = this.inventoryRepository.create({
            name , 
            price, 
            quantity
        });
        //await - async
        const savedProduct = await this.inventoryRepository.save(product);
        return await this.inventoryRepository.findOne({
            where: {id: savedProduct.id}
        });
    }
    async get(id:any){
        return await this.inventoryRepository.findOne({
            where: {id},
        });
    }
    async getAll(){
        return await this.inventoryRepository.find({});
    }
    async validateStock(
        id: number,
        quantity: number,
      ): Promise<{ available: boolean }> {
        const product = await this.get(id);
        return { available: product.quantity >= quantity };
    }
    async reduceStock(id: number, quantity: number): Promise<Product> {
        const product = await this.get(id);
        if (product.quantity < quantity) {
          throw new BadRequestException(`Not enough stock for Product ID ${id}`);
        }
        product.quantity -= quantity;
        return this.inventoryRepository.save(product);
    }

}
