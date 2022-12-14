
import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { User } from 'src/user/model/user.model';
@Injectable()
export class UserDbRepository implements OnModuleInit {
   constructor(private cassandraService: CassandraService) {}

    userMapper: mapping.ModelMapper<User>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'User': {
                    tables: ['user'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings()
                }
            }
        }

        this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
    }

    async findAll(): Promise<User[]>{
        const response = (await this.userMapper.findAll()).toArray(); 
        return response;

    }

    async findOne(id:string):Promise<User> {
        const response =  (await this.userMapper.find({id})).first();
        return response;
    }

    async insert(body:User):Promise<User>{
        await this.userMapper.insert(body);
        return body;
    }

    async delete(id:string):Promise<string>{
        await this.userMapper.remove({id});
        return "Delete successful";
    }
}