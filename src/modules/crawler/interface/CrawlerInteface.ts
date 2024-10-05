export interface ProductInterface {
  id?: number
  name?: string
  author?: string
  chapterCount?: number
  category?: string
  image?: string
  status?: string
  source?: string
  description?: string
  chapters?: ChapterInterface[]
}

export interface ChapterInterface {
  productId?: number
  chapterName?: string
  content?: string
  chapterNumber?: number
}
