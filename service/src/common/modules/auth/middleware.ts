import { Response, NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { DecoratedRequest } from 'src/common/interfaces/request';

export function auth() {
  function makeJwtDecoder() {
    return async function (token: string, req: Request) {
      const secret = process.env.JWT_SECRET;
      return jwt.verify(token, secret);
    };
  }

  const extractJwtClaims = makeJwtDecoder();

  return async function (
    req: DecoratedRequest,
    res: Response,
    next: NextFunction,
  ) {
    req.user = undefined;

    if (!req.headers.authorization) {
      return next();
    }

    if (req.method === 'OPTIONS') {
      return next();
    }

    if (!req.headers.authorization.startsWith('Bearer')) {
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next();
    }

    extractJwtClaims(token, req)
      .then((user: any) => {
        req.user = {
          email: user.email as string,
          id: user.id as string,
          role: user.role as string,
        };
        next();
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 401;
        res.setHeader('access-control-allow-origin', '*');
        res.setHeader('content-type', 'application/json');
        res.write(
          JSON.stringify({
            message: 'Unauthorized',
          }),
        );
        res.end();
      });
  };
}
