import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: false,
  })
  success: boolean;

  @ApiProperty({ description: 'HTTP status code of the error', example: 400 })
  statusCode: number;

  @ApiProperty({
    description: 'Error message explaining the issue',
    example: 'Insufficient stock for product ID abc123.',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error object with field-specific errors (optional)',
    example: {
      product_id: ['Product ID must be a string.'],
    },
    required: false,
  })
  error?: Record<string, any>;
}
