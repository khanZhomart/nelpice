import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

const PORT: number = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
