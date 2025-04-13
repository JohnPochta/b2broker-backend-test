import { Address } from "viem";

export class ErcGetBalanceOfInfoInput {
  readonly userAddress: Address;
  readonly tokenAddress: Address;
}
