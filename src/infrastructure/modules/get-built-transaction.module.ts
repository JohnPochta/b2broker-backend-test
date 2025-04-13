import { Module } from '@nestjs/common';

import { BuildStorePaymentContractCallUseCase } from '@domain/usecases/build-store-payment-contract-call/build-store-payment-contract-call.usecase';


import { EthereumModule } from './ethereum.module';
import { GetERC20AllowanceUseCase } from '@domain/usecases/erc20-get-allowance';

import { ContractCallController } from '@domain/controllers/contract-call.controller';
import { GetERC20BalanceOfInfoUseCase } from '@domain/usecases/erc20-get-balance-info';

@Module({
  imports: [EthereumModule],
  providers: [
    BuildStorePaymentContractCallUseCase,
    GetERC20AllowanceUseCase,
    GetERC20BalanceOfInfoUseCase,
  ],
  exports: [
    BuildStorePaymentContractCallUseCase,
    GetERC20BalanceOfInfoUseCase,
  ],
  controllers: [ContractCallController],
})
export class GetBuiltTransactionModule {}
