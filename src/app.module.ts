import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [CategoryModule, ProductModule, CommentModule, RateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
