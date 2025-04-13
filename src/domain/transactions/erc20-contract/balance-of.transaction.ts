import { Address } from 'viem';
import { ERC20Transaction } from '../erc20-transaction';
import { MethodName } from '@domain/common/enums/transaction-method';

export interface BalanceOfSparkletTransactionParams {
  readonly account: string;
}

export class BalanceOfERC20Transaction implements ERC20Transaction {
  readonly method = MethodName.BalanceOf;

  constructor(readonly tokenAddress: Address, readonly account: string) {
    if (!account) {
      throw new Error('BalanceOfSparkletTransaction "account" argument expected');
    }
  }

  getParams(): BalanceOfSparkletTransactionParams {
    return {
      account: this.account,
    };
  }

  getOrderedParams(): string[] {
    return [this.account];
  }
}
