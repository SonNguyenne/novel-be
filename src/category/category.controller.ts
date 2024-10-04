import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Category created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiUnprocessableEntityResponse({ description: 'Name is already taken' })
  async create(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.create(categoryDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Categories retrieved successfully' })
  async findAll() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Category retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found category' })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Category updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiUnprocessableEntityResponse({ description: 'Name is already taken' })
  async update(@Param('id') id: string, @Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.update(+id, categoryDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Category deleted successfully' })
  @ApiNotFoundResponse({ description: 'Not found category' })
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id)
  }
}
