import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class LoggerMiddleware {
  constructor() {
    this.logger = new Logger('logger.middleware');
  }

  injectLogging(request, response) {
    const { method, originalUrl: url, body } = request;

    if (url === '/' || url === '/favicon.ico') {
      return;
    }

    const requestStart = Date.now();
    const requestId = uuidv4();

    request.reqId = requestId;
    this.logger.verbose({
      message: `${requestId} Request to ${method} ${url}`,
      data: body,
    });

    response.setHeader('X-Request-Id', requestId);
    response.on('finish', () => {
      const { statusCode } = response;
      const processingTime = Date.now() - requestStart;
      const logLevel = statusCode === 404 ? 'verbose' : 'log';
      this.logger[logLevel](`${requestId} ${statusCode} response to ${method} ${url} in ${processingTime}ms`);
    });
  }

  use(request, response, next) {
    this.injectLogging(request, response, next);
    next();
  }
}
