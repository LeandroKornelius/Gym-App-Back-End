import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/types/userRoles.type';

export class UserEntity {
  @IsNumber()
  id: number;

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

  @IsString()
  public_key: string;
}
