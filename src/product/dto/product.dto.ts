import { ApiProperty, PickType } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { InheritCategoryDto } from '../../category/dto/category.dto';

export class ProductDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty({
    description: 'Name of book',
    example: faker.commerce.productName(),
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description of book',
    example: faker.commerce.productDescription(),
  })
  description?: string | null;

  @ApiProperty({
    description: 'Source of book',
    example: 'Sưu tầm',
  })
  source: string;

  @ApiProperty({
    description: 'Image of book',
    example: faker.image.url(),
  })
  image: string;

  @ApiProperty({
    required: false,
    description: 'Status of book: PROGRESS | DONE',
    example: 'PROGRESS',
  })
  status?: string;

  @ApiProperty({
    description: 'Author of book',
    example: faker.person.fullName(),
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

  @ApiProperty({ type: () => [InheritCategoryDto] })
  categories: InheritCategoryDto[];
}

export class InheritProductDto extends PickType(ProductDto, ['id']) {}
