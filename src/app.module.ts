import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { RateModule } from './rate/rate.module';
import { CrawlerModule } from './crawler/crawler.module';
import { ChapterModule } from './chapter/chapter.module';
import { ListModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    CommentModule,
    RateModule,
    CrawlerModule,
    ChapterModule,
    ListModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
