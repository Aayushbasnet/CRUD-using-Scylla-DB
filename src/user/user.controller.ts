import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
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
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getOneUser(@Param('id') id:string):Promise<User>{
        return await this.userService.getOneUser(id);
    }

    @Post()
    async createUsers(@Body() body:CreateUserDto): Promise<User>{
        const user: CreateUserDto = body;
        const response = await this.userService.createUsers(user);
        return response;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id:string){
        return await this.userService.deleteUser(id);
    }

    @Patch(':id')
        async updateUser(@Param('id') id:string, @Body() body:UpdateUserDto): Promise<any>{
            const updateUser: UpdateUserDto = body;
            return await this.userService.updateUser(id, updateUser);
        }
    
}
