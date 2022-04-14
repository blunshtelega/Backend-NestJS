import '@sentry/tracing'; // ВОТ МОЙ ОТВЕТ!!!
import { Request } from 'express';
import { Scope, BadRequestException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { Span, SpanContext } from '@sentry/types';

// Because we inject REQUEST we need to set the service as request scoped

@Injectable({ scope: Scope.REQUEST })
export class SentryService {
  // Return the current span defined in the current Hub and Scope
  get span(): Span {
    const constructor: any = Sentry.getCurrentHub().getScope();
    if (constructor) {
      const constructorSpan = constructor.getSpan();
      return constructorSpan;
    } else {
      throw new BadRequestException('И тут ошибочка');
    }
  }

  // When injecting the service it will create the main transaction

  constructor(@Inject(REQUEST) private request: Request) {
    const { method, headers, url } = this.request;

    // recreate transaction based from HTTP request
    const transaction = Sentry.startTransaction({
      name: `Route: ${method} ${url}`,
      op: 'transaction',
    });

    // setup context of newly created transaction
    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(transaction);

      // customize your context here
      scope.setContext('http', {
        method,
        url,
        headers,
      });
    });
  }

  // This will simply start a new child span in the current span
  startChild(spanContext: SpanContext) {
    return this.span.startChild(spanContext);
  }
}
