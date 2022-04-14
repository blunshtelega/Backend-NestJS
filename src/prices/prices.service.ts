import { ProductsEntity } from './../products/products.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesEntity } from './prices.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(PricesEntity)
    private readonly pricesRepository: Repository<PricesEntity>,
  ) {}
  // DONE
  public async createPrice(priceData: CreatePriceDto): Promise<PricesEntity> {
    const newPrice = this.pricesRepository.create(priceData);
    await this.pricesRepository.save(newPrice);
    return newPrice;
  }
  // DONE
  public async parsePrice(priceId: number): Promise<any> {
    const reader = await require('xlsx');
    const _fileId = await this.pricesRepository.findOne(priceId);
    if (_fileId) {
      const fileName = _fileId.file;
      const filePath = 'public' + fileName;
      const file = reader.readFile(filePath);
      const productEntities: ProductsEntity[] = [];

      const sheets = file.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]],
        );
        temp.forEach((product: ProductsEntity) => {
          productEntities.push(product);
        });
      }
      return productEntities;
    } else {
      return new BadRequestException('Что-то пошло не так в parsePrice');
    }
  }
}
