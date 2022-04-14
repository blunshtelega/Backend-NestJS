import { ProductSearchBody } from './productSearchBody.interface';

export interface ProductSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ProductSearchBody;
    }>;
  };
}
