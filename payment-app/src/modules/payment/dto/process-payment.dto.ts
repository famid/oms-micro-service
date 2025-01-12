import { IsUUID, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class ProcessPaymentDto {
    @IsUUID()
    @IsNotEmpty()
    order_id: string;

    @IsNumber()
    @Min(0.01)
    amount: number;
}
