import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { calculateAverageRate } from 'src/common/utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto, UpdateProductDto } from './product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto.name) throw new BadRequestException('Name cannot be null')
    if (!createProductDto.source) throw new BadRequestException('Source cannot be null')
    if (!createProductDto.image) throw new BadRequestException('Image cannot be null')
    if (!createProductDto.status) throw new BadRequestException('Status cannot be null')
    if (!createProductDto.authorName) throw new BadRequestException('Author name cannot be null')

    const userExists = await this.prisma.user.findUnique({
      where: { id: createProductDto.userId },
    })

    if (!userExists) throw new BadRequestException('User not found')

    const categoriesExist = await Promise.all(
      createProductDto.categories.map(async category => {
        const categoryExists = await this.prisma.category.findUnique({
          where: { id: category.id },
        })
        return !!categoryExists
      }),
    )

    if (categoriesExist.includes(false)) throw new BadRequestException('Categories not found')

    try {
      return await this.prisma.product.create({
        data: {
          name: createProductDto.name.trim(),
          description: createProductDto.description.trim(),
          source: createProductDto.source.trim(),
          image: createProductDto.image.trim(),
          status: createProductDto.status.trim(),
          authorName: createProductDto.authorName.trim(),
          userId: createProductDto.userId,
          categories: {
            connect: createProductDto.categories.map(category => ({
              id: category.id,
            })),
          },
        },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany()
      const productDetails = await Promise.all(
        products.map(async product => {
          const rates = await this.prisma.rate.findMany({
            where: { productId: product.id },
          })

          const averageRate = calculateAverageRate(rates)

          const chapters = await this.prisma.chapter.findMany({
            where: { productId: product.id },
          })

          return {
            ...product,
            averageRate: Math.round(averageRate),
            chapterCount: chapters.length,
          }
        }),
      )

      return productDetails
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    const rates = await this.prisma.rate.findMany({ where: { productId: id } })
    const averageRate = calculateAverageRate(rates)

    const chapters = await this.prisma.chapter.findMany({
      where: { productId: id },
    })

    return {
      ...product,
      averageRate: Math.round(averageRate),
      chapterCount: chapters.length,
    }
  }

  async findOneChapter(id: number, chapterNumber: number) {
    try {
      const chapter = await this.prisma.chapter.findFirst({
        where: {
          productId: id,
          chapterNumber,
        },
      })

      if (!chapter) {
        throw new NotFoundException(`Chapter with number ${chapterNumber} not found in product with ID ${id}`)
      }

      return chapter
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.prisma.product.findUnique({ where: { id } })

    if (!result) throw new NotFoundException(`Product with ID ${id} not found`)

    return await this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        categories: updateProductDto.categories
          ? { set: updateProductDto.categories.map(category => ({ id: category.id })) }
          : undefined,
      },
    })
  }

  async remove(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return this.prisma.product.delete({
      where: { id },
    })
  }

  async incrementViewCount(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } })
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`)

    const userId = 1 // TODO
    const now = new Date()
    const view = await this.prisma.view.findFirst({ where: { productId: id, userId } })

    if (!view) {
      await this.prisma.product.update({
        where: { id },
        data: { viewCount: product.viewCount + 1 },
      })

      return await this.prisma.view.create({
        data: { userId, productId: id },
      })
    } else {
      const viewedTime = new Date(view.viewedAt)

      // 30 mins
      if (now.getTime() - viewedTime.getTime() > 3 * 60 * 1000) {
        await this.prisma.product.update({
          where: { id },
          data: { viewCount: product.viewCount + 1 },
        })

        return await this.prisma.view.update({
          where: { id: view.id },
          data: { viewedAt: now },
        })
      }
    }

    throw new HttpException(`NOT_MODIFIED`, HttpStatus.NOT_MODIFIED)
  }
}
