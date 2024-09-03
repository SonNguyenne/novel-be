import { Prisma } from '@prisma/client'

export class Comment {
  content: string
  User!: {
    connect: {
      id: number
    }
  }
  Product!: {
    connect: {
      id: number
    }
  }
}
