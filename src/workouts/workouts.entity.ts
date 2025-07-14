import { IsArray, IsNumber, IsString } from 'class-validator';

export class WorkoutsEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  weekDay: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  coachId: number;

  @IsArray()
  exercises: {
    exerciseId: number;
    sets: number;
    repetitions: number;
    weight: number;
  }[];
}
