import { Prisma } from '@prisma/client'

export class Product {
  id?: number
  name: string
  description?: string | null
  source: string
  image: string
  status?: string
  price?: number | 0
  authorName: string
  viewCount?: number | 0
  User!: {
    connect: {
      id: number
    }
  }
}
