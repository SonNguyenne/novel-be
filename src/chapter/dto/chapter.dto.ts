import { ApiProperty, PickType } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ChapterDto {
  @ApiProperty({ required: false })
  id?: number

  @ApiProperty({ required: true, default: 1 })
  productId: number

  @ApiProperty({
    required: true,
    description: 'Name of chapter',
    example: faker.commerce.productName(),
  })
  chapterName: string

  @ApiProperty({
    required: true,
    description: 'Content of book',
    example: faker.commerce.productDescription(),
  })
  content: string

  @ApiProperty({
    required: true,
    default: 1,
  })
  chapterNumber: number

  @ApiProperty({
    required: false,
    default: 0,
    example: faker.finance.amount({ min: 10, max: 100, dec: 2 }),
  })
  price?: number

  @ApiProperty()
  Product?: {
    connect: {
      id: number
    }
  }
}

export class InheritChapterDto extends PickType(ChapterDto, ['id']) {}
