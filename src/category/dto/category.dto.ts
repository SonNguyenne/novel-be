import { ApiProperty, PickType } from '@nestjs/swagger'

export class CategoryDto {
  @ApiProperty({
    required: false,
    default: 1,
  })
  id?: number

  @ApiProperty({
    description: 'Name of the category',
    example: 'Kiếm hiệp',
  })
  name: string

  @ApiProperty({
    description: 'Description of the category',
    example: 'Đánh nhau gay gấn',
    required: false,
  })
  description?: string
}

export class InheritCategoryDto extends PickType(CategoryDto, ['id']) {}
