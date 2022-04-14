import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { IsNotEmpty } from 'class-validator';
import { StringValidation } from '../../utils/validation/isString.validation';
import { ApiProperty } from '@nestjs/swagger';
import { EmailValidation } from '../../utils/validation/isEmailValid.validation';

export class AddCompanyToUserDto {
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
    example: '2460113920',
    description: 'ИНН компании',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  taxpayerIdentificationNumber!: string;
}
