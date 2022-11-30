import { IsEmail, IsString } from "class-validator";

export class CreateEmailDto {
    @IsString()
    subject:string;

    @IsString()
    @IsEmail()
    from:string;

    @IsString()
    @IsEmail()
    to:string;

    @IsString()
    body:string;
}
