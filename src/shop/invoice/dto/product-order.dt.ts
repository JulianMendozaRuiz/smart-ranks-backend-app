import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { ProductDTO } from '../../product/dto/product.dt';

export class ProductOrderDTO {
  @IsMongoId()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmptyObject()
  @ValidateNested()
  product: ProductDTO;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
