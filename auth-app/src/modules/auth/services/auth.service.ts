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
      if (user) {
        // Destructure the user and exclude password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user; // Avoid unused variable warning
        return {
          success: true,
          statusCode: HttpStatus.OK,
          message: 'User validated successfully.',
          data: result,
        };
      }

      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to validate the user.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(user: any) {
    try {
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
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to login.',
          error: error.message || {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
