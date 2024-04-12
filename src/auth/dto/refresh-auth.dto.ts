import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class RefreshAuthDto extends PickType(AuthDto, ['refreshToken']) {}
