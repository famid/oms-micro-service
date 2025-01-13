import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InventoryClientService {
  private readonly inventoryBaseUrl: string =
    'http://inventory-app:3001/api/v1/inventory'; // Inventory App URL

  async checkProductStock(productId: string): Promise<number> {
    try {
      const response = await axios.get(`${this.inventoryBaseUrl}/${productId}`);
      const { stock } = response.data.response; // Assuming stock is in the response structure
      return stock;
    } catch (error) {
      console.error('Error checking product stock:', error.message);
      throw {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to fetch product stock.',
        error:
          'invalid product id, this product is not available in inventory!!',
      };
    }
  }
}
