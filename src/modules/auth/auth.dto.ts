import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from '@nestjs/class-validator'

export class AuthDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string

  @ApiProperty({
    description: 'Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password',
    example: 'Asd!@#456',
  })
  @IsNotEmpty()
  password: string
}

export class SigninAuthDto extends PickType(AuthDto, ['email', 'password']) {}

export class SignupAuthDto extends PickType(AuthDto, ['name', 'email', 'password']) {}
