import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ChapterModule } from 'src/chapter/chapter.module'

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, ChapterModule],
})
export class ProductModule {}
