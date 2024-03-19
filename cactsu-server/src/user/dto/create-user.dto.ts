import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    phoneNumber: string;

    @IsString()
    username: string;

    @IsString()
    @MinLength(6, { message: "Password is too short" })
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;
}
