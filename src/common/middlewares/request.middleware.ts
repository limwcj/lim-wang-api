import { NextFunction, Request, Response } from 'express';
import short from 'short-uuid';

export function requestMiddleware(req: Request & { requestId: string }, res: Response, next: NextFunction) {
  req.requestId = 'req' + short.generate();
  next();
}
