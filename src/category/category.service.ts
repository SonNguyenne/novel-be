import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    const response = {
      statusCode: 201,
      message: 'Category created successfully',
      data: createCategoryDto,
    };
    return response;
  }

  findAll() {
    const categoryList = []; // Retrieve from db

    const response = {
      statusCode: 200,
      message: 'Category list was successfully retrieved',
      data: categoryList,
    };
    return response;
  }

  findOne(id: number) {
    const category = {}; //Retrieve from db

    const response = {
      statusCode: 200,
      message: 'Category was successfully retrieved',
      data: category,
    };

    return response;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const response = {
      statusCode: 200,
      message: `Category id ${id} was successfully updated`,
      data: updateCategoryDto,
    };

    return response;
  }

  remove(id: number) {
    const response = {
      statusCode: 200,
      message: `Category id ${id} was successfully deleted`,
    };

    return response;
  }
}
