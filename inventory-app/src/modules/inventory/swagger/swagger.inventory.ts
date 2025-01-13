import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';

export class InventorySwagger {
  static getProductStock() {
    return applyDecorators(
      ApiTags('Inventory'),
      ApiOperation({ summary: 'Get product stock by ID' }),
      ApiParam({
        name: 'product_id',
        description: 'Unique identifier for the product',
        example: '60dbf3811c4ae6124c8e91a3',
      }),
      ApiResponse({
        status: 200,
        description: 'Product stock fetched successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 200,
            message: 'Product stock fetched successfully.',
            response: {
              productId: '60dbf3811c4ae6124c8e91a3',
              stock: 50,
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Product not found.',
        schema: {
          example: {
            success: false,
            statusCode: 404,
            message: 'Product not found.',
            error: {},
          },
        },
      }),
    );
  }

  static updateProductStock() {
    return applyDecorators(
      ApiTags('Inventory'),
      ApiOperation({ summary: 'Update product stock' }),
      ApiParam({
        name: 'product_id',
        description: 'Unique identifier for the product',
        example: '60dbf3811c4ae6124c8e91a3',
      }),
      ApiBody({
        description: 'Details of stock to be updated',
        type: UpdateProductStockDto,
      }),
      ApiResponse({
        status: 200,
        description: 'Stock updated successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 200,
            message: 'Stock updated successfully.',
            response: {
              productId: '60dbf3811c4ae6124c8e91a3',
              stock: 45,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid request or insufficient stock.',
        schema: {
          example: {
            success: false,
            statusCode: 400,
            message: 'Insufficient stock available.',
            error: {},
          },
        },
      }),
    );
  }

  static addNewProduct() {
    return applyDecorators(
      ApiTags('Inventory'),
      ApiOperation({ summary: 'Add a new product to the inventory' }),
      ApiBody({
        description: 'Details of the new product',
        type: CreateProductDto,
      }),
      ApiResponse({
        status: 201,
        description: 'Product added successfully.',
        schema: {
          example: {
            success: true,
            statusCode: 201,
            message: 'Product added successfully.',
            response: {
              id: '60dbf3811c4ae6124c8e91a3',
              name: 'Product Name',
              category: 'Electronics',
              price: 100,
              stock: 50,
              isDeleted: false,
            },
          },
        },
      }),
      ApiResponse({
        status: 409,
        description: 'Product already exists.',
        schema: {
          example: {
            success: false,
            statusCode: 409,
            message: 'Product already exists. Please use the stock update API.',
            error: {},
          },
        },
      }),
    );
  }
}
