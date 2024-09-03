import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Comment created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  create(@Body() commentDto: CommentDto) {
    return this.commentService.create(commentDto)
  }

  @Get()
  @ApiOkResponse({ description: 'Comments retrieved successfully' })
  findAll() {
    return this.commentService.findAll()
  }

  @Get(':productId')
  @ApiOkResponse({ description: 'Comments retrieved successfully' })
  findAllByProductId(@Param('productId') productId: string) {
    return this.commentService.findAllByProductId(+productId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() commentDto: CommentDto) {
    return this.commentService.update(+id, commentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id)
  }
}
