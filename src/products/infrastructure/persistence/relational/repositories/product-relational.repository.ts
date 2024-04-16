import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../../domain/product';
import { IProductRepository } from '../../../../../products/domain/ports/outbound/IProductRepository.outbound';
import { ProductEntity } from '../../../../../products/infrastructure/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRelationalRepository implements IProductRepository {
  private logger = new Logger(ProductRelationalRepository.name)
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async getById(id: string): Promise<Product> {
    console.log("###############--------------------------------------------------##############")
    const productEntity = await this.repository.findOneBy({ id })

    return Product.fromPrimitives(productEntity);
  }

  async save(product: Product): Promise<Product> {
    console.log("-----------------------------------------------------------------------")
    this.logger.log(`Inserting a new product ${JSON.stringify(product.toPrimitives(), null, 2)}`)
    const productEntity = await this.repository.save(product.toPrimitives())

    return Product.fromPrimitives(productEntity);
  }
}
