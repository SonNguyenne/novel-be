import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
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
