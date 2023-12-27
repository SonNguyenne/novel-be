import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
