import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 *  Service Dealing with mongodb config based operations
 *
 * @method host()
 * @method password()
 * @method database()
 * @method user()
 * @method password()
 */
@Injectable()
export class MongoConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mongo.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('mongo.port'));
  }

  get database(): string {
    return this.configService.get<string>('mongo.database');
  }

  get user(): string {
    return this.configService.get<string>('mongo.user');
  }

  get password(): string {
    return this.configService.get<string>('mongo.password');
  }

  get uri(): string {
    return this.configService.get<string>('mongo.uri');
  }
}
