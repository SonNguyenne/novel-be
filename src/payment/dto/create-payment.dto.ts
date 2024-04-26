import { PickType } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';

export class CreatePaymentDto extends PickType(PaymentDto, [
  'userId',
  'amount',
  'chapters',
]) {}
