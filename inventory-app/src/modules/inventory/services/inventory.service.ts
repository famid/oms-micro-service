import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel('PRODUCTS')
    private productModel: Model<Product>,
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
      const product = await this.productModel.findOne({
        _id: productId,
        isDeleted: false, // Ensure the product is not deleted
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
}
