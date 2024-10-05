import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ChapterService } from './chapter.service'
import { CreateChapterDto, UpdateChapterDto } from './chapter.dto'

@ApiTags('chapter')
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Chapter created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Chapters retrieved successfully' })
  findAll() {
    return this.chapterService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chapter retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found chapter' })
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(+id)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Chapter updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Not found chapter' })
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Chapter deleted successfully' })
  @ApiNotFoundResponse({ description: 'Not found chapter' })
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id)
  }
}
