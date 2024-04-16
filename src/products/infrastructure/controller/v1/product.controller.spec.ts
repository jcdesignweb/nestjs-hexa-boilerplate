import { TestingModule } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { CreateProductDTO } from './dto/createProduct.dto';
import { createClient } from '../../../../../test/services';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let appClient: TestingModule;

  beforeEach(async () => {
    appClient = await createClient()

    productsController = appClient.get<ProductsController>(ProductsController);
  });

  afterEach(() => {
    appClient.close();
  });

  describe('Products', () => {
    it('should creates a new product successfully"', async () => {
      const newProduct = CreateProductDTO.fromPrimitives({
        name: 'Coca Cola',
        description: 'Soda',
        mainImage: 'http://someuri-here.com/image.png',
        price: 100,
        isActive: true,
      });

      const creation = await productsController.create(newProduct);

      expect(creation).not.toEqual(false)

      if (creation) {
        const product = creation.toPrimitives()
        expect(product.name).toBe(newProduct.name);
      }
    });
  });
});
