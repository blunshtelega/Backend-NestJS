import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PhoneValidation } from './../../utils/validation/isPhoneValid.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { StringValidation } from '../../utils/validation/isString.validation';
import { EmailValidation } from '../../utils/validation/isEmailValid.validation';
import { IsManagerAlreadyExist } from '../../utils/validation/isManagerExist.validation';

export class CreateManagerDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Почта менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @EmailValidation()
  @IsManagerAlreadyExist()
  email!: string;

  @ApiProperty({
    example: '+76664442200',
    description: 'Телефон менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @PhoneValidation()
  phoneNumber!: string;

  @ApiProperty({
    example: 'Big',
    description: 'Имя менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  firstName!: string;

  @ApiProperty({
    example: 'Lebowski',
    description: 'Фамилия менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  lastName!: string;
}
