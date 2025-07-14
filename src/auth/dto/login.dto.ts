import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/users/users.entity';

export class LogInDto extends PickType(UserEntity, ['email', 'password']) {}
