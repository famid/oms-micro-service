import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponseDto {
  @ApiProperty({ description: 'Product ID', example: 'abc123' })
  product_id: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Price of the product', example: 50.0 })
  price: number;
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Order ID', example: 'order123' })
  id: string;

  @ApiProperty({ description: 'Customer ID', example: 'user123' })
  customer_id: string;

  @ApiProperty({ description: 'Total order amount', example: 150.0 })
  total_amount: number;

  @ApiProperty({ description: 'Order status', example: 'PENDING' })
  status: string;

  @ApiProperty({
    description: 'Array of items in the order',
    type: [OrderItemResponseDto],
  })
  order_items: OrderItemResponseDto[];

  @ApiProperty({
    description: 'Order creation timestamp',
    example: '2023-01-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Order last updated timestamp',
    example: '2023-01-02T12:00:00Z',
  })
  updated_at: Date;
}

export class PaginatedOrderResponseDto {
  @ApiProperty({ description: 'Current page number', example: 1 })
  current_page: number;

  @ApiProperty({ description: 'Number of orders per page', example: 10 })
  per_page: number;

  @ApiProperty({ description: 'Total number of orders', example: 100 })
  total: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  total_pages: number;

  @ApiProperty({
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  orders: OrderResponseDto[];
}
