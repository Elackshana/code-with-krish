import { Module } from '@nestjs/common';
import { DispatcherModule } from './dispatcher/dispatcher.module';
import { Dispatcher } from './dispatcher/entity/dispatcher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DispatcherModule],
  TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'cosmos',
    entities: [Dispatcher],
    synchronize:true, //only on dev, not for production
}),
})
export class AppModule {}
