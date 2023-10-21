import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`🎧 ConfigManager API start listening on the port: ${port}`);
}

void bootstrap();
