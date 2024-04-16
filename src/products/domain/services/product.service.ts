import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from '../../../products/infrastructure/controller/v1/dto/createProduct.dto';
import { Product } from '../product';
import { IProductRepository } from '../ports/outbound/IProductRepository.outbound';
import { ProductEntity } from '../../../products/infrastructure/entities/product.entity';
import { v4 as generateUuid } from 'uuid';
import { ProductNotFound } from '../error/productNotFound.error';
import { ProductRelationalRepository } from '../../../products/infrastructure/persistence/relational/repositories/product-relational.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name);

  constructor(
    //@InjectRepository(ProductEntity)
    //private readonly product: ProductRelationalRepository,
    private productRepository: ProductRelationalRepository,
  ) {}

  create(createProduct: CreateProductDTO): Product {
    this.logger.log(
      `ProductService product creation ${JSON.stringify(createProduct)}', `,
    );

    const { name, description, mainImage, price, isActive } = createProduct;

    return Product.fromPrimitives(
      {
        id: generateUuid(),
        name,
        description,
        mainImage,
        price,
        isActive,
        createdAt: new Date()
      }
    );
  }

  async save(product: Product): Promise<Product | false> {
    this.logger.log(`adding new product ${JSON.stringify(product, null, 2)}`);

    const newProduct = await this.productRepository.save(product)

    if (!newProduct) {
      this.logger.warn('product was not created');
      return false;
    }

    this.logger.log(`product added successfully ${newProduct.getId()}`);
    return newProduct;
  }

  async getByProductId(productId: string) {
    this.logger.log(`Getting product by productId: ${productId}`)

    const product = await this.productRepository.getById(productId)

    if (!product) {
      throw new ProductNotFound(`Product Id: ${productId} not found`)
    }

    return product.toPrimitives()
  }
}
