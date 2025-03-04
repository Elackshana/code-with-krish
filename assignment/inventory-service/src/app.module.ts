import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './inventory/entity/product.entity';

@Module({
  imports: [
    InventoryModule, 
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.HOSTNAME || 'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'cosmos',
      entities: [Product],
      synchronize:true, //only on dev, not for production
  }),
  ],
})
export class AppModule {}
