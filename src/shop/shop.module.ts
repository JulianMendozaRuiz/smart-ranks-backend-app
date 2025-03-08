import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ProductModule, InvoiceModule],
})
export class ShopModule {}
