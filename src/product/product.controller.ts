import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNotModifiedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ChapterService } from 'src/chapter/chapter.service'
import { RateService } from 'src/rate/rate.service'

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly chapterService: ChapterService,
    private readonly rateService: RateService,
  ) {}

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

  @Get(':id/rate')
  @ApiOkResponse({ description: 'Rate retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found rate' })
  async findRate(@Param('id') id: string) {
    return await this.rateService.findAllByProductId(+id)
  }

  @Get(':id/chapter')
  @ApiOkResponse({ description: 'Chapters retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Not found Chapter' })
  async findChapter(@Param('id') id: string) {
    const chapters = await this.chapterService.findAll()
    return chapters.filter(chap => chap.productId === +id)
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

  @Post(':id/view')
  @ApiCreatedResponse({ description: 'Product view increase' })
  @ApiNotModifiedResponse({ description: 'View not updated' })
  async incrementView(@Param('id') id: string) {
    return await this.productService.incrementViewCount(+id)
  }
}
