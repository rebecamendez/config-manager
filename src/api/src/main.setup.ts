import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupNestApp = (app: INestApplication): void => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
};
