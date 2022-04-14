import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { ManagersEntity } from '../../managers/managers.entity';

// Custom validation which checking if email is already exist
@ValidatorConstraint({ async: true })
export class IsManagerAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  public async validate(
    email: string,
    _validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const managerRepository = getRepository(ManagersEntity);
    return await managerRepository
      .findOne({ email })
      .then((manager): boolean => (manager ? false : true));
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return (
      `Менеджер с почтой ` +
      validationArguments.value +
      ` уже существует | Manager with ` +
      validationArguments.value +
      ` email already exists`
    );
  }
}

export function IsManagerAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsManagerAlreadyExistConstraint,
    });
  };
}
