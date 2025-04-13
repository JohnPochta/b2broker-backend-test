import { MethodName } from '@domain/common/enums/transaction-method';
import { convertEthToWei } from '@shared/utils/big-numbers.utils';
import { Address } from 'viem';

export interface TransferFromERC20TokenTransactionParams {
  readonly value: bigint;
  readonly from: string;
  readonly to: string;
}

export class TransferFromERC20Transaction {
  readonly method = MethodName.TransferFrom;
  private readonly amount: bigint;

  constructor(
    readonly tokenAddress: Address,
    readonly from: Address,
    readonly to: Address,
    amount: number,
    readonly decimals: number,
  ) {
    if (!from) {
      throw new Error('TransferFromERC20Transaction "from" argument expected');
    }

    if (!to) {
      throw new Error('TransferFromERC20Transaction "to" argument expected');
    }

    if (!amount) {
      throw new Error('TransferFromERC20Transaction "amount" argument expected');
    }

    this.amount = convertEthToWei(amount, decimals);
  }

  getParams(): TransferFromERC20TokenTransactionParams {
    return {
      from: this.from,
      to: this.to,
      value: this.amount,
    };
  }

  getOrderedParams(): string[] {
    console.log('getOrderedParams', this.from, this.to, this.amount.toString());
    return [this.from, this.to, this.amount.toString()];
  }
}
