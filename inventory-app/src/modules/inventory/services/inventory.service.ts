import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { RabbitMQProviderModule } from '../../../provider/rabbitmq/provider.modules';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel('PRODUCTS')
    private productModel: Model<Product>,
    private readonly rabbitmqService: RabbitMQProviderModule,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      // Check if the product already exists by name and category
      const existingProduct = await this.productModel.findOne({
        name: createProductDto.name,
        category: createProductDto.category,
      });

      if (existingProduct) {
        throw {
          statusCode: HttpStatus.CONFLICT,
          success: false,
          message: 'Product already exists. Please use the stock update API.',
          error: {},
        };
      }

      // Create new product
      const newProduct = new this.productModel(createProductDto);
      const createdProduct = await newProduct.save();

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Product added successfully.',
        response: createdProduct,
      };
    } catch (error) {
      console.error('CREATE PRODUCT ERROR: ', error);
      throw new HttpException(
        {
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.message || 'Internal Server Error.',
          error: {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProductStock(productId: string, quantity: number) {
    try {
      // Fetch the product by ID
      const product = await this.productModel.findOne({
        _id: productId,
        isDeleted: false,
      });

      if (!product) {
        throw {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'Product not found.',
          error: {},
        };
      }

      // Check if there's enough stock
      if (product.stock < quantity) {
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          success: false,
          message: 'Insufficient stock available.',
          error: {},
        };
      }

      // Update the stock
      product.stock -= quantity;
      const updatedProduct = await product.save();

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Stock updated successfully.',
        response: updatedProduct,
      };
    } catch (error) {
      console.error('UPDATE PRODUCT STOCK ERROR: ', error);
      throw new HttpException(
        {
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.message || 'Internal Server Error.',
          error: {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductStock(productId: string) {
    try {
      // Validate and convert productId to ObjectId
      if (!Types.ObjectId.isValid(productId)) {
        return {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid product ID format.',
          error: {},
        };
      }

      const product = await this.productModel.findOne({
        _id: new Types.ObjectId(productId), // Convert to ObjectId
        isDeleted: false,
      });

      if (!product) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product not found.',
          error: {},
        };
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Product stock fetched successfully.',
        response: {
          productId: product._id,
          stock: product.stock,
        },
      };
    } catch (error) {
      console.error('GET PRODUCT STOCK ERROR: ', error);
      throw new HttpException(
        {
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.message || 'Internal Server Error.',
          error: {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleStockUpdate(message: any) {
    try {
      // Validate the message structure
      if (!Array.isArray(message) || message.length === 0) {
        console.error('Invalid message format:', message);
        return;
      }

      // Process each item in the message
      for (const item of message) {
        const { product_id, quantity } = item;

        if (!product_id || typeof quantity !== 'number') {
          console.error('Invalid item format:', item);
          continue;
        }

        // Fetch the product by ID
        const product = await this.productModel.findOne({
          _id: product_id,
          isDeleted: false,
        });

        if (!product) {
          console.error(`Product with ID ${product_id} not found.`);
          continue;
        }

        // Update the stock
        product.stock -= quantity;

        // Ensure stock does not go below zero
        if (product.stock < 0) {
          product.stock = 0; // Set stock to zero if it goes negative
          console.warn(
            `Product stock for ID ${product_id} is below zero. Setting stock to zero.`,
          );
        }

        // Save the updated product
        await product.save();
        console.log(
          `Updated stock for product ID ${product_id}. Remaining stock: ${product.stock}`,
        );
      }
    } catch (error) {
      console.error('Error handling stock update:', error.message);
      throw new HttpException(
        'Failed to process stock update.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
