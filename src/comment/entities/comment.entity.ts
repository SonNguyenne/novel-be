import { Prisma } from '@prisma/client';

export class Comment implements Prisma.CommentCreateInput {
  content: string;
  User!: {
    connect: {
      id: number;
    };
  };
  Product!: {
    connect: {
      id: number;
    };
  };
}
