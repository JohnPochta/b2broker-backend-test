import { isEmpty } from '@shared/utils/objects';

export abstract class ValueObject<Value extends object> {
  public readonly value: Value;

  protected constructor(value: Value) {
    if (!value) {
      throw new Error(`${ValueObject.name} is invalid: input is empty`);
    }
    this.value = Object.freeze({
      ...value,
    });
  }

  isEmpty(): boolean {
    return isEmpty(this.value);
  }
}
