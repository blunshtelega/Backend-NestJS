import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EmailValidation } from '../../utils/validation/isEmailValid.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { StringValidation } from '../../utils/validation/isString.validation';

export class AddManagerToUserDto {
  @ApiProperty({
    example: 'mail.@mail.ru',
    description: 'Почта пользователя',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @EmailValidation()
  userEmail!: string;

  @ApiProperty({
    example: 'mail.@mail.ru',
    description: 'Почта менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @EmailValidation()
  managerEmail!: string;
}
