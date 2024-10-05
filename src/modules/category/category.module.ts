import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [PrismaModule],
})
export class CategoryModule {}
