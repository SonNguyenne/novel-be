import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Story API docs')
    .setDescription('The stories API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('crawler')
    .addTag('user')
    .addTag('product')
    .addTag('category')
    .addTag('chapter')
    .addTag('rate')
    .addTag('list')
    .addTag('comment')
    .addTag('history')
    .addTag('payment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
