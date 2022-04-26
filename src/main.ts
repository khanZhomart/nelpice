import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT: number = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nelpice API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('help')
    .addTag('subs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
