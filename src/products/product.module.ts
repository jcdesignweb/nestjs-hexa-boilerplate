import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ProductsController } from './infrastructure/controller/v1/product.controller';
import { ProductService } from './domain/services/product.service';
import { ProductCreateUseCase } from './application/use-cases/productCreate.usecase';
import { ProductEntity } from './infrastructure/entities/product.entity';
import { FindByProductIdUseCase } from './application/use-cases';
import { ProductRelationalRepository } from './infrastructure/persistence/relational/product-relational.repository';
import { ProductRepository } from './domain/ports/outbound/productRepository.outbound';
import { ProductMemoryRepository } from './infrastructure/persistence/memory/product-memory.repository';
import { DataSource } from 'src/shared/config/default.config';
import { Repository } from 'typeorm';

const productProvider = {
  imports: [ConfigModule],
  provide: ProductRepository,
  useFactory: async (
    configService: ConfigService,
    productRepository: Repository<ProductEntity>,
  ): Promise<ProductRepository> => {
    const dataSource: DataSource = configService.get<DataSource>('dataSource');
    if (dataSource === 'memory') {
      return new ProductMemoryRepository();
    } else {
      return new ProductRelationalRepository(productRepository);
    }
  },
  inject: [ConfigService, getRepositoryToken(ProductEntity)],
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ProductsController],
  providers: [
    productProvider,
    //ProductRelationalRepository,
    ProductCreateUseCase,
    ProductService,
    FindByProductIdUseCase,
  ],
  exports: [TypeOrmModule],
})
export class ProductModule {}
