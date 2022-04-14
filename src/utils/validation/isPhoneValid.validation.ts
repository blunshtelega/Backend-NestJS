import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Custom validation for password length
@ValidatorConstraint({ async: false })
export class PhoneValidationConstraint implements ValidatorConstraintInterface {
  validate(phone: string, validationArguments: ValidationArguments): any {
    if (typeof phone !== 'string') {
      return false;
    }
    return phone.match(validationArguments.constraints[0]);
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      'Неверный формат телефона (' +
      validationArguments.value +
      ') | ' +
      'Wrong phone number format (' +
      validationArguments.value +
      ')'
    );
  }
}

export function PhoneValidation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/],
      validator: PhoneValidationConstraint,
    });
  };
}
