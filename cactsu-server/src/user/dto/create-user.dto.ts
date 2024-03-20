import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Matches(/^[a-z ,.'-]+$/i, { message: "Invalid name format" })
    @IsNotEmpty({message: "Name is required"})
    name: string;

    @IsString()
    @Matches(/^[a-z ,.'-]+$/i, { message: "Invalid surname format" })
    @IsNotEmpty({message: "Surname is required"})
    surname: string;

    @IsString()
    @MinLength(8, { message: "Password is too short" })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, 
    { message: "Password must contain at least one letter and one digit" })
    @IsNotEmpty({message: "Password is required"})
    password: string;

    @IsString()
    @Matches(/^\+[0-9]{1,3}[0-9]{9}$/, { message: "Phone number must contain 9 digits. And it starts with the country code" })
    @IsNotEmpty({message: "Phone number is required"})
    phoneNumber: string;

    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: "Invalid username format" })
    @IsNotEmpty({message: "Username is required"})
    username: string;
}
