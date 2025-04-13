import { ENetwork } from '@domain/common/enums';
import { Address } from 'viem';

export interface BuildStorePaymentContractCallInput {
  readonly tokenTicker: string;
  readonly tokenAmount: number;
  readonly userAddress: Address;
}
