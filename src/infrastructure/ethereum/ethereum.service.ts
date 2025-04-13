import { Injectable, Logger } from '@nestjs/common';
import { ENetwork } from '@domain/common/enums';
import { MethodName } from '@domain/common/enums/transaction-method';
import { createPublicClient, PublicClient, http, encodeFunctionData, Address } from 'viem';
import { sepolia } from 'viem/chains';
import { B2BrokerAbi } from './abi/b2broker-erc20.abi';
import { ERC20TransactionFactory } from '@shared/utils/erc20-transaction-factory-v2';

@Injectable()
export class EthereumService {
  private readonly logger: Logger;
  private readonly publicClient: PublicClient;

  constructor() {
    this.logger = new Logger(EthereumService.name);

    this.publicClient = (createPublicClient({
      chain: sepolia,
      transport: http(process.env.NETWORK_RPC_URL),
    })) as any;
  }

  async callERC20Method(dto: {
    method: MethodName;
    tokenAddress: Address;
    network: ENetwork;
    params: Record<string, any>;
    from: Address;
  }): Promise<string> {
    const result = await this.publicClient.readContract({
      address: dto.tokenAddress,
      abi: B2BrokerAbi,
      functionName: dto.method,
      args: Object.values(dto.params),
      account: dto.from,
    });

    return result.toString()
  }

  buildERC20Transaction(dto: {
    method: MethodName;
    tokenAddress: Address;
    params: Record<string, any>;
  }): {
    to: string;
    data: string;
  } {
    const tx = ERC20TransactionFactory.createTransaction({
      tokenAddress: dto.tokenAddress,
      method: dto.method,
      params: dto.params,
    });

    try {
      const output = encodeFunctionData({
        abi: B2BrokerAbi,
        functionName: tx.method,
        args: tx.getOrderedParams(),
      });

      return {
        to: dto.tokenAddress,
        data: output,
      }
    } catch (error) {
      throw new Error(`Failed to build erc20 transaction. Error: ${error.message}`);
    }
  }
} 
