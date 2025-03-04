import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      NotificationsModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'cosmos',
        entities: [],
        synchronize: true, //only on dev
      }),
      NotificationsModule,
  ],
})
export class AppModule {}
