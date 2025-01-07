import { registerAs } from '@nestjs/config';

/**
 * Registering app related environment variable as configuration
 *
 *
 * @author Mehedi Hassan Durjoi <https://github.com/durjoi>
 * @date 2022-10-21 15:56:18
 */
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  version: process.env.API_VERSION,
}));
