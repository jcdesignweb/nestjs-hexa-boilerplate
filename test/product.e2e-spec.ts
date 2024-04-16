import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createClient } from './services';
import { COCA_COLA } from './fixture/products/coca-cola';
import { ProductPrimitives } from '../src/products/domain/product';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const appClient = await createClient();

    app = appClient.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('it must create a product', () => {
    return request(app.getHttpServer())
      .post('/v1/products')
      .send(COCA_COLA)

      .expect(201)
      .then((response) => {
        response.body.name = COCA_COLA.name;
        response.body.price = COCA_COLA.price;
        response.body.description = COCA_COLA.description;
        response.body.mainImage = COCA_COLA.mainImage;
      });
  });


  it('it must create a product and then should be retrieved', async () => {
    
    const creationProductResponse = await request(app.getHttpServer())
      .post('/v1/products')
      .send(COCA_COLA)
      .expect(201);

    const creationProduct: ProductPrimitives = JSON.parse(
      JSON.stringify(creationProductResponse.body),
    );
    expect(creationProduct.id).not.toBeUndefined();
    expect(creationProduct.name).toEqual(COCA_COLA.name);
    expect(creationProduct.price).toEqual(COCA_COLA.price);
    expect(creationProduct.description).toEqual(COCA_COLA.description);
    expect(creationProduct.mainImage).toEqual(COCA_COLA.mainImage);
    

    const productId = creationProduct.id

    const productSelectResponse = await request(app.getHttpServer())
      .get(`/v1/products?product_id=${productId}`)
      .expect(200);

    const product: ProductPrimitives = JSON.parse(JSON.stringify(productSelectResponse.body));

    expect(product.name).toEqual(COCA_COLA.name);
    console.log("GET PRODUCT", product)
  });
});
