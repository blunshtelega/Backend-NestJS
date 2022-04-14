import { isNotEmptyMessage } from '../../utils/repeatableConsts/isNotEmptyMessage';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { StringValidation } from '../../utils/validation/isString.validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePriceDto {
  @ApiProperty({
    example: 'file.xls',
    description: 'Файл для загрузки',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @StringValidation()
  file?: string;

  @ApiProperty({
    example: 'Прайс от 01.01.2021',
    description: 'Название для прайса',
  })
  @IsNotEmpty({
    message: isNotEmptyMessage,
  })
  @StringValidation()
  title!: string;
}
