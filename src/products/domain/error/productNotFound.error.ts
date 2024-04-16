export class ProductNotFound extends Error {
  constructor(message?: string) {
    super();

    this.message = message ?? 'Product Not Found';
  }
}
