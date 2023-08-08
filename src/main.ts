import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('book-service')
    .setDescription('Book Service API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  
  const PORT = Number(process.env.PORT);
  await app.listen(PORT);
}
bootstrap();
