import { registerAs } from '@nestjs/config';

/**
 * Registering app related environment variable as configuration
 */
export default registerAs('auth', () => ({
  secretKey: process.env.SECRETKEY,
}));
