import { Module } from '@nestjs/common'
import { CrawlerService } from './crawler.service'
import { CrawlerController } from './crawler.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [CrawlerController],
  providers: [CrawlerService],
  imports: [PrismaModule],
})
export class CrawlerModule {}
