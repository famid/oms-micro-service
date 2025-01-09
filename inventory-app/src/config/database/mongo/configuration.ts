import { registerAs } from '@nestjs/config';

/**
 * Registering mongodb related environment variable as configuration
 *
 * @author Ahsanul Hoque Famid <https://github.com/famid>
 * @date 2022-10-22 01:45:57
 */
export default registerAs('mongo', () => ({
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  database: process.env.MONGODB_DATABASE,
  user: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  uri: process.env.MONGODB_URI,
}));
