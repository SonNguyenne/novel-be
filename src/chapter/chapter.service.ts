import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async create(createChapterDto: CreateChapterDto) {
    if (!createChapterDto.productId)
      throw new BadRequestException('Product ID cannot be null');
    if (!createChapterDto.chapterName)
      throw new BadRequestException('Name cannot be null');
    if (!createChapterDto.content)
      throw new BadRequestException('Content cannot be null');
    if (!createChapterDto.chapterNumber)
      throw new BadRequestException('Chapter number cannot be null');

    try {
      return await this.prisma.chapter.create({
        data: {
          productId: +createChapterDto.productId,
          chapterName: createChapterDto.chapterName.trim(),
          content: createChapterDto.content.trim(),
          chapterNumber: +createChapterDto.chapterNumber,
          price: +createChapterDto.price,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      return await this.prisma.chapter.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    const result = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return result;
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const result = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    if (!updateChapterDto.chapterName)
      throw new BadRequestException('Name cannot be null');
    if (!updateChapterDto.content)
      throw new BadRequestException('Source cannot be null');
    if (!updateChapterDto.chapterNumber)
      throw new BadRequestException('Image cannot be null');

    try {
      return await this.prisma.chapter.update({
        where: { id },
        data: { ...updateChapterDto },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    const result = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return this.prisma.chapter.delete({
      where: { id },
    });
  }
}
