export interface ProductInterface {
  id: number;
  name: string;
  author: string;
  chapterCount: number;
  image: string;
  status: string;
  description: string;
  chapters: ChapterInterface[];
}

export interface ChapterInterface {
  productId: string;
  chapterName: string;
  content: string;
  chapterNumber: number;
}
