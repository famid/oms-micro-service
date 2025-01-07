import { registerAs } from '@nestjs/config';

/**
 * Registering mongodb related environment variable as configuration
 *
 * @author Mehedi Hassan Durjoi <https://github.com/durjoi>
 * @date 2022-10-22 01:45:57
 */
export default registerAs('mongo', () => ({
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DB,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  uri: process.env.MONGODB_URI,
}));
