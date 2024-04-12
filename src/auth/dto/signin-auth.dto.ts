import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class SigninAuthDto extends PickType(AuthDto, ['email', 'password']) {}
