import {
  IsArray,
  IsDate,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ProductOrderDTO } from './product-order.dt';
import { Type } from 'class-transformer';

export class UpdateInvoiceDTO {
  @IsOptional()
  @IsMongoId()
  user_id?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDTO)
  products?: ProductOrderDTO[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
