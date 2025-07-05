import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/auth/isPublic.decorator';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Public()
  @Get('search')
  async search(@Query('name') name: string, @Query('value') value: string) {
    return this.exercisesService.searchByName(name, value);
  }
}
