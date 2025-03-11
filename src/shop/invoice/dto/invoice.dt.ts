import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductOrderDTO } from './product-order.dt';

export class InvoiceDTO {
  @IsString()
  @IsMongoId()
  id: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDTO)
  products: ProductOrderDTO[];

  @IsNumber()
  @Min(0)
  total: number;

  @IsDate()
  date: Date;
}
