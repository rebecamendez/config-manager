import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerOptions } from 'utils/logger';

async function bootstrap(): Promise<void> {
  const port = 3000;

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerOptions)
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ConfigManager API')
    .setDescription('Documentation for the ConfigManager API')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port);
  Logger.log(`🚀 ConfigManager API start listening on the port: ${port}`);
}

void bootstrap();
