import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Product } from './entity/product.entity';
import { createProductDto } from './dto/create-product.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private inventeryService: InventoryService){}

    @Post()
    async create(@Body() createProductDto:createProductDto): Promise<Product>{
        return await this.inventeryService.create(createProductDto);
    }
    @Get(':id')
    async fetch(@Param('id') id: number){
        return await this.inventeryService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return await this.inventeryService.fetchAll();
    }
}
