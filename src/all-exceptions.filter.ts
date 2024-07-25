import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResObj.statusCode = exception.getStatus();
      myResObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResObj.statusCode = 422;
      myResObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      myResObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResObj.response = 'Internal Server Error';
    }

    response.status(myResObj.statusCode).json(myResObj);

    this.logger.error(myResObj.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
