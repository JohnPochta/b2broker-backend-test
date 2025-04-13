import { Address } from 'viem';
import { ERC20Transaction } from '../erc20-transaction';
import { MethodName } from '@domain/common/enums/transaction-method';

export interface AllowanceSparkletTransactionParams {
  readonly owner: string;
  readonly spender: string;
}

export class AllowanceERC20Transaction implements ERC20Transaction {
  readonly method = MethodName.Allowance;

  readonly owner: Address;
  readonly spender: Address;

  constructor(readonly tokenAddress: Address, owner: Address, spender: Address) {
    if (!owner) {
      throw new Error('AllowanceSparkletTransaction "owner" argument expected');
    }

    this.owner = owner;

    if (!spender) {
      throw new Error('AllowanceSparkletTransaction "spender" argument expected');
    }

    this.spender = spender;
  }

  getParams(): AllowanceSparkletTransactionParams {
    return {
      owner: this.owner,
      spender: this.spender,
    };
  }

  getOrderedParams(): string[] {
    return [this.owner, this.spender];
  }
}
