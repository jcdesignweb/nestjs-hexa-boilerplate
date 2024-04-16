
export type ProductPrimitives = {
  id: string;
  name: string;
  description?: string;
  price: number;
  mainImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export class Product {
  
  constructor(
    private readonly id: string,
    private name: string,    
    private price: number,
    private mainImage: string,
    private isActive: boolean,
    private createdAt: Date,    
    private updatedAt?: Date,
    private description?: string,
  ) {}

  static fromPrimitives(
    p: ProductPrimitives

  ) {
    const product = new Product(
      p.id,
      p.name,
      p.price,
      p.mainImage,
      p.isActive,
      p.createdAt,
      p.updatedAt,
      p.description,
    );
   

    return product;
  }

  toPrimitives() {
    const primitives: ProductPrimitives = {
      id: this.id,
      name: this.name,
      mainImage: this.mainImage,
      price: this.price,
      isActive: this.isActive,
      createdAt: this.createdAt,
    }

    if (this.description) {
      primitives.description = this.description
    }

    if (this.updatedAt) {
      primitives.updatedAt = this.updatedAt
    }

    return primitives
  }

  getId() { return this.id }
}
