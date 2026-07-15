import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = async (opts: CreateExpressContextOptions) => {
  return {
    user: (opts.req as any).user || null,
    req: opts.req,
    res: opts.res,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
