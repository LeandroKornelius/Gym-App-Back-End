// src/payments/payments.controller.ts
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SignatureGuard } from 'src/auth/guards/signature.guard';
import { SignedPayloadDto } from './dto/payment.dto';
import { PaymentsService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, SignatureGuard)
  @Post()
  async createPayment(@Body() body: SignedPayloadDto, @Req() req) {
    const user = req.user;
    return this.paymentsService.processPayment(body.payload, user.userId);
  }
}
