import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Request sent' })
  async payment(@Body() paymentDto: PaymentDto) {
    try {
      const paymentResult =
        await this.paymentService.processPayment(paymentDto);
      return { success: true, paymentResult };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
