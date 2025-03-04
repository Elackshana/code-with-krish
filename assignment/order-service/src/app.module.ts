import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassThrough } from 'stream';
import { Order } from './orders/entity/order.entity';
import { OrderItem } from './orders/entity/order-item.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    OrdersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cosmos',
      entities: [Order, OrderItem],
      synchronize: true, //only on dev
  }),
  AuthModule,
],
})
export class AppModule {}
