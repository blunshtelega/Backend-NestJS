import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { IsNotEmpty } from 'class-validator';
import { CustomPasswordLength } from '../../utils/validation/passwordLength.validation';
import { IsUserAlreadyExist } from '../../utils/validation/isUserExist.validation';
import { EmailValidation } from '../../utils/validation/isEmailValid.validation';
import { ApiProperty } from '@nestjs/swagger';
import { StringValidation } from '../../utils/validation/isString.validation';

export class CreateUserDto {
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Почта пользователя',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @EmailValidation()
  @IsUserAlreadyExist()
  email!: string;

  @ApiProperty({
    example: 'Pavel',
    description: 'Имя пользователя',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  firstName!: string;

  @ApiProperty({
    example: 'verystrongpassword',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @CustomPasswordLength()
  password!: string;
}
