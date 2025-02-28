import { Injectable } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {

    constructor(
            @InjectRepository(Customer) private readonly customerRepository:Repository<Customer>,
    ){}

    async create(createCustomerDto: createCustomerDto): Promise<Customer>{
        const { name,email,address} = createCustomerDto;
        const customer = this.customerRepository.create({
            name,
            email,
            address
        });
        //await - async
        const savedCustomer = await this.customerRepository.save(customer);
        return await this.customerRepository.findOne({
            where: {id: savedCustomer.id}
        });
    }
    async fetch(id:any){
        return await this.customerRepository.findOne({
            where: {id},
        });
    }
    async fetchAll(){
        return await this.customerRepository.find({});
    }

}
