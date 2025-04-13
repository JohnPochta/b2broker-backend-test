import { Injectable } from '@nestjs/common';

import { UseCase } from '@domain/common/usecase';
// import { convertWeiToEth, toBigNumber } from '@shared/utils/big-numbers.utils';

import { EthereumService } from '@infrastructure/ethereum/ethereum.service';
import { MethodName } from '@domain/common/enums/transaction-method';
import { ErcGetBalanceOfInfoInput } from './erc20-get-balance-info.input';
import { ENetwork } from '@domain/common/enums';
import { convertWeiToEth } from '@shared/utils/big-numbers.utils';

export interface GetERC20BalanceOfInfoOutput {
  readonly name: string;
  readonly symbol: string;
  readonly totalSupply: string;
  readonly balance: string;
}

@Injectable()
export class GetERC20BalanceOfInfoUseCase extends UseCase<ErcGetBalanceOfInfoInput, GetERC20BalanceOfInfoOutput> {
  constructor(private readonly ethereumService: EthereumService) {
    super();
  }

  async execute(input: ErcGetBalanceOfInfoInput): Promise<GetERC20BalanceOfInfoOutput> {
    try {
      const [
        name,
        symbol,
        totalSupply,
        balance,
      ] = await Promise.all([
        this.getERC20Name(input),
        this.getERC20Symbol(input),
        this.getERC20TotalSupply(input),
        this.getERC20BalanceOf(input),
      ]);

      console.log({
        name,
        symbol,
        totalSupply,
        balance,
      });

      return {
        name,
        symbol,
        totalSupply,
        balance,
      }
    } catch (error) {
      throw new Error(`Failed to get erc20 balance info. Error: ${error.message}`);
    }
  }

  private async getERC20BalanceOf(input: ErcGetBalanceOfInfoInput): Promise<string> {
    const balanceOfResponse = await this.ethereumService.callERC20Method({
      tokenAddress: input.tokenAddress,
      network: ENetwork.ETHEREUM,
      method: MethodName.BalanceOf,
      params: {
        address: input.userAddress,
      },
      from: input.userAddress,
    });

    return convertWeiToEth(BigInt(balanceOfResponse), 18).toString();
  }

  // private async getERC20Decimals(input: ErcGetBalanceOfInfoInput): Promise<number> {
  //   return this.ethereumService.callERC20Method({
  //     tokenAddress: input.tokenAddress,
  //     network: ENetwork.ETHEREUM,
  //     method: MethodName.DE,
  //     params: {}
  //   });
  // }

  private async getERC20Name(input: ErcGetBalanceOfInfoInput): Promise<string> {
    return this.ethereumService.callERC20Method({
      tokenAddress: input.tokenAddress,
      network: ENetwork.ETHEREUM,
      method: MethodName.Name,
      params: {},
      from: input.userAddress,
    });
  }

  private async getERC20Symbol(input: ErcGetBalanceOfInfoInput): Promise<string> {
    return this.ethereumService.callERC20Method({
      tokenAddress: input.tokenAddress,
      network: ENetwork.ETHEREUM,
      method: MethodName.Symbol,
      params: {},
      from: input.userAddress,
    });
  }

  private async getERC20TotalSupply(input: ErcGetBalanceOfInfoInput): Promise<string> {
    const totalSupplyResponse = await this.ethereumService.callERC20Method({
      tokenAddress: input.tokenAddress,
      network: ENetwork.ETHEREUM,
      method: MethodName.TotalSupply,
      params: {},
      from: input.userAddress,
    });

    return convertWeiToEth(BigInt(totalSupplyResponse), 18).toString();
  }
}
