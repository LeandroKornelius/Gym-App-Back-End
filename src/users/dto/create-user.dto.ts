import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../users.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
  'role',
]) {}
