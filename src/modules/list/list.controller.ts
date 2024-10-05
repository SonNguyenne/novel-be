import { Controller, Get, Body, Patch, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ListService } from './list.service'
import { UpdateListDto } from './list.dto'

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
