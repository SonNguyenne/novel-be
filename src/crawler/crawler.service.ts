import { CrawlerDto } from './dto/crawler.dto';
import { crawling } from '../utils/crawling';
import * as he from 'he';
import {
  ChapterInterface,
  ProductInterface,
} from './interface/CrawlerInteface';

export class CrawlerService {
  async crawler(crawlerDto: CrawlerDto) {
    try {
      const result = await crawling(crawlerDto.uri, ($: cheerio.CheerioAPI) => {
        // Check last character of uri
        if (crawlerDto.uri.slice(-1) === '/')
          crawlerDto.uri = crawlerDto.uri.slice(0, -1);

        if (!$('div#views').attr('data-id')) return false;

        // Get story information
        const id = $('div#views').attr('data-id').trim();
        const name = $('h1.crop-text-1').text().trim();
        const author = $('.table-column2.crop-text-1 a').text().trim();
        const chapterCount = $('a[href="#dsc"] span').text().trim();
        const image = $('.book3d img').attr('data-src').trim();
        const status = $('.table-column2.crop-text-1 span').text().trim();
        const description = $('.excerpt-full.hidden').text().trim();

        const newStory: ProductInterface = {
          id: +id,
          name,
          author,
          chapterCount: +chapterCount,
          image,
          status,
          description,
          chapters: [],
        };

        return newStory;
      });

      if (result) {
        // Get chapter content - Break if paid content
        let foundContent = false;
        for (let i = 1; i <= result.chapterCount; i++) {
          // TODO: Change length
          const uri = `${crawlerDto.uri}/chap/${result.id}-chuong-${i}/`;

          await crawling(uri, ($: cheerio.CheerioAPI) => {
            const chapterName = $('h1.text-center')
              .children()
              .remove()
              .end()
              .text()
              .trim();

            const element = $('.reading');
            element.find('*:not(br)').remove();

            // Check if VIP content
            if (element.html()) {
              foundContent = true;

              const chapter: ChapterInterface = {
                productId: result.id,
                chapterName,
                content: he.decode(element.html()).slice(30, 60),
                chapterNumber: i,
              };

              result.chapters.push(chapter);
            } else {
              foundContent = false;
            }

            if (!foundContent) return;
          });
        }
        return { data: result, message: 'Data found' };
      } else {
        return { data: null, message: 'Not found (Wrong uri or element)' };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
