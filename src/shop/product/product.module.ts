import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [ConfigModule],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
