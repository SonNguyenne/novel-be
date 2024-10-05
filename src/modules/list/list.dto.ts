import { ApiProperty, PickType } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'
import { InheritProductDto } from '../product/product.dto'
import { InheritChapterDto } from '../chapter/chapter.dto'

export class ListDto {
  @ApiProperty({ required: false, default: 1 })
  id?: number

  @ApiProperty({ required: true, default: 1 })
  userId: number

  @ApiProperty({
    required: true,
    description: 'Classification of list',
    example: faker.helpers.arrayElement(['READING', 'FAVORITE']),
  })
  classification: string

  @ApiProperty({ type: () => [InheritProductDto] })
  products: InheritProductDto[]

  @ApiProperty({ type: () => [InheritChapterDto] })
  chapters: InheritChapterDto[]

  @ApiProperty()
  User?: {
    connect: {
      id: number
    }
  }
}

export class UpdateListDto extends PickType(ListDto, ['userId', 'classification', 'chapters', 'products']) {}
