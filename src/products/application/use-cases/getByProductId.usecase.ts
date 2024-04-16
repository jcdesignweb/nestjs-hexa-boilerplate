import { Injectable } from '@nestjs/common';
import { ProductService } from '../../domain/services/product.service';

@Injectable()
export class FindByProductIdUseCase {
  constructor(private productService: ProductService) {}

  async execute(productId: string) {
    const product = await this.productService.getByProductId(productId);

    return product;
  }
}
