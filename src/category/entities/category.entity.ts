import { Prisma } from '@prisma/client';

export class Category implements Prisma.CategoryCreateInput {
  categoryId: number;
  name: string;
  description?: string;
}
