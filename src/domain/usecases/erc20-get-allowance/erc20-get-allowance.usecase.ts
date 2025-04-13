import { Injectable } from '@nestjs/common';

import { UseCase } from '@domain/common/usecase';
import { convertWeiToEth } from '@shared/utils/big-numbers.utils';

import { GetV2AllowanceInput } from './erc20-get-allowance.input';
import { EthereumService } from '@infrastructure/ethereum/ethereum.service';
import { MethodName } from '@domain/common/enums/transaction-method';

@Injectable()
export class GetERC20AllowanceUseCase extends UseCase<GetV2AllowanceInput, number> {
  constructor(private readonly ethereumService: EthereumService) {
    super();
  }

  async execute(input: GetV2AllowanceInput): Promise<number> {
    try {
      const output = await this.ethereumService.callERC20Method({
        tokenAddress: input.tokenAddress,
        network: input.networkName,
        method: MethodName.Allowance,
        params: {
          owner: input.sender,
          spender: input.spender,
        },
        from: input.spender,
      });

      return Number(convertWeiToEth(BigInt(output), input.decimals));
    } catch (error) {
      throw new Error(`Failed to get erc20 allowance. Error: ${error.message}`);
    }
  }
}
