import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from './config/config.module';
import { GetBuiltTransactionModule } from './modules/get-built-transaction.module';

@Module({
  imports: [
    ConfigModule,
    HealthModule,
    GetBuiltTransactionModule,
  ],
})
export class AppModule {}