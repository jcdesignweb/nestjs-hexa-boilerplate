import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/createProduct.dto';
import {
  ProductCreateUseCase,
  FindByProductIdUseCase,
} from '../../../../products/application/use-cases';

@Controller('v1/products')
@UseFilters()
export class ProductsController {
  private logger: Logger = new Logger(ProductsController.name);

  constructor(
    private productCreation: ProductCreateUseCase,
    private getProductUseCase: FindByProductIdUseCase,
  ) {}

  @Post()
  async create(@Body() productCreator: CreateProductDTO) {
    this.logger.log(
      `Product creator ${JSON.stringify(productCreator, null, 2)}`,
    );

    return await this.productCreation.create(productCreator);
  }

  @Get()
  async getOneById(@Query() query) {
    return await this.getProductUseCase.execute(query.product_id);
  }
}
