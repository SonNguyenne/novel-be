import { Controller, Get, Body, Patch, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ListService } from './list.service'
import { UpdateListDto } from './list.dto'
import { GetResponse, PatchResponse } from 'src/common'

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/')
  @GetResponse('List')
  findAllReading(@Query('userId') userId: number, @Query('classification') classification: string) {
    return this.listService.findAll(userId, classification)
  }

  @Patch()
  @PatchResponse('List')
  update(@Body() updateListDto: UpdateListDto) {
    return this.listService.update(updateListDto)
  }
}
