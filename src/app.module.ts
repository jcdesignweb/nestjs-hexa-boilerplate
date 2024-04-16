import { Module } from '@nestjs/common';
import { ProductEntity } from './products/infrastructure/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './shared/config/database.config';
import { SharedModule } from './shared/shared.module';
import { CategoryEntity } from './products/infrastructure/entities/category.entity';
import { ProductModule } from './products/product.module';
import { defaultConfig } from './shared/config/default.config';

export const PRODUCT_APPLICATION = 'PRODUCT_APPLICATION';

@Module({
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [defaultConfig],
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');

        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          entities: [ProductEntity, CategoryEntity],
          synchronize: database.sync,
          logging: false, //['query'],
        };
      },
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [],
})
export class AppModule {}
