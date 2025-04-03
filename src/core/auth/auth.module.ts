import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
