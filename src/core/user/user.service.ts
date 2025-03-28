import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dt';
import { CreateUserDTO } from './dto/create-user.dt';
import { UpdateUserDTO } from './dto/update-user.dt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(
    sort: 'asc' | 'desc' = 'asc',
    limit: number,
  ): Promise<UserDTO[]> {
    const queryResult = await this.userModel
      .find()
      .sort({ createdAt: sort })
      .limit(limit)
      .exec();

    return queryResult.map((user) => new UserDTO(user));
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }

    return new UserDTO(user);
  }

  async create(user: CreateUserDTO): Promise<UserDTO> {
    const newUser = new UserDTO({
      ...user,
      createdAt: new Date(),
    } as User);

    const existingUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (existingUser) {
      throw new HttpException('User with this email already exists', 400);
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    const response = await this.userModel.create({
      ...newUser,
      password: hashedPassword,
    });

    return new UserDTO(response);
  }

  async update(id: string, userUpdate: UpdateUserDTO): Promise<UserDTO> {
    if (userUpdate.email) {
      const existingUser = await this.userModel
        .findOne({ email: userUpdate.email })
        .exec();

      if (existingUser) {
        throw new HttpException('User with this email already exists', 400);
      }
    }

    if (userUpdate.password) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        userUpdate.password,
        saltOrRounds,
      );
      userUpdate.password = hashedPassword;
    }

    await this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...userUpdate,
        },
      )
      .exec();

    return new UserDTO(userUpdate as User);
  }

  async delete(id: string): Promise<void> {
    const response = await this.userModel.findByIdAndDelete(id).exec();

    console.log(response);
  }
}
