import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.db.query<UserEntity>(
      `SELECT * FROM users WHERE email = '${email}' LIMIT 1`,
    );
    return result[0] || null;
  }

  async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
    // Before creating we must check if a user with that email doesn't exist already
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This email is already in use');
    }

    // Also, we must hash the password for increased security
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;

    // Creates user
    const result = await this.db.execute(
      `INSERT INTO users (name, email, password, role) VALUES ('${createUserDto.name}', '${createUserDto.email}', '${createUserDto.password}', '${createUserDto.role}')`,
    );
    return {
      id: result.insertId,
    };
  }
}
