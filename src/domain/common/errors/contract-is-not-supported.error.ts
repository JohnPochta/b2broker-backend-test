export class ContractIsNotSupportedError extends Error {
  constructor(contractName: string) {
    super(`Contract ${contractName} is not supported`);
  }
}
