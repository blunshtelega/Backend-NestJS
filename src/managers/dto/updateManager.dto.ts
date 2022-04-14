import { IsNotEmpty, IsOptional } from 'class-validator';
import { StringValidation } from '../../utils/validation/isString.validation';
import { EmailValidation } from '../../utils/validation/isEmailValid.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { NumberValidation } from '../../utils/validation/isNumber.validation';
import { PhoneValidation } from '../../utils/validation/isPhoneValid.validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateManagerDto {
  @ApiProperty({
    example: '1',
    description: 'ID менеджера',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @NumberValidation()
  id!: number;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Почта менеджера',
  })
  @ApiPropertyOptional()
  @EmailValidation()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '+76664442200',
    description: 'Телефон менеджера',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @PhoneValidation()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'Big',
    description: 'Имя менеджера',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Lebowski',
    description: 'Фамилия менеджера',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  lastName?: string;
}
