import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductPriceDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  constructor(id: string, price: number) {
    this.id = id;
    this.price = price;
  }
}
