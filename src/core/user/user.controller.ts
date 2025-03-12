import { Controller, Delete, HttpCode } from '@nestjs/common';
import { Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dt';
import { CreateUserDTO } from './dto/create-user.dt';
import { UpdateUserDTO } from './dto/update-user.dt';

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
    @Query('limit') limit: number,
  ): Promise<UserDTO[]> {
    return this.userService.findAll(sort, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user',
    type: UserDTO,
  })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDTO,
  })
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserDTO,
  })
  @ApiParam({ name: 'id', type: String })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'User deleted successfully',
  })
  @ApiParam({ name: 'id', type: String })
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
