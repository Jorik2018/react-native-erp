import product1 from '../../assets/products/image-product-1.png';
import product2 from '../../assets/products/image-product-2.jpg';
import product3 from '../../assets/products/image-product-3.jpg';

export class Product {

  constructor(
    public title: string,
    public category: string,
    public image: string,
    public price: number,
    public amount: number,
  ) {}

  get formattedPrice(): string {
    return `$${this.price}`;
  }

  get totalPrice(): number {
    return this.price * this.amount;
  }

  static pinkChair(): Product {
    return new Product(
      'Pink Chair',
      'Furniture',
      product1,
      130,
      1,
    );
  }

  static whiteChair(): Product {
    return new Product(
      'White Chair',
      'Furniture',
      product2,
      150,
      1,
    );
  }

  static woodChair(): Product {
    return new Product(
      'Wood Chair',
      'Furniture',
      product1,
      125,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      'Black Lamp',
      'Lighting',
      product3,
      80,
      1,
    );
  }
}