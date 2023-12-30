import { PickType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class CreateProductDto extends PickType(ProductDto, [
  'name',
  'description',
  'source',
  'image',
  'status',
  'price',
  'authorName',
  'userId',
  'categories',
]) {}
