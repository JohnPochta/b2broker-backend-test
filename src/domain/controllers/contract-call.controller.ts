import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

import { BuildStorePaymentContractCallUseCase } from '@domain/usecases/build-store-payment-contract-call/build-store-payment-contract-call.usecase';
import { GetContractCallOutput } from '@domain/usecases/build-store-payment-contract-call/build-contract-call.output';
import { BuildStorePaymentContractCallInput } from '@domain/usecases/build-store-payment-contract-call/build-store-contract-call.input';
import { GetERC20BalanceOfInfoOutput, GetERC20BalanceOfInfoUseCase } from '@domain/usecases/erc20-get-balance-info/erc20-get-balance-info.usecase';
import { Address } from 'viem';

@Controller('contract-call')
export class ContractCallController {
  private readonly logger: Logger;

  constructor(
    private readonly buildStorePaymentContractCallUseCase: BuildStorePaymentContractCallUseCase,
    private readonly getErc20BalanceUseCase: GetERC20BalanceOfInfoUseCase,
  ) {
    this.logger = new Logger(ContractCallController.name);
  }

  @Post('/pay/build')
  async buildStorePaymentContractCall(@Body() dto: BuildStorePaymentContractCallInput): Promise<GetContractCallOutput> {
    return await this.buildStorePaymentContractCallUseCase.execute(dto);
  }

  @Get('/:tokenAddress/balance/:userAddress')
  async getERC20Balance(@Param('tokenAddress') tokenAddress: Address, @Param('userAddress') userAddress: Address): Promise<GetERC20BalanceOfInfoOutput> {
    return await this.getErc20BalanceUseCase.execute({ tokenAddress, userAddress });
  }
}
