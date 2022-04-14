import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Render,
  Body,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/fileloader/HelperFileLoader';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/fileUpload.dto';
import { IRenderTemplate } from '../authentication/interfaces/renderAuthTemplate.interface';

const PATH_NEWS = '/prices/';
HelperFileLoader.path = PATH_NEWS;

@Controller('prices')
@ApiTags('Прайс')
@UseInterceptors(ClassSerializerInterceptor)
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}
  // DONE
  @ApiOperation({
    description: 'Рендер страницы для загрузки прайса',
  })
  @HttpCode(200)
  @Get('download')
  @Render('price/download')
  public async renderPriceDownloadPage(): Promise<IRenderTemplate> {
    return { layout: 'auth', title: 'Загрузка прайса' };
  }
  // DONE
  @Post('upload')
  @ApiOperation({
    description: 'Загрузка прайса',
  })
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
      fileFilter: HelperFileLoader.fileFilterPrices,
    }),
  )
  // Попробуем здесь еще пару декораторов SWAGGER
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Загрузка прайса',
    type: FileUploadDto,
  })
  public async uploadPriceToServer(
    @Body() priceData: CreatePriceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PricesEntity> {
    if (file?.filename) {
      priceData.file = PATH_NEWS + file.filename;
    }
    const createdPrice = await this.pricesService.createPrice(priceData);
    return createdPrice;
  }
}
