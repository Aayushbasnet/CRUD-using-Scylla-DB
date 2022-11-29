
import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { User } from 'src/user/model/user.model';
import * as uuid from 'uuid';
@Injectable()
export class UserDbRepository implements OnModuleInit {

    constructor(private cassandraService: CassandraService) { }

    userMapper: mapping.ModelMapper<User>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'User': {
                    tables: ['user'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
    }

    async getUsers() {
        return (await this.userMapper.findAll());
    }

    async getOneUser(id:string) {
        return (await this.userMapper.find({id})).first();
    }

    async createUsers(body:User){
        body.id = uuid.v4();
        console.log((await this.userMapper.insert(body)))
        return (await this.userMapper.insert(body)).first();
    }

    async deleteUser(id:string){
        return await this.userMapper.remove({id});
    }

    async updateUser(id:string, body:UpdateUserDto){
        return (await this.userMapper.update({id,...body})).first();
        // return  {id,...body};
    }
}