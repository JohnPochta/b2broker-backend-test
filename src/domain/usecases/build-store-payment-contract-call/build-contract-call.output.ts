interface BuiltErc20Transaction {
  readonly data: string;
  readonly to: string;
}

interface BuiltNativeTransaction extends BuiltErc20Transaction {
  readonly value: string;
}

export interface ApprovalOutput {
  readonly approve: BuiltErc20Transaction;
}

export interface ResetAllowanceOutput {
  readonly resetAllowance: BuiltErc20Transaction;
}

interface TransferOutput {
  readonly transfer: BuiltErc20Transaction | BuiltNativeTransaction;
}

export type GetContractCallOutput = ApprovalOutput | TransferOutput | ResetAllowanceOutput;
