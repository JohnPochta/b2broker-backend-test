import { convertEthToWei } from '@shared/utils/big-numbers.utils';
import { ERC20Transaction } from '../erc20-transaction';
import { MethodName } from '@domain/common/enums/transaction-method';
import { Address } from 'viem';

export interface TransferTransactionParams {
  readonly recipient: string;
  readonly amount: bigint;
}

export class ApproveERC20Transaction implements ERC20Transaction {
  readonly method = MethodName.Approve;
  // TODO: It actually should to be the user wallet, but we are not estimating gas for this trx yet

  private readonly amount: bigint;

  constructor(readonly tokenAddress: Address, readonly spender: Address, amount: number, decimals: number) {
    if (!spender) {
      throw new Error('ApproveERC20 "spender" argument expected');
    }

    if (!amount && amount !== 0) {
      throw new Error('TransferERC20Transaction "amount" argument expected');
    }

    // This code snippet is valid for the current version of the smart contract
    // with 18 decimals
    this.amount = convertEthToWei(amount, decimals);
  }

  getParams(): TransferTransactionParams {
    return {
      recipient: this.spender,
      amount: this.amount,
    };
  }

  getOrderedParams(): string[] {
    return [this.spender, this.amount.toString()];
  }
}
