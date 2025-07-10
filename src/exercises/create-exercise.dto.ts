import { PickType } from '@nestjs/swagger';
import { ExerciseEntity } from './exercise.entity';

export class CreateExerciseDto extends PickType(ExerciseEntity, [
  'name',
  'description',
]) {}
