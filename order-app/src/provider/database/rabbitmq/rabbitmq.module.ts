import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class RabbitMQModule {
  static registerDynamicQueues(): DynamicModule {
    const queueNames = process.env.RABBITMQ_QUEUES?.split(',') || [];

    const clients = queueNames.map((queueName) => {
      return ClientsModule.registerAsync([
        {
          name: `${queueName.toUpperCase()}_SERVICE`, // Unique name for each client
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RABBITMQ_URL')],
              queue: queueName.trim(),
              queueOptions: {
                durable: true,
              },
            },
          }),
        },
      ]);
    });

    return {
      module: RabbitMQModule,
      imports: [...clients],
      exports: [...clients],
    };
  }
}
