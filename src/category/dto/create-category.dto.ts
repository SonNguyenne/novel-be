import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The unique identifier for the category. (Auto-incremented)',
    example: 1,
    required: false,
  })
  categoryId: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Kiếm hiệp',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'Đánh nhau gay gấn',
    required: false,
  })
  description?: string;
}
