import { ApiProperty, PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class VerifyAuthDto extends PickType(AuthDto, ['email']) {
  @ApiProperty({
    description: 'Confirmation code',
    example: '123456',
  })
  code: number;
}
