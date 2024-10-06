import { BadRequestException, Injectable, Query } from '@nestjs/common'
import { CLASSIFICATION } from 'src/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateListDto } from './list.dto'

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async findAll(@Query('userId') userId: number, @Query('classification') classification: CLASSIFICATION) {
    try {
      if (classification !== CLASSIFICATION.FAVORITE && classification !== CLASSIFICATION.READING) {
        throw new BadRequestException('Invalid classification provided')
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
            classification === CLASSIFICATION.READING
              ? { select: { id: true, productId: true, chapterName: true } }
              : false,
          products: classification === CLASSIFICATION.FAVORITE ? true : false,
        },
      })
    } catch (err) {
      throw err
    }
  }

  async update(updateListDto: UpdateListDto) {
    const { userId, classification, chapters, products } = updateListDto

    const productDetail = await this.prisma.product.findFirst({
      where: { id: products[0].id },
    })

    const existingList = await this.prisma.list.findFirst({
      where: { userId, classification },
      include: {
        chapters: true,
        products: true,
      },
    })

    try {
      if (!existingList) {
        return await this.prisma.list.create({
          data: {
            userId,
            classification,
            chapters:
              classification === CLASSIFICATION.READING
                ? {
                    connect: chapters.map(chapter => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              classification === CLASSIFICATION.FAVORITE
                ? {
                    connect: products.map(product => ({
                      id: product.id,
                    })),
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters: classification === CLASSIFICATION.READING ? true : false,
            products: classification === CLASSIFICATION.FAVORITE ? true : false,
          },
        })
      } else {
        const existedItem = existingList.products.map(v => v.id).includes(products[0].id)
        return await this.prisma.list.update({
          where: {
            id: existingList.id,
            userId,
            classification: classification,
          },
          data: {
            chapters:
              classification === CLASSIFICATION.READING
                ? {
                    set: chapters.map(chapter => ({
                      id: chapter.id,
                    })),
                  }
                : undefined,
            products:
              classification === CLASSIFICATION.FAVORITE
                ? {
                    set: existedItem
                      ? [...existingList.products.filter(v => v.id !== products[0].id)]
                      : [...existingList.products, productDetail],
                  }
                : undefined,
          },
          select: {
            id: true,
            classification: true,
            userId: true,
            chapters: classification === CLASSIFICATION.READING ? true : false,
            products: classification === CLASSIFICATION.FAVORITE ? true : false,
          },
        })
      }
    } catch (err) {
      throw err
    }
  }
}
