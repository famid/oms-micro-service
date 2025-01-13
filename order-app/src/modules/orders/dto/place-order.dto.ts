import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 'abc123' })
  @IsString()
  product_id: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Price of the product', example: 100.5 })
  @IsNumber()
  @Min(0)
  price: number;
}

export class PlaceOrderDto {
  @ApiProperty({ description: 'Customer ID', example: 'user123' })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({ description: 'Array of order items', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order_items: OrderItemDto[];
}
