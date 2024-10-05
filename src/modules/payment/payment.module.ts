import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [PrismaModule],
})
export class PaymentModule {}
