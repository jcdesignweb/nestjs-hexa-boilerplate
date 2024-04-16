import { EntityManager } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

let app: TestingModule;
let entityManager: EntityManager;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  entityManager = app.get<EntityManager>(EntityManager);
});

beforeEach(async () => {
  const tableNames = entityManager.connection.entityMetadatas
    .map((entity) => entity.tableName)
    .join(', ');

  await entityManager.query(`truncate ${tableNames} restart identity cascade;`);
});

afterAll(async () => {
  app.close();
});
