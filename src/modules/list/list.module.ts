import { Module } from '@nestjs/common'
import { ListController } from './list.controller'
import { ListService } from './list.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [PrismaModule],
})
export class ListModule {}
