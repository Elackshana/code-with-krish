import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { DispatcherController } from './dispatcher.controller';

@Module({
  providers: [DispatcherService],
  controllers: [DispatcherController]
})
export class DispatcherModule {}
