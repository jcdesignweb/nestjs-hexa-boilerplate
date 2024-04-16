import { Injectable, Logger } from '@nestjs/common';
import { IProductRepository } from '../../../../products/domain/ports/outbound/IProductRepository.outbound';
import { Product } from '../../../../products/domain/product';

@Injectable()
export class ProductMemoryRepository implements IProductRepository {
  private readonly products: Product[] = [];

  private logger = new Logger(ProductMemoryRepository.name);

  async getById(id: string): Promise<Product> {
    const product = this.products.find((p: Product) => p.getId() == id);

    return product
  }

  async save(product: Product): Promise<Product> {
    this.logger.log(
      `Inserting a new product ${JSON.stringify(product.toPrimitives(), null, 2)}`,
    );

    this.products.push(product);

    return product;
  }
}
