import {
  Catch, HttpException, HttpStatus, Logger,
} from '@nestjs/common';

@Catch()
export default class ExceptionFilter {
  constructor() {
    this.logger = new Logger('exception.filter');
  }

  catch(exception, host) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let statusCode;
    let { message } = exception;
    let extraFields = {};

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      // exceptionResponse can be an object or string
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        ({ message, ...extraFields } = exceptionResponse);
      } else {
        message = exceptionResponse;
      }
    }

    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    if (statusCode >= 500) {
      this.logger.error(`${req.reqId} Uncaught exception: ${message}\n${exception.stack}`);
      message = 'Internal server error';
    } else if (statusCode === 400 || statusCode > 404) {
      this.logger.log(`${req.reqId} Client ${statusCode}: ${message}`);
    }

    res.status(statusCode).json({
      statusCode,
      message,
      ...extraFields,
    });
  }
}
