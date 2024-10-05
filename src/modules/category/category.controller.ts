import { ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './category.dto'
import { DeleteResponse, GetResponse, PatchResponse, PostResponse } from 'src/common'

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @PostResponse('Category')
  @ApiUnprocessableEntityResponse({ description: 'Name is already taken' })
  async create(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.create(categoryDto)
  }

  @Get()
  @GetResponse('Category')
  async findAll() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  @GetResponse('Category')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id)
  }

  @Patch(':id')
  @PatchResponse('Category')
  @ApiUnprocessableEntityResponse({ description: 'Name is already taken' })
  async update(@Param('id') id: string, @Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.update(+id, categoryDto)
  }

  @Delete(':id')
  @DeleteResponse('Category')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id)
  }
}
