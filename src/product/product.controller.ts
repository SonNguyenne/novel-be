import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Product created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Products retrieved successfully' })
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Product retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found product' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @Get(':id/chapter/:chapterNumber')
  @ApiOkResponse({ description: 'Chapter retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found Chapter' })
  findOneChapter(@Param('id') id: string, @Param('chapterNumber') chapterNumber: string) {
    return this.productService.findOneChapter(+id, +chapterNumber)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Product updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Not found product' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Product deleted successfully' })
  @ApiNotFoundResponse({ description: 'Not found product' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
