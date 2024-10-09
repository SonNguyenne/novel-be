import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { Response } from 'express'
import * as Minio from 'minio'

const bucket = 'readordead'

@Injectable()
export class FileService {
  private minioClient: Minio.Client

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: Number(process.env.MINIO_PORT) || 9001,
      useSSL: process.env.MINIO_USE_SSL === 'true' ? true : false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      region: 'us-east-1', // Set the region to us-east-1 or your specific region
    })
  }

  async uploadFiles(files: any[]): Promise<string[]> {
    const fileUrls: string[] = []

    try {
      // Check if the bucket exists, if not, create it
      const bucketExists = await this.minioClient.bucketExists(bucket)
      if (!bucketExists) {
        await this.minioClient.makeBucket(bucket)
        console.log('Bucket created successfully in "us-east-1".')
      }

      for (const file of files) {
        const metaData = {
          'Content-Type': file.mimetype,
        }
        console.log('file.originalname', file.originalname, typeof file.originalname)
        const nameFile = file.originalname.toLowerCase().replaceAll(' ', '-')

        await this.minioClient.putObject(bucket, nameFile, file.buffer, file.size, metaData)

        console.log(`File ${nameFile} uploaded successfully.`)
        fileUrls.push(`http://localhost:3001/${bucket}/download/${nameFile}`)
      }

      return fileUrls
    } catch (error) {
      console.error('Error during file upload:', error)
      throw new BadRequestException('Error during file upload')
    }
  }

  async downloadFile(bucket: string, fileName: string, response: Response): Promise<void> {
    try {
      const stat = await this.minioClient.statObject(bucket, fileName)
      const { size, metaData } = stat

      // Set response headers for file download
      response.writeHead(200, {
        ...metaData,
        'Content-Type': 'application/octet-stream',
        'Accept-Ranges': 'bytes',
        'Content-Length': size,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Meta': JSON.stringify(metaData),
      })

      // Stream the object from Minio
      const dataStream = await this.minioClient.getObject(bucket, fileName)
      dataStream.pipe(response)

      // Handle any errors that may occur during streaming
      dataStream.on('error', err => {
        console.error('Error streaming the file:', err)
        response.status(500).send('Internal Server Error')
      })
    } catch (err) {
      // Handle file not found or other errors
      if (err.code === 'NoSuchKey') {
        throw new NotFoundException('File not found')
      } else {
        console.error('Error retrieving the file:', err)
        response.status(500).send('Internal Server Error')
      }
    }
  }

  async getPresignedUrl(bucket: string, fileName: string): Promise<{ url: string; publicUrl: string }> {
    try {
      //expired in seconds
      // const expiryTime = 60
      const url = await this.minioClient.presignedUrl('GET', bucket, fileName)
      console.log('Presigned URL[[[[[[[[[[>]]]]]]]]]]:', this.minioClient)
      const protocol = this.minioClient['protocol'] || 'http:'
      const host = this.minioClient['host']
      const port = this.minioClient['port']
      const publicUrl = protocol + '//' + host + ':' + port + '/' + bucket + '/' + fileName
      return { url, publicUrl }
    } catch (err) {
      console.error('Error generating presigned URL:', err)
      throw new BadRequestException('Error generating presigned URL')
    }
  }
}
