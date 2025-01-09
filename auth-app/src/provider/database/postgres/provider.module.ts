import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../../config/database/postgres/config.module';
import { PostgresConfigService } from '../../../config/database/postgres/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: async (postgresConfigService: PostgresConfigService) => {
        console.log('Postgres URI:', postgresConfigService.uri); // Logs the connection URI
        return {
          type: 'postgres',
          url: postgresConfigService.uri,
          synchronize: true, // Set to false in production
          logging: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
