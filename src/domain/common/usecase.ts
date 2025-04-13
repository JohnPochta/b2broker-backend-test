export abstract class UseCase<TInput extends object, TOutput> {
  protected abstract execute(input: TInput): Promise<TOutput>;
}
