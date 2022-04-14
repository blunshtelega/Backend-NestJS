import { HttpCacheInterceptor } from './productsCache/httpCache.interceptor';
import { InsertResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from './../pagination/pagination.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Render,
  Query,
  ParseIntPipe,
  Param,
  HttpStatus,
  BadRequestException,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  CacheKey,
} from '@nestjs/common';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
import { IRenderTemplate } from '../authentication/interfaces/renderAuthTemplate.interface';
import { GET_PRODUCTS_CACHE_KEY } from './productsCache/productsCacheKey.constant';

@Controller('products')
@ApiTags('Товары / Продукты')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // DONE
  @ApiOperation({
    description: 'Создание единичного товара',
  })
  @HttpCode(200)
  @Post('create')
  public async createProduct(
    @Body() productData: CreateProductDto,
  ): Promise<ProductsEntity | BadRequestException> {
    return this.productsService.createProduct(productData);
  }
  // DONE
  @ApiOperation({
    description: 'Рендер страницы с конвертацией прайса',
  })
  @HttpCode(200)
  @Get('convert')
  @Render('price/convert')
  public async renderLogin(): Promise<IRenderTemplate> {
    return { layout: 'auth', title: 'Создать товары на основе прайса' };
  }
  // DONE
  @ApiOperation({
    description: 'Создание товаров на основе прайса',
  })
  @HttpCode(200)
  @Post('create-products-from-price')
  public async createGoodsFromConvertedPrice(
    @Body() priceId: number,
  ): Promise<InsertResult> {
    return await this.productsService.createGoodsFromConvertedPrice(priceId);
  }
  // DONE
  @ApiOperation({
    description: 'Добавления товаров в localStorage',
  })
  @HttpCode(200)
  @Post('add-to-storage')
  public async addProductsToLocalStorage(
    @Body() id: number,
  ): Promise<ProductsEntity> {
    const product = await this.productsService.findById(id);
    return product;
  }
  // Поиск + кеширование
  @ApiOperation({
    description: 'Поиск товара + его кеширование в REDIS',
  })
  @HttpCode(200)
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_PRODUCTS_CACHE_KEY)
  @Get()
  public async getProducts(@Query('search') search: string): Promise<any> {
    if (search) {
      return await this.productsService.searchForProduct(search);
    }
    return await this.productsService.getAll();
  }
  // Пагинация
  @ApiOperation({
    description: 'Пагинация',
  })
  @HttpCode(200)
  @Get('show-all')
  @Render('products/products-list')
  public async getAllView(
    @Query() { offset, limit, startId }: PaginationParams,
  ): Promise<any> {
    const { items, count, pages } = await this.productsService.getPosts(
      offset,
      limit,
      startId,
    );
    return { items, count, pages };
  }
  // DONE
  @ApiOperation({
    description: 'Рендер отдельной карточки товара',
  })
  @HttpCode(200)
  @Get('/:id')
  @Render('products/product-detail')
  public async renderOneProduct(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), // TODO - зачем я сюда это добавил?
    )
    id: number,
  ): Promise<any> {
    const product = await this.productsService.findById(id);
    return { product };
  }
}
