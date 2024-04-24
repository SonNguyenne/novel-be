import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async processPayment(paymentDto: PaymentDto) {
    try {
      // TODO: Add transaction to history
      const { token, email, amount, description } = paymentDto;
      // const paymentMethod = await stripe.paymentMethods.create({
      //   type: 'card',
      //   card: {
      //     token: token,
      //   },
      // });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        description,
        // payment_method: paymentMethod.id,
        automatic_payment_methods: {
          enabled: true,
        },
        // return_url: 'http://localhost:3001/api/payment',
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
