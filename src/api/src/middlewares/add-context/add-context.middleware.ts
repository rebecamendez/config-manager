import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddContextMiddleware implements NestMiddleware {
  public use(request: Request, response: Response, next: NextFunction): void {
    httpContext.middleware(request, response, () => {
      const id = uuidv4();
      httpContext.ns.bindEmitter(request);
      httpContext.set('X-Context-Id', id);
      response.setHeader('X-Context-Id', id);
      response.setHeader('X-Response-Date', new Date(Date.now()).toUTCString());
      next();
    });
  }
}

export const getContextId = (): string | undefined => {
  const contextId = httpContext.get('X-Context-Id');
  return contextId;
};
