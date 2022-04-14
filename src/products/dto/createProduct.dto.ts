import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { NumberValidation } from '../../utils/validation/isNumber.validation';
import { StringValidation } from '../../utils/validation/isString.validation';

export class CreateProductDto {
  @ApiProperty({
    example: 'ПН00140',
    description: 'Артикул товара',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  productCode!: string;

  @ApiProperty({
    example: 'Перчатки нитриловые',
    description: 'Наименование товара',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  title!: string;

  @ApiProperty({
    example: '420',
    description: 'Цена товара',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @NumberValidation()
  productPrice!: number;
}
