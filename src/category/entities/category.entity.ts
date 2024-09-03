import { Prisma } from '@prisma/client'

export class Category {
  id: number
  name: string
  description?: string
}
