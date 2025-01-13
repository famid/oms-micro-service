import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generic type representing a common API response structure.
 * @type-param T The type of the response data.
 */
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  response?: T;
  statusCode: number;
  error?: object;
};

/**
 * Helper function to build a Swagger response class.
 * @param example The example object containing the response details.
 * @returns The constructed class for the Swagger response.
 */
export function buildSwaggerResponseClass<T>(example: {
  success: boolean;
  statusCode: number;
  message: string;
  response: T | null;
}): new () => ApiResponse<T> {
  class GeneratedResponse {
    @ApiProperty({ example: example.success })
    success: boolean;

    @ApiProperty({ example: example.statusCode })
    statusCode: number;

    @ApiProperty({ example: example.message })
    message: string;

    @ApiProperty({
      type: () => (example.response !== null ? example.response : Object),
    })
    response: T | null;

    constructor() {
      Object.assign(this, example);
    }
  }

  // Generate a unique class name based on the example properties
  const className = `GeneratedResponse_${
    example.statusCode
  }_${Date.now()}_${uuidv4()}`;

  Object.defineProperty(GeneratedResponse, 'name', { value: className });

  return GeneratedResponse as new () => ApiResponse<T>;
}

/**
 * Helper function to build a Swagger error response class.
 * @param example The example object containing the error response details.
 * @returns The constructed class for the Swagger error response.
 */
export function buildSwaggerErrorResponseClass<T>(example: {
  success: boolean;
  statusCode: number;
  message: string;
  error: object;
}): new () => ApiResponse<T> {
  class GeneratedErrorResponse {
    @ApiProperty({ example: example.success })
    success: boolean;

    @ApiProperty({ example: example.statusCode })
    statusCode: number;

    @ApiProperty({ example: example.message })
    message: string;

    @ApiProperty({ example: example.error })
    error: object;

    constructor() {
      Object.assign(this, example);
    }
  }

  // Generate a unique class name based on the example properties
  const className = `GeneratedErrorResponse_${
    example.statusCode
  }_${Date.now()}_${uuidv4()}`;

  Object.defineProperty(GeneratedErrorResponse, 'name', { value: className });

  return GeneratedErrorResponse as new () => ApiResponse<T>;
}
