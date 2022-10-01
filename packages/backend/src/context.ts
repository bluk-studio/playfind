import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { router } from '@trpc/server';
import { Client } from './client';

export const createContext = (expressContext: CreateExpressContextOptions) => {
  return {
    // Express-related context
    req: expressContext.req,
    res: expressContext.res,

    // Application-related context
    database: Client
  }
};
export type Context = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return router<Context>();
};