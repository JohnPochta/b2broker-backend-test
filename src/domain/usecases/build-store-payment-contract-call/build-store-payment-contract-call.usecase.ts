import { Injectable } from '@nestjs/common';

import { UseCase } from '@domain/common/usecase';
import { ENetwork } from '@domain/common/enums';

import { GetERC20AllowanceUseCase } from '../erc20-get-allowance';
import { BuildStorePaymentContractCallInput } from './build-store-contract-call.input';
import { ApprovalOutput, GetContractCallOutput, ResetAllowanceOutput } from './build-contract-call.output';
import { MethodName } from '@domain/common/enums/transaction-method';
import { EthereumService } from '@infrastructure/ethereum/ethereum.service';
import { Address } from 'viem';
import { ConfigService } from '@infrastructure/config/config.service';

@Injectable()
export class BuildStorePaymentContractCallUseCase extends UseCase<
  BuildStorePaymentContractCallInput,
  GetContractCallOutput
> {
  constructor(
    private readonly getAllowanceUseCase: GetERC20AllowanceUseCase,
    private readonly ethereumService: EthereumService,
    private configService: ConfigService,
  ) {
    super();
  }

  async execute(input: BuildStorePaymentContractCallInput): Promise<GetContractCallOutput> {
    const networkName = ENetwork.ETHEREUM;

    const token = this.getTokenByTicker(input.tokenTicker);

    if (!token) {
      throw new Error(`Token with ticker ${input.tokenTicker} not supported`);
    }

    const { tokenAddress } = token;

    const erc20PreProcess = await this.preProcessERC20Transfer({
      tokenAddress: tokenAddress as Address,
      networkName,
      buyerAddress: input.userAddress,
      tokenAmount: input.tokenAmount,
      decimals: token.decimals,
      // TODO: remove this after testing
      approveIncreasable: true,
      spender: this.configService.getOrThrow('TRANSFER_FROM_RECEIVER_ADDRESS') as Address,
    });

    if (erc20PreProcess) {
      return erc20PreProcess;
    }

    const { data, to } = await this.ethereumService.buildERC20Transaction({
      tokenAddress: tokenAddress as Address,
      method: MethodName.TransferFrom,
      params: {
        from: input.userAddress,
        to: this.configService.getOrThrow('TRANSFER_FROM_RECEIVER_ADDRESS') as Address,
        amount: input.tokenAmount,
        decimals: token.decimals,
      },
    });

    return {
      transfer: {
        data,
        to,
      }
    };
  }

  private getTokenByTicker(ticker: string):{
    tokenAddress: string;
    decimals: number;
    name: string;
    symbol: string;
  } {
    // we always should allow actions only
    // with tokens that are in the whitelist.
    // Whitelist on the smart contracts it's a prevention
    // but in this case we can store whitelisted tokens off-chain like this hardcode or db
    const whitelistedTokens = {
      B2BT: {
        tokenAddress: this.configService.getOrThrow('B2BROKER_TOKEN_ADDRESS'),
        decimals: 18,
        name: 'B2Broker Token',
        symbol: 'B2BT',
      },
    };

    return whitelistedTokens[ticker] || null;
  }

  // can be extracted to a separate usecase further
  private async preProcessERC20Transfer(input: {
    tokenAddress: Address;
    networkName: ENetwork;
    buyerAddress: string;
    tokenAmount: number;
    decimals: number;
    approveIncreasable: boolean;
    spender: Address;
  }): Promise<ApprovalOutput | ResetAllowanceOutput | null> {
    const allowance = await this.getAllowanceUseCase.execute({
      spender: input.spender,
      tokenAddress: input.tokenAddress,
      networkName: input.networkName,
      sender: input.buyerAddress,
      decimals: input.decimals,
    });

    console.log('allowance', allowance);

    if (allowance < input.tokenAmount) {
      const amount = allowance > 0 ? (input.approveIncreasable ? input.tokenAmount : 0) : input.tokenAmount;

      const approve = await this.ethereumService.buildERC20Transaction({
        method: MethodName.Approve,
        tokenAddress: input.tokenAddress,
        params: {
          amount,
          spender: input.spender,
          decimals: input.decimals,
        },
      });

      if (amount === 0) {
        return {
          resetAllowance: approve,
        };
      } else {
        return {
          approve,
        };
      }
    }

    return null;
  }
}
