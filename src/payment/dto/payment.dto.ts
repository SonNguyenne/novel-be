import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { InheritChapterDto } from '../../chapter/dto/chapter.dto'

export class PaymentDto {
  @ApiProperty({ required: true, default: 1 })
  userId: number

  @ApiProperty({
    required: true,
    description: 'Amount of the payment',
    minimum: 50,
    type: 'number',
    example: faker.finance.amount({ min: 50, max: 100, dec: 0 }),
  })
  amount: number

  @ApiProperty()
  User?: {
    connect: {
      id: number
    }
  }

  @ApiProperty({ type: () => [InheritChapterDto] })
  chapters: InheritChapterDto[]
}
