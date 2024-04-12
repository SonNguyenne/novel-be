import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class ResendAuthDto extends PickType(AuthDto, ['email']) {}
