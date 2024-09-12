import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninAuthDto } from './dto/signin-auth.dto'
import { SignupAuthDto } from './dto/signup-auth.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

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
