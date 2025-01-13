import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthSwagger } from '../swagger/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthSwagger.login()
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return await this.authService.login(body.username, body.password);
  }

  @AuthSwagger.register()
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return await this.authService.register(body.username, body.password);
  }
}
