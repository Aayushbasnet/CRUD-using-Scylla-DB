import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDbRepository } from './repository/db/user.repository';
import { CassandraService } from 'src/common/cassandra/cassandra.service';

@Module({
  providers: [UserService, UserDbRepository, CassandraService],
  controllers: [UserController]
})
export class UserModule {}
