import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents the structure of the paginated response data.
 */
type PaginateResponseObjectDto<T> = {
  data: T[];
  currentPage: number;
  perPage: number;
  totalResult: number;
  totalPage: number;
};

/**
 * Represents the structure of the Swagger paginated response.
 */
type SwaggerPaginateResponseDto<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  response: PaginateResponseObjectDto<T>;
};

/**
 * Dynamically builds a Swagger paginated response class based on the provided example data.
 * @param example - The example data object containing success, statusCode, message, and data properties.
 * @returns A new class representing the Swagger paginated response.
 */
export function buildSwaggerPaginateResponseClass<T>(example: {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
}): new () => SwaggerPaginateResponseDto<T> {
  // Build the ResponseObjectClass using the example data
  const ResponseObjectClass = buildResponseObjectClass(example.data);

  // Define the GeneratePaginateResponse class
  class GeneratePaginateResponse {
    @ApiProperty({ example: example.success })
    success: boolean;

    @ApiProperty({ example: example.statusCode })
    statusCode: number;

    @ApiProperty({ example: example.message })
    message: string;

    @ApiProperty({ type: () => ResponseObjectClass })
    response: PaginateResponseObjectDto<T>;
  }

  // Set a unique class name for GeneratePaginateResponse
  const className = `GeneratePaginateResponse_${
    example.statusCode
  }_${Date.now()}_${uuidv4()}`;
  Object.defineProperty(GeneratePaginateResponse, 'name', { value: className });

  return GeneratePaginateResponse as new () => SwaggerPaginateResponseDto<T>;
}

/**
 * Helper function to build the ResponseObjectClass.
 * @param responseObjectDto The array of DTOs for the response data.
 * @returns The constructed class for the response object.
 */
function buildResponseObjectClass<T>(
  responseObjectDto: T[],
): new () => PaginateResponseObjectDto<T> {
  // Define the ResponseObject class
  class ResponseObject {
    @ApiProperty({ type: () => [responseObjectDto] }) // Use array notation to indicate it's an array of T
    data: T[];

    @ApiProperty({ example: 1 })
    currentPage: number;

    @ApiProperty({ example: 1 })
    perPage: number;

    @ApiProperty({ example: 1 })
    totalResult: number;

    @ApiProperty({ example: 1 })
    totalPage: number;
  }

  // Set a unique class name for ResponseObject
  const className = `ResponseObject_${Date.now()}_${uuidv4()}`;
  Object.defineProperty(ResponseObject, 'name', { value: className });

  return ResponseObject as new () => PaginateResponseObjectDto<T>;
}
