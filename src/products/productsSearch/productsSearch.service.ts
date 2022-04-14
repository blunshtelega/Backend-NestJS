import { ProductsEntity } from '../products.entity';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductSearchResult } from './interface/productSearchResult.interface';
import { ProductSearchBody } from './interface/productSearchBody.interface';

@Injectable()
export class ProductsSearchService {
  index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async indexPost(product: ProductsEntity): Promise<any> {
    return await this.elasticsearchService.index<
      ProductSearchResult,
      ProductSearchBody
    >({
      index: this.index,
      body: {
        id: product.id,
        productCode: product.productCode,
        title: product.title,
        productPrice: product.productPrice,
      },
    });
  }

  public async search(text: string): Promise<any> {
    const { body } =
      await this.elasticsearchService.search<ProductSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['title', 'productCode'],
            },
          },
        },
      });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
