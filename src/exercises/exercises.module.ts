import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, DatabaseService],
})
export class ExercisesModule {}
