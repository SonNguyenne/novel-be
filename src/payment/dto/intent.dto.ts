import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class IntentDto {
  @ApiProperty({
    required: true,
    description: 'Amount of transaction (must be integer)',
    default: 0,
    minimum: 50,
    example: faker.finance.amount({ min: 50, max: 100, dec: 0 }),
  })
  amount: number

  @ApiProperty({
    required: false,
    description: 'Description',
    example: faker.commerce.productDescription(),
  })
  description?: string
}
