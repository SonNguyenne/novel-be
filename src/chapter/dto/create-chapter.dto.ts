import { PickType } from '@nestjs/swagger'
import { ChapterDto } from './chapter.dto'

export class CreateChapterDto extends PickType(ChapterDto, [
  'productId',
  'chapterName',
  'content',
  'chapterNumber',
  'price',
]) {}
