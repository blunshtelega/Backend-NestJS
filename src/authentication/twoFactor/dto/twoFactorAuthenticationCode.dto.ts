import { ApiProperty } from '@nestjs/swagger';
import { isNotEmptyMessage } from '../../../utils/repeatableConsts/isNotEmptyMessage';
import { IsNotEmpty } from 'class-validator';
import { StringValidation } from '../../../utils/validation/isString.validation';

export class TwoFactorAuthenticationCodeDto {
  @ApiProperty({
    example: 'ХХХХХХХХХХХХХХХХХХХХХХХ',
    description: '2FA код',
  })
  @StringValidation()
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  twoFactorAuthenticationCode!: string;
}
