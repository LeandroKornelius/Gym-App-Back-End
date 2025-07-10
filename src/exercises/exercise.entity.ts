import { IsNumber, IsString } from 'class-validator';

export class ExerciseEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
