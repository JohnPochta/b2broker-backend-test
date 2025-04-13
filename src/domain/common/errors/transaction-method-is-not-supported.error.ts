export class ContractMethodIsNotSupportedError extends Error {
  constructor(dto: { methodName: string }) {
    super(`ERC20 contract method ${dto.methodName} is not supported`);
  }
}
