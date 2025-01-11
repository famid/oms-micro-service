import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/modules/user/entity/user.entity';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],

  migrationsTableName: 'typeorm_migrations',
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
