import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  public catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Custom Errors
    if (exception instanceof EntityNotFoundError) {
      response.status(404).json(exception.message);
      return;
    }

    // Nest.js HTTP errors
    if (exception instanceof HttpException) {
      Logger.warn(`Http error: ${JSON.stringify(exception.getResponse())}`);
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    Logger.error(`Unknown error: ${exception.message}`, exception.stack);
    response.status(500).json(`Unknown error: ${exception.message}`);
  }
}
