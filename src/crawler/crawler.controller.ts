import { Controller, Body, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CrawlerService } from './crawler.service';
import { TruyenHdDto, TruyenFullDto } from './dto/crawler.dto';

@ApiTags('crawler')
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('/from-truyenhd')
  @ApiCreatedResponse({ description: 'Crawl successfully' })
  fromTruyenHd(@Body() crawlerDto: TruyenHdDto) {
    return this.crawlerService.fromTruyenhd(crawlerDto);
  }

  @Post('/from-truyenfull')
  @ApiCreatedResponse({ description: 'Crawl successfully' })
  fromTruyenFull(@Body() crawlerDto: TruyenFullDto) {
    return this.crawlerService.fromTruyenfull(crawlerDto);
  }
}
