import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly db: DatabaseService) {}

  async searchByName(name: string, value: string) {
    const query = `SELECT * FROM Exercises WHERE ${name} LIKE '%${value}%'`;
    return await this.db.query(query);
  }
}
