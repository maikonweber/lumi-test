import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true, // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    },
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Test This')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3002);
}

bootstrap();
