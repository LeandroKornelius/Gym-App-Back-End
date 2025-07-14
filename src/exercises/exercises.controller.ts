import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/isPublic.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/types/userRoles.type';
import { CreateExerciseDto } from './create-exercise.dto';
import { ExercisesService } from './exercises.service';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Public()
  @Get('search')
  async search(@Query('value') value: string) {
    return this.exercisesService.searchByName(value);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.COACH)
  @Post()
  async create(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<{ id: number }> {
    return await this.exercisesService.create(createExerciseDto);
  }
}
