import { Controller, Body, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CrawlerService } from './crawler.service';
import { CrawlerDto } from './dto/crawler.dto';

@ApiTags('crawler')
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('/fromTruyenHd')
  @ApiCreatedResponse({ description: 'Crawl successfully' })
  crawler(@Body() crawlerDto: CrawlerDto) {
    return this.crawlerService.crawler(crawlerDto);
  }
}
