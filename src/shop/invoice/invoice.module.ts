import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { InvoiceService } from './invoice.service';
import { ProductModule } from '../product/product.module';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './entity/invoice.entity';
import { UserModule } from '../../core/user/user.module';

@Module({
  imports: [
    ConfigModule,
    ProductModule,
    UserModule,
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
