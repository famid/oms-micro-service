import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { ErrorResponseDto } from '../dto/swagger/error-response.dto';

export class AuthSwagger {
  static login() {
    return applyDecorators(
      ApiTags('Authentication'),
      ApiOperation({ summary: 'Login a user' }),
      ApiBody({
        description: 'Login details',
        type: AdminLoginDto,
      }),
      ApiResponse({
        status: 200,
        description: 'Login successful.',
        schema: {
          example: {
            success: true,
            statusCode: 200,
            message: 'Login successful.',
            data: { accessToken: 'your.jwt.token.here' },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Invalid username or password.',
        type: ErrorResponseDto,
      }),
      ApiResponse({
        status: 500,
        description:
          'Internal server error while processing the login request.',
        type: ErrorResponseDto,
      }),
    );
  }

  static register() {
    return applyDecorators(
      ApiTags('Authentication'),
      ApiOperation({ summary: 'Register a new user' }),
      ApiBody({
        description: 'Registration details',
        type: AdminLoginDto,
      }),
      ApiResponse({
        status: 201,
        description: 'User registered successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 201,
            message: 'User registered successfully.',
            data: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              username: 'newuser',
              role: 'user',
              created_at: '2025-01-12T12:34:56Z',
              updated_at: '2025-01-12T12:34:56Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 500,
        description: 'Internal server error while processing the registration.',
        type: ErrorResponseDto,
      }),
    );
  }
}
