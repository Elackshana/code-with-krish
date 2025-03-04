import { Body, Controller, Post } from '@nestjs/common';
import { createDispatcherDto } from './dto/createDispatcherDto';
import { Dispatcher } from './entity/dispatcher.entity';
import { DispatcherService } from './dispatcher.service';

@Controller('dispatcher')
export class DispatcherController {
    constructor(private dispatcherService: DispatcherService){}

    @Post()
    async create(@Body() dispatcherDto:createDispatcherDto): Promise<Dispatcher>{
        return await this.dispatcherService.create(createDispatcherDto);
    }
}
