// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly db: DatabaseService) {}

  async processPayment(payload: any, userId: number) {
    console.log('[processPayment] Received payload:', payload);

    const result = await this.db.execute(
      `INSERT INTO payments (user_id, card_number, card_owner, expiry_date, cvv) VALUES (?, ?, ?, ?, ?)`,
      [
        userId,
        payload.cardNumber,
        payload.cardOwner,
        payload.expiryDate,
        payload.cvv,
      ],
    );

    return {
      status: 'success',
      paymentId: result.insertId,
      userId,
    };
  }
}
