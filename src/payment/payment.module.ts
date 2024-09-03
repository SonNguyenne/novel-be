import { PrismaModule } from 'src/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [PrismaModule],
})
export class PaymentModule {}
