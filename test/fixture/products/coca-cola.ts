import { Product, ProductPrimitives } from 'src/products/domain/product';
import { v4 as generateUuid } from 'uuid';

export const COCA_COLA: ProductPrimitives = {
  id: generateUuid(),
  name: 'Coca Cola 1L',
  description: 'Gaseosa Coca cola',
  price: 100,
  mainImage: 'some-image.jpg',
  isActive: true,
  createdAt: new Date()
};
