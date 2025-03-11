import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ProductStatus } from './product-status.enum';

export class Product {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;

  @IsDate()
  @IsNotEmptyObject()
  createdAt: Date;
}
