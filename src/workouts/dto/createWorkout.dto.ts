import { PickType } from '@nestjs/swagger';
import { WorkoutsEntity } from '../workouts.entity';

export class CreateWorkoutDto extends PickType(WorkoutsEntity, [
  'name',
  'weekDay',
  'userId',
  'exercises',
]) {}
