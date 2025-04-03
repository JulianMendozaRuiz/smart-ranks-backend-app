import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dt';
import { AuthResultDTO } from './dto/auth-result.dt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  async login(
    @Body(ValidationPipe) authInput: AuthLoginDTO,
  ): Promise<AuthResultDTO | null> {
    return await this.authService.authenticate(authInput);
  }
}
