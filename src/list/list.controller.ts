import { Controller, Get, Body, Patch, Query, Put } from '@nestjs/common'
import { ListService } from './list.service'
import { UpdateListDto } from './dto/update-list.dto'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/')
  @ApiOkResponse({ description: 'Reading list retrieved successfully' })
  findAllReading(@Query('userId') userId: number, @Query('classification') classification: string) {
    return this.listService.findAll(userId, classification)
  }

  @Patch()
  @ApiOkResponse({ description: 'Updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Body() updateListDto: UpdateListDto) {
    return this.listService.update(updateListDto)
  }
}
