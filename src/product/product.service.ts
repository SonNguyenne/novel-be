import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto.name)
      throw new BadRequestException('Name cannot be null');
    if (!createProductDto.source)
      throw new BadRequestException('Source cannot be null');
    if (!createProductDto.image)
      throw new BadRequestException('Image cannot be null');
    if (!createProductDto.status)
      throw new BadRequestException('Status cannot be null');
    if (!createProductDto.authorName)
      throw new BadRequestException('Author name cannot be null');

    try {
      return await this.prisma.product.create({
        data: {
          name: createProductDto.name.trim(),
          description: createProductDto.description.trim(),
          source: createProductDto.source.trim(),
          image: createProductDto.image.trim(),
          status: createProductDto.status.trim(),
          price: createProductDto.price,
          authorName: createProductDto.authorName.trim(),
          userId: createProductDto.userId,
          categories: {
            connect: createProductDto.categories.map((category) => ({
              id: category.id,
            })),
          },
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (!updateProductDto.name)
      throw new BadRequestException('Name cannot be null');
    if (!updateProductDto.source)
      throw new BadRequestException('Source cannot be null');
    if (!updateProductDto.image)
      throw new BadRequestException('Image cannot be null');
    if (!updateProductDto.status)
      throw new BadRequestException('Status cannot be null');
    if (!updateProductDto.authorName)
      throw new BadRequestException('Author name cannot be null');

    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
          categories: {
            set: updateProductDto.categories.map((category) => ({
              id: category.id,
            })),
          },
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
