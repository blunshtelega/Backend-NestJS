import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { StringValidation } from '../../utils/validation/isString.validation';
import { IsNotEmpty, ValidateIf, IsOptional } from 'class-validator';

// Эта DTO не испоьлзуется НИГДЕ, просто оставил для вариации с ValidateIf (больше нигде такого нет)
export class EditProductDto {
  @ApiProperty({
    example: 'ПН00140',
    description: 'Артикул товара',
  })
  @StringValidation()
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @ValidateIf((o) => o.productCode)
  productCode!: string;

  @ApiProperty({
    example: 'Перчатки нитриловые',
    description: 'Наименование товара',
  })
  @ApiPropertyOptional()
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @IsOptional()
  @ValidateIf((o) => o.title)
  title!: string;

  @ApiProperty({
    example: '420',
    description: 'Цена товара',
  })
  @ApiPropertyOptional()
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  @IsOptional()
  @ValidateIf((o) => o.producerPrice)
  producerPrice!: number;
}
