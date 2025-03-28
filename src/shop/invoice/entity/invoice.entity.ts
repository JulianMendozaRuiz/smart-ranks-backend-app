import { ProductOrder } from './product-order.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Invoice {
  _id: string;

  @Prop({ isRequired: true, type: mongoose.Types.ObjectId, ref: 'user' })
  user_id: string;

  @Prop({ isRequired: true, type: [ProductOrder] })
  products: ProductOrder[];

  @Prop({ isRequired: true })
  total: number;

  @Prop({ isRequired: true, index: true })
  date: Date;

  @Prop({ isRequired: true, index: true })
  createdAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
