import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './dto/create-product.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Product) private readonly inventoryRepository:Repository<Product>,
    ){}

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

}
