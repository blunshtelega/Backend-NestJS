import {
  BadRequestException,
  Injectable,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import {
  FindManyOptions,
  MoreThan,
  Repository,
  In,
  InsertResult,
} from 'typeorm';
import { PricesService } from './../prices/prices.service';
import { ProductsEntity } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsSearchService } from './productsSearch/productsSearch.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Cache } from 'cache-manager';
import { GET_PRODUCTS_CACHE_KEY } from './productsCache/productsCacheKey.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    private readonly pricesService: PricesService,
    private readonly productsSearchService: ProductsSearchService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // DONE
  public async createProduct(
    productData: CreateProductDto,
  ): Promise<ProductsEntity | BadRequestException> {
    try {
      const newProduct = this.productsRepository.create(productData);
      await this.productsRepository.save(newProduct);
      await this.productsSearchService.indexPost(newProduct); // Эта строка для индексации поиска
      await this.clearCache(); // Чистим кеш
      return newProduct;
    } catch (e) {
      throw new BadRequestException('Что-то пошло не так (createProduct)');
    }
  }
  // DONE
  // Создание ряда товаров из прайса
  public async createGoodsFromConvertedPrice(
    priceId: number,
  ): Promise<InsertResult> {
    const convertedPrice = await this.pricesService.parsePrice(priceId);
    const productsEntities: ProductsEntity[] = [];
    convertedPrice.forEach((element: any) => {
      const productEntity = new ProductsEntity();
      productEntity.productCode = convertedPrice[0].productCode;
      productEntity.title = convertedPrice[0].title;
      productEntity.productPrice = convertedPrice[0].productPrice;
      productEntity.updatedAt = new Date();
      productsEntities.push(element);
    });
    await this.clearCache(); // Чистим кеш
    return await this.productsRepository.upsert(productsEntities, [
      'productCode',
    ]);
  }
  // DONE
  // Часть с поиском товаров
  public async searchForProduct(text: string): Promise<ProductsEntity[]> {
    const results = await this.productsSearchService.search(text);
    const ids = results.map((result: any) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.productsRepository.find({
      where: { id: In(ids) },
    });
  }
  // DONE
  public async findById(id: number): Promise<any> {
    const foundProduct = await this.productsRepository.findOne(id);
    await this.clearCache(); // Чистим кеш
    if (foundProduct) {
      return foundProduct;
    }
  }
  // DONE
  public async getAll() {
    const foundProducts = await this.productsRepository.find({});
    await this.clearCache(); // Чистим кеш
    return foundProducts;
  }

  // Обнуления кэша для всех функций кроме поиска
  public async clearCache(): Promise<void> {
    if (this.cacheManager.store.keys) {
      const keys: string[] = await this.cacheManager.store.keys();
      keys.forEach((key) => {
        if (key.startsWith(GET_PRODUCTS_CACHE_KEY)) {
          this.cacheManager.del(key);
        }
      });
    } else {
      throw new BadRequestException('Уже даже кеш почистить не можем?');
    }
  }
  // Пагинация
  // TODO - ПОМЕНЯТЬ НА КУРСОРНУЮ
  public async getPosts(offset?: number, limit?: number, startId?: number) {
    const where: FindManyOptions<ProductsEntity>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.productsRepository.count();
    }

    const [items, count] = await this.productsRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });
    console.log(items);
    console.log(count);
    const pages = count / items.length;
    await this.clearCache(); // Чистим кеш
    return {
      items,
      count: startId ? separateCount : count,
      pages,
    };
  }
}
