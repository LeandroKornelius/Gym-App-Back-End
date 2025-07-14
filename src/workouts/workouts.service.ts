import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateWorkoutDto } from './dto/createWorkout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly db: DatabaseService) {}

  async createWorkoutForStudent(
    createWorkoutDto: CreateWorkoutDto,
    coachId: number,
  ) {
    console.log(coachId);
    console.log(createWorkoutDto);
    const result = await this.db.execute(
      `INSERT INTO workouts (name, weekDay, userId, coachId)
     VALUES (?, ?, ?, ?)`,
      [
        createWorkoutDto.name,
        createWorkoutDto.weekDay,
        createWorkoutDto.userId,
        coachId,
      ],
    );

    const workoutId = result.insertId;

    for (const ex of createWorkoutDto.exercises) {
      await this.db.execute(
        `INSERT INTO workoutexercises (workoutId, exerciseId, sets, repetitions, weight)
       VALUES (?, ?, ?, ?, ?)`,
        [workoutId, ex.exerciseId, ex.sets, ex.repetitions, ex.weight || 0],
      );
    }

    return { workoutId };
  }
}
