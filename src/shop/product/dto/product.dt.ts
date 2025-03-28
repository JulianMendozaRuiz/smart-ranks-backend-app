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
import { ProductStatus } from '../entity/product-status.enum';
import { Product } from '../entity/product.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Unique identifier for the product',
    example: '60d0091465446797c96d4377',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Name of the product',
    example: 'Product 1',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Description of the product',
    example: 'This is a sample product',
  })
  description?: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: 'number',
    description: 'Price of the product',
    example: 10.99,
  })
  price: number;

  @IsInt()
  @Min(0)
  @ApiProperty({
    type: 'integer',
    description: 'Current stock of the product',
    example: 100,
  })
  stock: number;

  @IsEnum(ProductStatus)
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Status of the product',
    example: 'ACTIVE',
  })
  status: ProductStatus;

  @IsDate()
  @IsNotEmptyObject()
  @ApiProperty({
    type: Date,
    format: 'date-time',
    description: 'Date when the product was created',
    example: '2022-01-01T12:00:00Z',
  })
  createdAt: Date;

  constructor(product: Product) {
    this.id = product._id.toString();
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.status = product.status;
    this.createdAt = product.createdAt;
  }
}
