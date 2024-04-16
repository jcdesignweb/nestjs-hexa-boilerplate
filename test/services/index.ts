import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Product } from 'src/products/domain/product';
import { ProductEntity } from 'src/products/infrastructure/entities/product.entity';
import { EntityManager } from 'typeorm';

async function clearDatabase(client: TestingModule) {
  const entityManager = client.get<EntityManager>(EntityManager);
  const tableNames = entityManager.connection.entityMetadatas
    .map((entity) => entity.tableName)
    .join(', ');

  await entityManager.query(`truncate ${tableNames} restart identity cascade;`);
  
}

export async function createClient() {
  const client: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new Logger())
    .compile();

  clearDatabase(client)

  return client;
}


export {
  
}
