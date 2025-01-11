import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Order } from './src/modules/orders/entity/order.entity';
import { OrderItem } from './src/modules/orders/entity/order-item.entity';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Order, OrderItem],

  migrationsTableName: 'typeorm_migrations',
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
