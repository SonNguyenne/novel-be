import { PickType } from '@nestjs/swagger';
import { ChapterDto } from './chapter.dto';

export class UpdateChapterDto extends PickType(ChapterDto, [
  'chapterName',
  'content',
  'chapterNumber',
  'price',
]) {}
