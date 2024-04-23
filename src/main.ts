import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Story API docs')
    .setDescription('The stories API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('category')
    .addTag('chapter')
    .addTag('comment')
    .addTag('crawler')
    .addTag('history')
    .addTag('list')
    .addTag('product')
    .addTag('rate')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
