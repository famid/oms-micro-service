import { Module } from '@nestjs/common';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'inventory_exchange',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: {
        wait: false,
      },
      enableControllerDiscovery: true,
    }),
  ],
  exports: [RabbitMQProviderModule],
})
export class RabbitMQProviderModule {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(
    exchange: string,
    routingKey: string,
    msg: object,
    options?: object,
  ) {
    this.amqpConnection.publish(exchange, routingKey, msg, options);
  }
}
