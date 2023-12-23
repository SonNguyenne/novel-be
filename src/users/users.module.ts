import { ProductsService } from './../products/products.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProductsService],
})
export class UsersModule {}
