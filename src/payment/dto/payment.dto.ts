import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    required: true,
    description: 'Token generated from Stripe',
    example: 'tok_1234567890',
  })
  token: string;

  @ApiProperty({
    required: true,
    description: 'Email of user',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Amount of transaction (must be integer)',
    default: 0,
    example: faker.finance.amount(10, 100, 0),
  })
  amount: number;

  @ApiProperty({
    required: false,
    description: 'Description',
    example: faker.commerce.productDescription(),
  })
  description?: string;
}
