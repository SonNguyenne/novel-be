import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateListDto } from './dto/update-list.dto';
import { Classification } from '../enums/classification.enum';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    @Query('userId') userId: number,
    @Query('classification') classification: string,
  ) {
    try {
      classification = classification.toUpperCase();

      if (
        classification !== Classification.FAVORITE &&
        classification !== Classification.READING
      ) {
        throw new BadRequestException('Invalid classification provided');
      }

      return await this.prisma.list.findMany({
        where: {
          classification,
          userId: Number(userId),
        },
        select: {
          id: true,
          classification: true,
          userId: true,
          chapters:
            classification === Classification.READING
              ? { select: { id: true, productId: true, chapterName: true } }
              : false,
          products: classification === Classification.FAVORITE ? true : false,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async update(updateListDto: UpdateListDto) {
    const { userId, classification, chapters, products } = updateListDto;

    const existingList = await this.prisma.list.findFirst({
      where: { userId, classification },
    });

    try {
      if (!existingList) {
        return await this.prisma.list.create({
          data: {
            userId,
            classification,
            chapters:
              classification === Classification.READING
                ? {
                    connect: chapters.map((chapter) => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              classification === Classification.FAVORITE
                ? {
                    connect: products.map((product) => ({
                      id: product.id,
                    })),
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters: classification === Classification.READING ? true : false,
            products: classification === Classification.FAVORITE ? true : false,
          },
        });
      } else {
        return await this.prisma.list.update({
          where: {
            id: existingList.id,
            userId,
            classification: classification,
          },
          data: {
            chapters:
              classification === Classification.READING
                ? {
                    set: chapters.map((chapter) => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              classification === Classification.FAVORITE
                ? {
                    set: products.map((product) => ({
                      id: product.id,
                    })),
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters: classification === Classification.READING ? true : false,
            products: classification === Classification.FAVORITE ? true : false,
          },
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
