import { ProductStatus } from './product-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  // No decorator required as Mongoose already controls it regardless of its presence
  _id: string;

  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: false })
  description?: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true })
  stock: number;

  @Prop({ type: String, isRequired: true, enum: ProductStatus })
  status: ProductStatus;

  @Prop({ isRequired: true, index: true })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
