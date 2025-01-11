import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 *  Service Dealing with app config based operations
 *
 * @method name()
 * @method env()
 * @method url()
 * @method port()
 * @method version()
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('auth.secretKey');
  }
}
