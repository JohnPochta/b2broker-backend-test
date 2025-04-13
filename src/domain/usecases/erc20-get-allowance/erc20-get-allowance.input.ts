import { ENetwork } from '@domain/common/enums';
import { Address } from 'viem';

export class GetV2AllowanceInput {
  readonly tokenAddress: Address;
  readonly networkName: ENetwork;
  readonly sender: string;
  readonly spender: Address;
  readonly decimals: number;
}
