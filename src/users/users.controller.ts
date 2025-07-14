import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/isPublic.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/types/userRoles.type';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  async registerStudent(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.role !== 'STUDENT') {
      throw new UnauthorizedException('Only STUDENT role can self-register');
    }

    const user =
      await this.usersService.createUserWithHashedPassword(createUserDto);

    return this.authService.login({
      userId: user.id,
      username: createUserDto.name,
      role: createUserDto.role,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Post('coach')
  async registerCoach(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.role !== 'COACH') {
      throw new UnauthorizedException(
        'Only COACH role is allowed in this endpoint',
      );
    }
    return this.usersService.createUserWithHashedPassword(createUserDto);
  }
}
