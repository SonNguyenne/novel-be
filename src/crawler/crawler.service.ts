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

        // Get chapter content - Break if paid content
        let foundContent = false;
        for (let i = 1; i <= 3; i++) {
          // TODO: Change length
          const uri = `${crawlerDto.uri}/chap/${id}-chuong-${i}/`;

          crawling(uri, ($: cheerio.CheerioAPI) => {
            const chapterName = $('h1.text-center')
              .children()
              .remove()
              .end()
              .text()
              .trim();

            const element = $(crawlerDto.element);
            element.find('*:not(br)').remove();

            // Check if VIP content
            if (element.html()) {
              foundContent = true;

              const chapter: ChapterInterface = {
                productId: id,
                chapterName,
                content: he.decode(element.html()).slice(30, 90),
                chapterNumber: i,
              };

              // TODO: Push vô thì log ở đây ra nhưng mà trong `data: result` ko co
              // Do bất đồng bộ || promise trả dữ liệu từ crawling trên rồi.
              // --->>> Promise của utils/crawling.ts
              newStory.chapters.push(chapter);
            } else {
              foundContent = false;
            }

            if (!foundContent) return;
          });
        }

        return newStory;
      });

      if (result) {
        return { data: result, message: 'Data found' };
      } else {
        return { data: null, message: 'Not found (Wrong uri or element)' };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
