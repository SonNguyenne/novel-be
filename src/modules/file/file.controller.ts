import {
  Controller,
  Post,
  Body,
  HttpCode,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Res,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'

@ApiTags('file')
// @ApiBadRequestResponse({ description: 'Invalid input' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary', // Định dạng là binary để Swagger hiển thị chỗ upload file
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Upload file successfully' })
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.fileService.uploadFiles(files)
  }

  @Get('/:bucket/download/:fileName/download')
  async download(
    @Param('bucket') bucket: string,
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ): Promise<void> {
    await this.fileService.downloadFile(bucket, fileName, response)
  }

  @Get('/:bucket/download/:fileName/link')
  async getLink(
    @Param('bucket') bucket: string,
    @Param('fileName') fileName: string,
  ): Promise<{ url: string; publicUrl: string }> {
    return await this.fileService.getPresignedUrl(bucket, fileName)
  }
}
