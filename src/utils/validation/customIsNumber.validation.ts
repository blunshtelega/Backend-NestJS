import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Custom validation for typeof string
@ValidatorConstraint({ async: false })
export class IsNumberConstraint implements ValidatorConstraintInterface {
  validate(data: any, _validationArguments: ValidationArguments): boolean {
    if (typeof data !== 'number') {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      'Поле (' +
      validationArguments.property +
      ') должно быть числом | ' +
      'Field (' +
      validationArguments.property +
      ') must be a number'
    );
  }
}

export function CustomValidateIsNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNumberConstraint,
    });
  };
}
