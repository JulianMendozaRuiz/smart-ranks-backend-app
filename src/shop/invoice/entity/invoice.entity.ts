import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductOrder } from './product-order.entity';

export class Invoice {
  @IsString()
  @IsMongoId()
  id: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrder)
  products: ProductOrder[];

  @IsNumber()
  @Min(0)
  total: number;

  @IsDate()
  date: Date;

  @IsDate()
  @IsNotEmptyObject()
  createdAt: Date;
}
