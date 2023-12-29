import { Prisma } from '@prisma/client';

export class Category implements Prisma.CategoryCreateInput {
  id: number;
  name: string;
  description?: string;
}
