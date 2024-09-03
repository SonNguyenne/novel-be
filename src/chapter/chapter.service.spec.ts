import { PrismaService } from 'src/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { ChapterService } from './chapter.service'

describe('ChapterService', () => {
  let service: ChapterService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapterService, PrismaService],
    }).compile()

    service = module.get<ChapterService>(ChapterService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
