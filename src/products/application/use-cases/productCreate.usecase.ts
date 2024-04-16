import { Injectable } from '@nestjs/common';
import { ProductService } from '../../domain/services/product.service';
import { CreateProductDTO } from '../../infrastructure/controller/v1/dto/createProduct.dto';
import { Product } from '../../domain/product';

@Injectable()
export class ProductCreateUseCase {
  constructor(private productService: ProductService) {}

  async create(productDto: CreateProductDTO) {
    const productCreator: Product = this.productService.create(productDto);

    return await this.productService.save(productCreator);
  }
}
