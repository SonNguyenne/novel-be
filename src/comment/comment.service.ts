import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(commentDto: CommentDto) {
    if (!commentDto.content)
      throw new BadRequestException('Content cannot be null');

    try {
      return await this.prisma.comment.create({
        data: {
          userId: +commentDto.userId,
          productId: +commentDto.productId,
          content: commentDto.content.trim(),
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAllByProductId(productId: number) {
    return await this.prisma.comment.findMany({
      where: { productId },
    });
  }

  async findAll() {
    return await this.prisma.comment.findMany({});
  }

  async update(id: number, commentDto: CommentDto) {
    if (!commentDto.content)
      throw new BadRequestException('Content cannot be null');

    try {
      return await this.prisma.comment.update({
        where: { id },
        data: {
          content: commentDto.content.trim(),
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    return await this.prisma.comment.delete({
      where: { id },
    });
  }
}
