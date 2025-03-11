import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { InvoiceService } from './invoice.service';
import { ProductModule } from '../product/product.module';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [ConfigModule, ProductModule],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
