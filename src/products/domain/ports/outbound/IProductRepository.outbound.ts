import { Product } from '../../product';

export interface IProductRepository {
  getById(id: string): Promise<Product>;
  save(product: Product): Promise<Product>;
}
