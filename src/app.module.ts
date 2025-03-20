import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri = process.env.MONGO_SMART_RANKS_URI || '';

@Module({
  imports: [
    CoreModule,
    ShopModule,
    MongooseModule.forRoot(uri, { dbName: 'smart-ranks-backend' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
