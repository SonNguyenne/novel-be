import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SigninAuthDto, SignupAuthDto } from './auth.dto'

@ApiTags('auth')
@ApiBadRequestResponse({ description: 'Invalid input' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'Sign up successfully' })
  signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto)
  }

  @Post('/login')
  @ApiOkResponse({ description: 'Login successful' })
  @HttpCode(200)
  signin(@Body() signinAuthDto: SigninAuthDto) {
    return this.authService.signin(signinAuthDto)
  }
}
