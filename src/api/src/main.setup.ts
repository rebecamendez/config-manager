import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ErrorExceptionFilter } from 'filters/error-exception.filter';

export const setupNestApp = (app: INestApplication): void => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.enableShutdownHooks();
};
