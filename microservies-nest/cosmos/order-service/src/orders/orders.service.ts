import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrdersStatus } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepository:Repository<OrderItem>
){}

async create(createOrderDto: createOrderDto): Promise<Order>{
    const { customerId, items} = createOrderDto;
    const order = this.orderRepository.create({
        customerId, 
        status: 'PENDING'
    });
    //await - async
    const savedOrder = await this.orderRepository.save(order);
    const orderItems = items.map((item)=>
        this.orderItemRepository.create({
            productId:item.productId,
            price: item.price,
            quantity: item.quantity,
            order: savedOrder,
        }),
    );

    await this.orderItemRepository.save(orderItems);
    return await this.orderRepository.findOne({
        where: {id: savedOrder.id}, 
        relations:['items']
    });
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
async updateOrderStatus(id:number, updateStatus: UpdateOrdersStatus){
    const order = await this.orderRepository.findOne({where: {id}});
    if(!order){
        throw new NotFoundException(`order with id: ${id} is not found`);
    }
    if(
        order.status === OrderStatus.DELEVERED ||
        order.status === OrderStatus.CANCELED
    ){
        throw new BadRequestException(
            `order status cannot be changed when its delivered or cancelled`
        );
    }
    order.status = updateStatus.status;
    return await this.orderRepository.save(order);
}
}
