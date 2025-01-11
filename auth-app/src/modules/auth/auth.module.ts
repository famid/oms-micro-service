import { Module } from '@nestjs/common';

import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthConfigModule } from '../../config/auth/config.module';
import { AuthConfigService } from '../../config/auth/config.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    AuthConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.secretKey,
        signOptions: { expiresIn: '30d' },
      }),
    } as JwtModuleAsyncOptions),
  ],
  exports: [AuthService],
})
export class AuthModule {}
