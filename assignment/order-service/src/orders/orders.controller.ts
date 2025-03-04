import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { createOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import { UpdateOrdersStatus } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService){}

    @Post()
    async create(@Body() createOrderDto:createOrderDto): Promise<Order>{
        return await this.orderService.create(createOrderDto);
    }
    @Get(':id')
    async fetch(@Param('id') id: number){
        return await this.orderService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return await this.orderService.fetchAll();
    }
    @Patch(":id/status")
    async updateOrderStatus(@Param('id') id:number, @Body() updateOrderStatus: UpdateOrdersStatus){
        return await this.orderService.updateOrderStatus(id, updateOrderStatus);
    }


}
