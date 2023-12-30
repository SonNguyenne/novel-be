import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class ProductDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({
    description: 'Name of book',
    example: 'Avenger',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description of book',
    example: 'This book is so nice',
  })
  description?: string | null;

  @ApiProperty({
    description: 'Source of book',
    example: 'https://jaunty-bracelet.net/',
  })
  source: string;

  @ApiProperty({
    description: 'Image of book',
    example: 'https://loremflickr.com/640/480?lock=7052054822387712',
  })
  image: string;

  @ApiProperty({
    required: false,
    description: 'Status of book: PROGRESS | DONE',
    example: 'https://loremflickr.com/640/480?lock=7469231786426368',
  })
  status?: string;

  @ApiProperty({ required: false, default: 0 })
  price?: number;

  @ApiProperty({
    description: 'Author of book',
    example: 'Iron man',
  })
  authorName: string;

  @ApiProperty({ required: false, default: 0 })
  viewCount?: number;

  @ApiProperty({ required: true, default: 1 })
  userId: number;

  @ApiProperty()
  User?: {
    connect: {
      id: number;
    };
  };
}
