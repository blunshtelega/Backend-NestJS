import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Валидация для type of string
@ValidatorConstraint({ async: false })
export class StringValidationConstraint
  implements ValidatorConstraintInterface
{
  validate(data: any, _validationArguments: ValidationArguments): boolean {
    if (typeof data !== 'string') {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      'Поле (' +
      validationArguments.property +
      ') должно быть строкой | ' +
      'Field (' +
      validationArguments.property +
      ') must be a string'
    );
  }
}

export function StringValidation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: StringValidationConstraint,
    });
  };
}
