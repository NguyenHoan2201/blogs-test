import * as express from 'express';
import { FastifyRequest } from 'fastify';

export interface User {
  email: string;
  id: string;
  role: string;
}

export interface DecoratedRequest extends express.Request {
  user?: User;
}

export interface DecoratedFastifyRequest extends FastifyRequest {
  raw: {
    user?: User;
  } & FastifyRequest['raw'];
}
