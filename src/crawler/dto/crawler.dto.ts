import { ApiProperty } from '@nestjs/swagger';

export class TruyenHdDto {
  @ApiProperty({
    description: 'Link of website',
    example:
      'https://truyenhdx.com/truyen/benh-my-nhan-bao-hong-trong-show-tre-em/',
  })
  uri: string;
}

export class TruyenFullDto {
  @ApiProperty({
    description: 'Link of website',
    example: 'https://truyenfull.vn/thap-nien-90-nuoi-chong-tu-tam-be/',
  })
  uri: string;
}
