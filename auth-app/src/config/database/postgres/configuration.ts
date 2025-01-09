import { registerAs } from '@nestjs/config';

/**
 * Registering PostgreSQL-related environment variables as configuration
 */
export default registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5444,
  database: process.env.POSTGRES_DB || 'payment_db',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'example',
  uri: process.env.POSTGRES_URI,
}));
