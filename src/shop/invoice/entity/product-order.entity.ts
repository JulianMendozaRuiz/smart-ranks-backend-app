import { IsMongoId, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ProductOrder {
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
