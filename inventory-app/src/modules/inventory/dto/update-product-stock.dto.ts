import { IsInt, Min } from 'class-validator';

export class UpdateProductStockDto {
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be greater than zero.' })
  quantity: number;
}
