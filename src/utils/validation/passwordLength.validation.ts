import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IValidationResultAsfunction } from '../interfaces/validationResultAsFunction.interface';

// Custom validation for password length
@ValidatorConstraint({ async: false })
export class CustomPasswordLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, validationArguments: ValidationArguments): boolean {
    if (typeof text !== 'string') {
      return true;
    }
    return (
      text.length >= validationArguments.constraints[0] &&
      text.length <= validationArguments.constraints[1]
    );
  }
  // TODO - как лучше реализовать + подводные камни строка кода №18, по аналогии к isEmailValidValidation.ts
  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      'Пароль должен быть длиной от ' +
      validationArguments.constraints[0] +
      ` до ` +
      validationArguments.constraints[1] +
      ' символов' +
      ' | ' +
      'Password must be longer than ' +
      validationArguments.constraints[0] +
      ` characters and shorter than ` +
      validationArguments.constraints[1] +
      ' characters'
    );
  }
}

export function CustomPasswordLength(
  validationOptions?: ValidationOptions,
): IValidationResultAsfunction {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [6, 20],
      validator: CustomPasswordLengthConstraint,
    });
  };
}
