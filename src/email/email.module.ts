import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailDbRepository } from './repository/email.repository';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, EmailDbRepository, CassandraService]
})
export class EmailModule {}
