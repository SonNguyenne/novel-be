import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ChapterModule } from 'src/chapter/chapter.module'
import { RateModule } from 'src/rate/rate.module'

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, ChapterModule, RateModule],
})
export class ProductModule {}
