import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { ResendAuthDto } from './dto/resend-auth.dto';

@ApiTags('auth')
@ApiBadRequestResponse({ description: 'Invalid input' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'Sign up successfully' })
  signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Post('/resend-code')
  @ApiOkResponse({ description: 'Resend confirmation code successful' })
  @HttpCode(200)
  resend(@Body() resendAuthDto: ResendAuthDto) {
    return this.authService.resend(resendAuthDto);
  }

  @Post('/verify-code')
  @ApiOkResponse({ description: 'Verification successful' })
  @HttpCode(200)
  verify(@Body() verifyAuthDto: VerifyAuthDto) {
    return this.authService.verify(verifyAuthDto);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'Login successful' })
  @HttpCode(200)
  signin(@Body() signinAuthDto: SigninAuthDto) {
    return this.authService.signin(signinAuthDto);
  }

  @Post('/forgot-password')
  @ApiOkResponse({ description: 'Email reset password sent successful' })
  @HttpCode(200)
  forgot(@Body() resendAuthDto: ResendAuthDto) {
    return this.authService.forgot(resendAuthDto);
  }

  @Post('/refresh-token')
  @ApiOkResponse({ description: 'Refresh successful' })
  @HttpCode(200)
  refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(refreshAuthDto);
  }

  @Post('/signout')
  @ApiOkResponse({ description: 'Signout successful' })
  @HttpCode(200)
  signout() {
    return this.authService.signout();
  }
}
