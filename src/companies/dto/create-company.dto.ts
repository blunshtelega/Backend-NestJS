import { IsNotEmpty, IsOptional } from 'class-validator';
import { StringValidation } from '../../utils/validation/isString.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PhoneValidation } from '../../utils/validation/isPhoneValid.validation';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'ООО "СПМК"',
    description: 'Название компании',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  companyName!: string;

  @ApiProperty({
    example: '2460113920',
    description: 'ИНН компании',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  taxpayerIdentificationNumber!: string;

  @ApiProperty({
    example: '89998887766',
    description: 'Телефон компании',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @PhoneValidation()
  companyTelephoneNumbers!: string;

  @ApiProperty({
    example: 'Красноярск',
    description: 'Город доставки',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  shipmentCity!: string;

  @ApiProperty({
    example: 'Баумана',
    description: 'Улица доставки',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  shipmentStreet!: string;

  @ApiProperty({
    example: '20В',
    description: 'Дом доставки',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  shipmentHouseNumber!: string;

  @ApiProperty({
    example: 'Корпус 5',
    description: 'Дополнительные данные для доставки',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @StringValidation()
  shipmentAdditionalHouseNumber?: string;

  @ApiProperty({
    example: '211',
    description: 'Офис доставки',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @StringValidation()
  shipmentOffice?: string;
}
