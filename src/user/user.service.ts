import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDbRepository } from './repository/db/user.repository';
import * as uuid from 'uuid';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private userDbRepository: UserDbRepository) {}

  async getUsers(): Promise<any> {
    try {
      return this.userDbRepository.findAll();
    } catch (error) {
      return error.message;
    }
  }

  async createUsers(body: User): Promise<any> {
    try {
      body.id = uuid.v4();
      return this.userDbRepository.insert(body);
    } catch (error) {
      return error.message;
    }
  }

  async getOneUser(id: string): Promise<User> {
    try {
      const response = await this.userDbRepository.findOne(id);
      if (!response) {
        throw new NotFoundException('User not found');
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.getOneUser(id);
    return this.userDbRepository.delete(id);
  }

  async updateUser(id: string, body: UpdateUserDto): Promise<User> {
    try {
      const user = await this.getOneUser(id);
      Object.assign(user, body);
      return this.userDbRepository.insert(user);
    } catch (error) {
      throw error;
    }
  }
}
