import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Custom validation for password length
@ValidatorConstraint({ async: false })
export class EmailValidationConstraint implements ValidatorConstraintInterface {
  validate(email: string, validationArguments: ValidationArguments): any {
    if (typeof email !== 'string') {
      return false;
    }
    return email.match(validationArguments.constraints[0]);
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      'Неверный формат почты (' +
      validationArguments.value +
      ') | ' +
      'Wrong email format (' +
      validationArguments.value +
      ')'
    );
  }
}

export function EmailValidation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      ],
      validator: EmailValidationConstraint,
    });
  };
}
