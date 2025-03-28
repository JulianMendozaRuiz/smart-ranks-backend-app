import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ProductOrderDTO } from './product-order.dt';
import { Type } from 'class-transformer';

export class CreateInvoiceDTO {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDTO)
  products: ProductOrderDTO[];

  @IsDate()
  @Type(() => Date)
  date: Date;
}
