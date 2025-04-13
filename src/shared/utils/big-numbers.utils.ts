import { Decimal as ExternalDecimal } from 'decimal.js';
import { formatUnits, parseUnits } from 'viem'

export function convertWeiToEth(value: bigint, digits: number): string {
  return formatUnits(value, digits);
}

export function convertEthToWei(value: number, digits: number): bigint {
  const decimalValue = new ExternalDecimal(value).toFixed();

  return parseUnits(decimalValue, digits)
}
