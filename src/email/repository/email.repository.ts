
import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { Email } from '../entities/email.entity';

@Injectable()
export class EmailDbRepository implements OnModuleInit {
   constructor(private cassandraService: CassandraService) {}

    userMapper: mapping.ModelMapper<Email>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'Email': {
                    tables: ['email'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings()
                }
            }
        }

        this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('Email');
    }

    async findAll(): Promise<Email[]>{
        const response = (await this.userMapper.findAll()).toArray(); 
        return response;

    }

    async findOne(id:string):Promise<Email> {
        const response =  (await this.userMapper.find({id})).first();
        return response;
    }

    async create(body:Email):Promise<Email>{
        await this.userMapper.insert(body);
        return body;
    }

    async delete(id:string):Promise<string>{
        await this.userMapper.remove({id});
        return "Delete successful";
    }
}