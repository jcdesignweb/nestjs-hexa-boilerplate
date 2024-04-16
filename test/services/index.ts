import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

export async function createClient() {
  const client: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new Logger())
    .compile();

  return client;
}

export {};
