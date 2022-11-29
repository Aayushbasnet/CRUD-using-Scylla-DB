import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDbRepository } from './repository/db/user.repository';

@Injectable()
export class UserService {
  constructor(private userDbRepository: UserDbRepository) {}

  async getUsers() {
    try {
      return this.userDbRepository.getUsers();
    } catch (error) {
      return error.message;
    }
  }

  async createUsers(body: CreateUserDto) {
    try {
      return this.userDbRepository.createUsers(body);
    } catch (error) {
      return error.message;
    }
  }

  async getOneUser(id: string) {
    try {
      return this.userDbRepository.getOneUser(id);
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(id: string) {
    try {
      return this.userDbRepository.deleteUser(id);
    } catch (error) {
      return error.message;
    }
  }

  async updateUser(id:string, body: UpdateUserDto){
    try {
        return this.userDbRepository.updateUser(id, body);
    } catch (error) {
        return error.message;
    }
  }
}
