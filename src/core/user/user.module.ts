import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
