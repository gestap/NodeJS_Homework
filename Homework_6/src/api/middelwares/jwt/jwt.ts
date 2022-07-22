import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { config } from '../../../config/environment';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.path === '/login') {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send('Unauthorized');
  } else {
    jwt.verify(token, config.jwtSecret, (error: VerifyErrors | null) => {
      if (error) {
        res.status(403).send(error.message);
      } else {
        return next();
      }
    });
  }
}
