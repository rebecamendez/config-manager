import { INestApplication } from '@nestjs/common';

export const setupNestApp = (app: INestApplication): void => {
  app.enableShutdownHooks();
};
