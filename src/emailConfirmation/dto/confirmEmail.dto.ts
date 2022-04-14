import { StringValidation } from '../../utils/validation/isString.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty({
    example: 'ХХХХХХХХХХХХХХХ',
    description: 'Токен подтверждения почты',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  token!: string;
}
