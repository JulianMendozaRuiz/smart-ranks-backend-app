import { IsMongoId, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ProductOrder } from '../entity/product-order.entity';

export class ProductOrderDTO {
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  constructor(productOrder: ProductOrder) {
    this.product_id = productOrder.product_id;
    this.quantity = productOrder.quantity;
  }
}
