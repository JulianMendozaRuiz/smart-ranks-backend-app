import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from '../entity/product.entity';

export class ProductPurchaseDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  constructor(product: Product) {
    this.id = product._id.toString();
    this.price = product.price;
    this.stock = product.stock;
  }
}
