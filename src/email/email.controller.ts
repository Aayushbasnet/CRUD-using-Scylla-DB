import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async createEmail(@Body() createEmailDto: CreateEmailDto) {
    return await this.emailService.create(createEmailDto);
  }

  @Get()
  async findAllEmail() {
    return await this.emailService.findAll();
  }

  @Get(':id')
  async findOneEmail(@Param('id') id: string) {
    return await this.emailService.findOne(id);
  }

  @Patch(':id')
  async updateEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return await this.emailService.update(id, updateEmailDto);
  }

  @Delete(':id')
  async deleteEmail(@Param('id') id: string) {
    return await this.emailService.delete(id);
  }
}
