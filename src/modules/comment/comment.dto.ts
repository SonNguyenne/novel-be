import { faker } from '@faker-js/faker'
import { ApiProperty, PickType } from '@nestjs/swagger'

export class CommentDto {
  @ApiProperty({ required: false, default: 1 })
  id?: number

  @ApiProperty({
    description: 'Id of user',
    example: 1,
  })
  userId: string

  @ApiProperty({
    description: 'Id of product',
    example: 1,
  })
  productId: string

  @ApiProperty({
    description: 'Content of comment',
    example: faker.lorem.paragraph(),
  })
  content: string
}

export class InheritCommentDto extends PickType(CommentDto, ['id']) {}
