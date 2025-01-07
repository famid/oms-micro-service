import { registerAs } from '@nestjs/config';

/**
 * Registering mongodb related environment variable as configuration
 *
 * @author Ahsanul Hoque Famid <https://github.com/famid>
 * @date 2022-10-22 01:45:57
 */
export default registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  uri: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
}));
