import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { InheritProductDto } from '../../product/dto/product.dto';
import { InheritChapterDto } from '../../chapter/dto/chapter.dto';

export class ListDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({ required: true, default: 1 })
  userId: number;

  @ApiProperty({
    required: true,
    description: 'Classification of list',
    example: faker.helpers.arrayElement(['READING', 'FAVORITE']),
  })
  classification: string;

  @ApiProperty({ type: () => [InheritProductDto] })
  products: InheritProductDto[];

  @ApiProperty({ type: () => [InheritChapterDto] })
  chapters: InheritChapterDto[];

  @ApiProperty()
  User?: {
    connect: {
      id: number;
    };
  };
}
