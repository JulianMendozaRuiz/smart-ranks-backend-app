/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dt';
import { UserRole } from './entity/user-role.enum';
import { CreateUserDTO } from './dto/create-user.dt';
import { UpdateUserDTO } from './dto/update-user.dt';

@Injectable()
export class UserService {
  private users: User[] = [];

  // TODO: Implement methods for CRUD operations using access to external DB

  //TODO: Implement method
  async findAll(
    sort: 'asc' | 'desc' = 'asc',
    limit: number,
  ): Promise<UserDTO[]> {
    return [
      {
        _id: '1',
        name: 'name',
        email: 'john.doe@email.com',
        role: UserRole.USER,
      },
    ];
  }

  // TODO: Implement method
  async findById(id: string): Promise<UserDTO> {
    return {
      _id: '1',
      name: 'name',
      email: 'john.doe@email.com',
      role: UserRole.USER,
    };
  }

  // TODO: Implement method
  async create(user: CreateUserDTO): Promise<UserDTO> {
    return {
      _id: '1',
      name: 'name',
      email: 'john.doe@email.com',
      role: UserRole.USER,
    };
  }

  // TODO: Implement method
  async update(id: string, user: UpdateUserDTO): Promise<UserDTO> {
    return {
      _id: '1',
      name: 'name',
      email: 'john.doe@email.com',
      role: UserRole.USER,
    };
  }

  // TODO: Implement method
  async delete(id: string): Promise<void> {
    // TODO: Implement method
  }
}
