import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateListDto } from './dto/update-list.dto';
import { Classification } from '../enums/classification.enum';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  // TODO: Add filter by userIDs
  async findAll(@Query('classification') classification: string) {
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
        },
        select: {
          id: true,
          classification: true,
          userId: true,
          chapters: classification === Classification.READING ? true : false,
          products: classification === Classification.FAVORITE ? true : false,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async update(updateListDto: UpdateListDto) {
    // TODO: Change user Id to real one
    const userId = 2;

    const existingList = await this.prisma.list.findFirst({
      where: { userId, classification: updateListDto.classification },
    });

    try {
      if (!existingList) {
        return await this.prisma.list.create({
          data: {
            userId,
            classification: updateListDto.classification,
            chapters:
              updateListDto.classification === Classification.READING
                ? {
                    connect: updateListDto.chapters.map((chapter) => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              updateListDto.classification === Classification.FAVORITE
                ? {
                    connect: updateListDto.products.map((product) => ({
                      id: product.id,
                    })),
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters:
              updateListDto.classification === Classification.READING
                ? true
                : false,
            products:
              updateListDto.classification === Classification.FAVORITE
                ? true
                : false,
          },
        });
      } else {
        return await this.prisma.list.update({
          where: {
            id: existingList.id,
            userId,
            classification: updateListDto.classification,
          },
          data: {
            chapters:
              updateListDto.classification === Classification.READING
                ? {
                    set: updateListDto.chapters.map((chapter) => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              updateListDto.classification === Classification.FAVORITE
                ? {
                    set: updateListDto.products.map((product) => ({
                      id: product.id,
                    })),
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters:
              updateListDto.classification === Classification.READING
                ? true
                : false,
            products:
              updateListDto.classification === Classification.FAVORITE
                ? true
                : false,
          },
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
