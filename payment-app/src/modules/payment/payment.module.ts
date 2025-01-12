import { Module } from '@nestjs/common';
import {PaymentService} from "./services/payment.service";
import {PaymentController} from "./controllers/payment.controller";
import {PaymentTransaction} from "./entity/payment-transaction.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RabbitMQModule} from "../../provider/rabbitmq/rabbitmq.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentTransaction]),
        RabbitMQModule.registerDynamicQueues(),
        // Import the dynamic RabbitMQ module
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}