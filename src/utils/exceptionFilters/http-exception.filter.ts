import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomHttpExceptionResponse } from './models/http-exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    const errorMessage = this.getErrorResponse(status, errorResponse, request);
    response.status(status).json(errorMessage);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorResponse: string | object,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorResponse,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });
}
