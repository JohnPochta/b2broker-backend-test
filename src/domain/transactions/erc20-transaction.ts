import { MethodName } from '@domain/common/enums/transaction-method';
import { Address } from 'viem';

export type TransactionParams<T extends Record<string, any> = Record<string, any>> = T;

export interface ERC20Transaction {
  readonly method: MethodName;
  readonly tokenAddress: Address;
  getParams(): TransactionParams;
  getOrderedParams(): string[];
}
