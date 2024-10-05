import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { CommentModule } from './comment/comment.module'
import { RateModule } from './rate/rate.module'
import { CrawlerModule } from './crawler/crawler.module'
import { ChapterModule } from './chapter/chapter.module'
import { ListModule } from './list/list.module'
import { AuthModule } from './auth/auth.module'
import { PaymentModule } from './payment/payment.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    CategoryModule,
    ProductModule,
    CommentModule,
    RateModule,
    CrawlerModule,
    ChapterModule,
    ListModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
