import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateExerciseDto } from './create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly db: DatabaseService) {}

  async searchByName(name: string, value: string) {
    const query = `SELECT * FROM Exercises WHERE ${name} LIKE '%${value}%'`;
    return await this.db.query(query);
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<{ id: number }> {
    const result = await this.db.execute(
      `INSERT INTO Exercises (name, description) VALUES ('${createExerciseDto.name}', '${createExerciseDto.description}')`,
    );
    return {
      id: result.insertId,
    };
  }
}
