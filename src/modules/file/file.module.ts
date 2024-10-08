import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [PrismaModule],
  exports: [FileService],
})
export class FileModule {}
