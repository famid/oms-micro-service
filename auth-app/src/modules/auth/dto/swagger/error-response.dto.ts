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
    example: 'Invalid username or password.',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error object (optional)',
    example: { username: ['Username must be unique.'] },
    required: false,
  })
  error?: Record<string, any>;
}
