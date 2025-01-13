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
    example: 'Cannot process payment for a completed order.',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error object (if applicable)',
    example: { order_id: ['Order ID must be a valid UUID.'] },
    required: false,
  })
  error?: Record<string, any>;
}
