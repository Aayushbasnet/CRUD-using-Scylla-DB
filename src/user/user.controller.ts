import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './model/user.model';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor( 
        private userService: UserService
        ){}

    @Get()
    async getUsers():Promise<User[]>{
        return this.userService.getUsers();
    }

    @Get(':id')
    async getOneUser(@Param('id') id:string):Promise<User>{
        return this.userService.getOneUser(id);
    }

    @Post()
    async createUsers(@Body() body:CreateUserDto): Promise<User>{
        const user: CreateUserDto = body;
        const response = await this.userService.createUsers(user);
        return response;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string): Promise<string>{
        return this.userService.deleteUser(id);
    }

    @Patch(':id')
        async updateUser(@Param('id') id:string, @Body() body:UpdateUserDto): Promise<User>{
            const updateUser: UpdateUserDto = body;
            return this.userService.updateUser(id, updateUser);
        }
    
}
