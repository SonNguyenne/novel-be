import { ApiProperty } from '@nestjs/swagger';

export class CrawlerDto {
  @ApiProperty({
    description: 'Link of website',
    example: 'www.google.com',
  })
  uri: string;

  @ApiProperty({
    description: 'Class or id contains content',
    example: '.content | #content-body',
  })
  element?: string;
}
