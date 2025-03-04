import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService {
    private readonly Kafka = new Kafka({brokers: ['3.0.159.213:9092']});
    //'3.0.159.213:9092'
    //'localhost:9092'
    private readonly consumer = this.Kafka.consumer({groupId: 'elackshana-notification-service'});

    async onModuleInit() {

        await this.consumer.connect();
        await this.consumeOrderConfirmation();
    
      }
    async consumeOrderConfirmation() {
        await this.consumer.subscribe({ topic: 'elackshana.order.confirmed'});
        await this.consumer.run({
            eachMessage: async ({ message}) => {
                const orderData = JSON.parse(
                    message.value.toString(),
                );
                console.log(`order data :`, orderData);
            },
        });
        console.log(`subscribed to elackshana.order.confirmed topic-------------------`)

    }

}
