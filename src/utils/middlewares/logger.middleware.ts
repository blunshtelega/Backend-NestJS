import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Redirect logic has been implemented here. Delete if not needed
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction): void {
    console.log('Request...');
    next();
  }
}
