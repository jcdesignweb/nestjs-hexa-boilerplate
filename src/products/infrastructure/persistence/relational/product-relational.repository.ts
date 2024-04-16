import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../../../domain/ports/outbound/productRepository.outbound';
import { ProductEntity } from '../../entities/product.entity';
import { Product } from '../../../../products/domain/product';

@Injectable()
export class ProductRelationalRepository implements ProductRepository {
  private logger = new Logger(ProductRelationalRepository.name);
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async getById(id: string): Promise<Product> {
    const productEntity = await this.repository.findOneBy({ id });

    return Product.fromPrimitives(productEntity);
  }

  async save(product: Product): Promise<Product> {
    this.logger.log(
      `Inserting a new product ${JSON.stringify(product.toPrimitives(), null, 2)}`,
    );
    const productEntity = await this.repository.save(product.toPrimitives());

    return Product.fromPrimitives(productEntity);
  }
}
