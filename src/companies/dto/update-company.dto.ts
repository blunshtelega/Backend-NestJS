import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PhoneValidation } from '../../utils/validation/isPhoneValid.validation';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { StringValidation } from '../../utils/validation/isString.validation';

export class UpdateCompanyDto {
  @ApiProperty({
    example: 'ООО "СПМК"',
    description: 'Название компании',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  companyName?: string;

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
  @ApiPropertyOptional()
  @StringValidation()
  @PhoneValidation()
  @IsOptional()
  companyTelephoneNumbers?: string;

  @ApiProperty({
    example: 'Красноярск',
    description: 'Город доставки',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  shipmentCity?: string;

  @ApiProperty({
    example: 'Баумана',
    description: 'Улица доставки',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  shipmentStreet?: string;

  @ApiProperty({
    example: '20В',
    description: 'Дом доставки',
  })
  @ApiPropertyOptional()
  @StringValidation()
  @IsOptional()
  shipmentHouseNumber?: string;

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
  @StringValidation()
  @IsOptional()
  shipmentOffice?: string;
  // updatedAt специально находится в DTO, т.к. обновление сущности идет через repository.update
  @ApiProperty({
    example: '01.01.2022',
    description: 'Дата обновления сущности',
  })
  @ApiPropertyOptional()
  @IsOptional()
  updatedAt?: Date;
}
