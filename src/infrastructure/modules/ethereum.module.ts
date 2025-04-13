import { Module } from '@nestjs/common';

import { EthereumService } from '@infrastructure/ethereum/ethereum.service';
import { ConfigModule } from '@infrastructure/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    EthereumService,
  ],
  exports: [EthereumService],
})
export class EthereumModule {}
