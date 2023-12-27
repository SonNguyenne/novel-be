import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name)
      throw new BadRequestException('Name cannot be null');

    const result = this.categoryService.create(createCategoryDto);
    if (!result) {
      throw new HttpException(
        'Failed to create category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Get()
  findAll() {
    const result = this.categoryService.findAll();

    if (!result) {
      throw new HttpException(
        'Failed to retrieve category list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const result = this.categoryService.findOne(+id);

    if (!result) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (!updateCategoryDto.name)
      throw new BadRequestException('Name cannot be null');

    const result = this.categoryService.update(+id, updateCategoryDto);

    if (!result) {
      throw new HttpException(
        'Failed to update category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.categoryService.remove(+id);

    if (!result) {
      throw new HttpException(
        'Failed to update category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }
}
