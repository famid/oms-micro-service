import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from 'src/config/database/postgres/config.module';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';

/**
 * PostgreSQL Connection Provider Module
 *
 * @date 2022-10-23 00:00:36
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: async (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres',
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.user,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        autoLoadEntities: true,
        synchronize: true, // Set to false in production to avoid accidental schema changes
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
