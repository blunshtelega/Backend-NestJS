export interface IValidationResultAsfunction {
  (object: unknown, propertyName: string): void;
}
