import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [UsersService, DatabaseService],
  controllers: [UsersController]
})
export class UsersModule {}
