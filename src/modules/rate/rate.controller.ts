import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RateService } from './rate.service'
import { RateDto, UpdateRateDto } from './rate.dto'
import { Authorization, DeleteResponse, GetResponse, PatchResponse, PostResponse } from 'src/common'

@ApiTags('rate')
@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @PostResponse('Rate')
  create(@Body() createRateDto: RateDto) {
    return this.rateService.create(createRateDto)
  }

  @Get(':id')
  @GetResponse('Rate')
  findAllByProductId(@Param('id') id: string) {
    return this.rateService.findOne(+id)
  }

  @Patch(':id')
  @PatchResponse('Rate')
  update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update(+id, updateRateDto)
  }

  @Delete(':id')
  @DeleteResponse('Rate')
  remove(@Param('id') id: string) {
    return this.rateService.remove(+id)
  }
}
