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
import { Invoice } from '../entity/invoice.entity';

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
  @Type(() => Date)
  date: Date;

  constructor(invoice: Invoice) {
    this.id = invoice._id.toString();
    this.user_id = invoice.user_id;
    this.products = invoice.products;
    this.total = invoice.total;
    this.date = invoice.date;
  }
}
