import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.validateUser(username, password);
      if (!user) {
        throw {
          success: false,
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password.',
          error: {},
        };
      }
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user; // Avoid unused variable warning
        return {
          success: true,
          statusCode: HttpStatus.OK,
          message: 'User validated successfully.',
          data: result,
        };
      }
    } catch (error) {
      throw {
        success: false,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to validate the user.',
        error: error.message || {},
      };
    }
  }

  async login(username: string, password: string) {
    try {
      const userResponse = await this.validateUser(username, password);
      if (!userResponse.success) {
        throw {
          success: userResponse.success,
          statusCode: userResponse.statusCode,
          message: userResponse.error,
          error: userResponse.error,
        };
      }
      const user = userResponse.data;
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Login successful.',
        data: { accessToken: token },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to login.',
          error: error.message || {},
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(username: string, password: string) {
    try {
      const user = await this.userService.createUser(username, password);

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully.',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to register user.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
