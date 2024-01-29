import { Controller, Body, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CrawlerService } from './crawler.service';
import { CrawlerDto } from './dto/crawler.dto';

@ApiTags('crawler')
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('/fromTruyenhd')
  @ApiCreatedResponse({ description: 'Crawl successfully' })
  fromTruyenHd(@Body() crawlerDto: CrawlerDto) {
    return this.crawlerService.fromTruyenhd(crawlerDto);
  }

  @Post('/fromTruyenfull')
  @ApiCreatedResponse({ description: 'Crawl successfully' })
  fromTruyenFull(@Body() crawlerDto: CrawlerDto) {
    return this.crawlerService.fromTruyenfull(crawlerDto);
  }
}
