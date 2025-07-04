import { PickType } from "@nestjs/swagger";
import { UserEntity } from "./users.entity";
import { UserRole } from "src/types/userRoles.type";

import { IsEmail, IsEnum, IsString, MaxLength, MinLength,  } from 'class-validator';


export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(18)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}