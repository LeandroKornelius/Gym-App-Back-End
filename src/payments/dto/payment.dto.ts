// src/payments/dto/create-payment.dto.ts
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class PaymentPayloadDto {
  @IsString()
  cardNumber: string;

  @IsString()
  cardOwner: string;

  @IsString()
  expiryDate: string;

  @IsString()
  cvv: string;
}

export class SignedPayloadDto {
  @ValidateNested()
  @Type(() => PaymentPayloadDto)
  payload: PaymentPayloadDto;

  @IsString()
  signature: string;
}
