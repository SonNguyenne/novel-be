import { ApiProperty } from '@nestjs/swagger';

export class CrawlerDto {
  @ApiProperty({
    description: 'Link of website',
    example:
      'https://truyenhdx.com/truyen/benh-my-nhan-bao-hong-trong-show-tre-em/',
  })
  uri: string;
}
