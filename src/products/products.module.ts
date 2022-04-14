import { SearchModule } from './../search/search.module';
import { PricesModule } from './../prices/prices.module';
import { ProductsEntity } from './products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsSearchService } from './productsSearch/productsSearch.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
    // CacheModule.register(),
    TypeOrmModule.forFeature([ProductsEntity]),
    PricesModule,
    SearchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSearchService],
  exports: [ProductsService],
})
export class ProductsModule {}
