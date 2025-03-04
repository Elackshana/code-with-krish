import { Injectable } from '@nestjs/common';
import { Dispatcher } from './entity/dispatcher.entity';

@Injectable()
export class DispatcherService {
    
    constructor(
        @InjectRepository(Dispatcher) private readonly dispatcherRepository: Promise<Dispatcher>,
){}

    // async create(createDispatcherDto: createDispatcherDto):{
    //     const { name,email,address} = createDispatcherDto;
    //     const customer = this.dispatcherRepository.create({
    //         vehicle_number,
    //         city,
    //     });
    //     //await - async
    //     const saved = await this.dispatcherRepository.save(customer);
    //     return await this.dispatcherRepository.findOne({
    //         where: {id: saved.id}
    //     });
    // }
}
