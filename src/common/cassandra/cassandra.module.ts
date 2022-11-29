import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
    constructor( 
        private userService: UserService
        ){}

    @Get()
    async getUsers():Promise<User[]>{
        return this.userService.getUsers();
    }

    @Post()
    async createUsers(@Body() body:CreateUserDto){
        const user: CreateUserDto = body;
        const response = await this.createUsers(user);
        return response;
    }

    // @DELETE(':id')
    // async deleteUsers(@Param() id)
}
