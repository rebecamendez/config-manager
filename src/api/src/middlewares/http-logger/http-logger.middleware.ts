import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  public use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl } = request;

    Logger.log(`▶️ ${method} ${originalUrl}`, { httpBody: request.body });

    response.on('finish', () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);

      const message = `◀️ ${method} ${originalUrl} ${statusCode} (${responseTime} ms)`;

      if (statusCode < 400) {
        Logger.log(message);
      } else if (statusCode < 500) {
        Logger.warn(message);
      } else {
        Logger.error(message);
      }
    });

    next();
  }
}
