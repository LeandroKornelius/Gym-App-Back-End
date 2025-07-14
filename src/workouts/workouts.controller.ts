import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/types/userRoles.type';
import { CreateWorkoutDto } from './dto/createWorkout.dto';
import { WorkoutsService } from './workouts.service';

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.COACH)
  @Post()
  async createWorkout(@Body() dto: CreateWorkoutDto, @Request() req) {
    return this.workoutsService.createWorkoutForStudent(dto, req.user.userId);
  }
}
