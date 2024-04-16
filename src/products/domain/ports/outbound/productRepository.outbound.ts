import { Product } from '../../product';

export interface ProductRepository {
  getById(id: string): Promise<Product>;
  save(product: Product): Promise<Product>;
}

export const ProductRepository = Symbol('ProductRepository');
