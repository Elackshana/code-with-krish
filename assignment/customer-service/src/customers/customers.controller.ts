import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './entity/customer.entity';
import { createCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService){}

    @Post()
    async create(@Body() createCustomerDto:createCustomerDto): Promise<Customer>{
        return await this.customersService.create(createCustomerDto);
    }
    @Get(':id')
    async fetch(@Param('id') id: number){
        return await this.customersService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return await this.customersService.fetchAll();
    }
}
