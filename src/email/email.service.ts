import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as uuid from 'uuid';
import { Email } from './entities/email.entity';
import { EmailDbRepository } from './repository/email.repository';
@Injectable()
export class EmailService {
  constructor(private emailDbRepository: EmailDbRepository){}

  async create(body: Email) {
    try {
      body.id = uuid.v4();
      return await this.emailDbRepository.create(body);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.emailDbRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.emailDbRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateEmailDto: UpdateEmailDto) {
    try {
      const email = await this.emailDbRepository.findOne(id);
      Object.assign(email, updateEmailDto);
      return await this.emailDbRepository.create(email);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    return await this.emailDbRepository.delete(id);
  }
}
