import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersEntity } from '../../users/users.entity';
import { getRepository } from 'typeorm';

// Custom validation which checking if email is already exist
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  public async validate(
    email: string,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const usersReposity = getRepository(UsersEntity);
    return await usersReposity
      .findOne({ email })
      .then((user): boolean => (user ? false : true));
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      `Пользователь с почтой ` +
      validationArguments.value +
      ` уже существует | User with ` +
      validationArguments.value +
      ` email already exists`
    );
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
