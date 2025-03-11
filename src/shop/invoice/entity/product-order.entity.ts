import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Product } from '../../product/entity/product.entity';

export class ProductOrder {
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmptyObject()
  @ValidateNested()
  product: Product;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
