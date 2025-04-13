import { MethodName } from "@domain/common/enums/transaction-method";
import { ContractMethodIsNotSupportedError } from "@domain/common/errors/transaction-method-is-not-supported.error";
import { TransferFromERC20Transaction } from "@domain/transactions";
import { AllowanceERC20Transaction } from "@domain/transactions/erc20-contract/allowance.transaction";
import { ApproveERC20Transaction } from "@domain/transactions/erc20-contract/approve.transaction";
import { BalanceOfERC20Transaction } from "@domain/transactions/erc20-contract/balance-of.transaction";
import { NameERC20Transaction } from "@domain/transactions/erc20-contract/name.transaction";
import { SymbolERC20Transaction } from "@domain/transactions/erc20-contract/symbol.transaction";
import { TotalSupplyERC20Transaction } from "@domain/transactions/erc20-contract/tokenSupply.transaction";
import { ERC20Transaction } from "@domain/transactions/erc20-transaction";
import { Address } from "viem";

interface ICreateERC20TransactionInstanceDto {
  tokenAddress: Address;
  method: MethodName;
  params: any;
}

export class ERC20TransactionFactory {
  public static createTransaction(dto: ICreateERC20TransactionInstanceDto): ERC20Transaction {
    switch (dto.method) {
      case MethodName.Approve:
        return new ApproveERC20Transaction(
          dto.tokenAddress,
          dto.params.spender,
          dto.params.amount,
          dto.params.decimals,
        );

      case MethodName.Allowance:
        return new AllowanceERC20Transaction(
          dto.tokenAddress,
          dto.params.owner,
          dto.params.spender,
        );

      case MethodName.BalanceOf:
        return new BalanceOfERC20Transaction(dto.tokenAddress, dto.params.account);
        
      case MethodName.Name:
        return new NameERC20Transaction(dto.tokenAddress);

      case MethodName.Symbol:
        return new SymbolERC20Transaction(dto.tokenAddress);
      
      case MethodName.TotalSupply:
        return new TotalSupplyERC20Transaction(dto.tokenAddress);

      case MethodName.TransferFrom:
        return new TransferFromERC20Transaction(
          dto.tokenAddress,
          dto.params.from,
          dto.params.to,
          dto.params.amount,
          dto.params.decimals,
        );

      default:
        throw new ContractMethodIsNotSupportedError({
          methodName: dto.method,
        });
    }
  }
}
