import { Module } from '@nestjs/common';
import { SignatureGuard } from 'src/auth/guards/signature.guard';
import { DatabaseService } from 'src/database/database.service';
import { UsersModule } from 'src/users/users.module';
import { PaymentsService } from './payment.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, SignatureGuard, DatabaseService],
})
export class PaymentsModule {}
