import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [CoreModule, ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
