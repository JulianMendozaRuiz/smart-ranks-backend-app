import {
  Controller,
  DefaultValuePipe,
  Delete,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dt';
import { CreateUserDTO } from './dto/create-user.dt';
import { UpdateUserDTO } from './dto/update-user.dt';
import { IsPositivePipe } from '../../common/pipes/is-positive/is-positive.pipe';
import { AuthGuard } from '../../common/guards/auth/auth.guard';
import { AdminRoleGuard } from '../../common/guards/role/admin-role/admin-role.guard';
import { UpdateUserGuard } from '../../common/guards/user/update-user/update-user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of users',
    type: [UserDTO],
  })
  async findAll(
    @Query('sort') sort: 'asc' | 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    const result = await this.userService.findAll(sort, limit);
    console.log('found users', result);
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user',
    type: UserDTO,
  })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ValidationPipe) id: string): Promise<UserDTO> {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user',
    type: UserDTO,
  })
  async findOneByEmail(
    @Param('email', ValidationPipe) email: string,
  ): Promise<UserDTO> {
    return await this.userService.findByEmail(email);
  }

  @Post()
  @UseGuards(AuthGuard, AdminRoleGuard)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDTO,
  })
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard, UpdateUserGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    description: 'Update user request',
    type: UpdateUserDTO,
  })
  async update(
    @Param('id', ValidationPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'User deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiParam({ name: 'id', type: String })
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
