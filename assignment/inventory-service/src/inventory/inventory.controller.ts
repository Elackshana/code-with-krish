import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Product } from './entity/product.entity';
import { createProductDto } from './dto/create-product.dto';

@Controller('products')
export class InventoryController {
    constructor(private readonly inventeryService: InventoryService){}

    @Post()
    async create(@Body() createProductDto:createProductDto): Promise<Product>{
        return await this.inventeryService.create(createProductDto);
    }
    @Get(':id')
    async get(@Param('id') id: number){
        return await this.inventeryService.get(id);
    }

    @Get()
    async getAll(){
        return await this.inventeryService.getAll();
    }
    @Get(':id/validate')
    async validateStock(
        @Param('id') id: number,
        @Query('quantity') quantity: number,
    ): Promise<{ available: boolean }> {
        return this.inventeryService.validateStock(id, quantity);
    }
    @Patch(':id/quantity')
    async reduceStock(
        @Param('id') id: number,
        @Body('quantity') quantity: number,
    ): Promise<Product> {
        return this.inventeryService.reduceStock(id, quantity);
    }
    
}
