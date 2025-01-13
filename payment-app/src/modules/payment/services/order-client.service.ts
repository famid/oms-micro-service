import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OrderClientService {
  private readonly orderBaseUrl: string = 'http://order-app:3002/api/v1/orders'; // Order Service URL

  async getOrderDetails(
    orderId: string,
  ): Promise<{ status: string; total_amount: number }> {
    try {
      const response = await axios.get(`${this.orderBaseUrl}/${orderId}`);
      const { status, total_amount } = response.data.data; // Assuming this structure from Order Service response
      return { status, total_amount };
    } catch (error) {
      console.error('Error fetching order details:', error.message);
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to fetch order details.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
