import { Address } from 'viem';
import { ERC20Transaction } from '../erc20-transaction';
import { MethodName } from '@domain/common/enums/transaction-method';

export class SymbolERC20Transaction implements ERC20Transaction {
  readonly method = MethodName.Symbol;

  constructor(readonly tokenAddress: Address) {}

  getParams(): {} {
    return {};
  }

  getOrderedParams(): string[] {
    return [];
  }
}
