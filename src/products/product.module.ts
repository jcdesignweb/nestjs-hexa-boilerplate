import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/controller/v1/product.controller';
import { ProductService } from './domain/services/product.service';
import { ProductCreateUseCase } from './application/use-cases/productCreate.usecase';
import { ProductEntity } from './infrastructure/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindByProductIdUseCase } from './application/use-cases';
import { ProductRelationalRepository } from './infrastructure/persistence/relational/product-relational.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductRelationalRepository,
    ProductCreateUseCase,
    ProductService,
    FindByProductIdUseCase,
  ],
  exports: [TypeOrmModule],
})
export class ProductModule {}
