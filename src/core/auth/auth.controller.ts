import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthInputDTO } from './dto/auth-input.dt';
import { AuthResultDTO } from './dto/auth-result.dt';
import { AuthGuard } from '../../common/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  async login(
    @Body(ValidationPipe) authInput: AuthInputDTO,
  ): Promise<AuthResultDTO | null> {
    return await this.authService.authenticate(authInput);
  }

  @Get('user-info')
  @ApiResponse({
    status: 200,
    description: 'User info retrieved successfully',
  })
  @UseGuards(AuthGuard)
  getUserInfo(@Request() request): Promise<AuthResultDTO | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return request.user;
  }
}
