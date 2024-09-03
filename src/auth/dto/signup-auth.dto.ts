import { PickType } from '@nestjs/swagger'
import { AuthDto } from './auth.dto'

export class SignupAuthDto extends PickType(AuthDto, ['name', 'email', 'password']) {}
