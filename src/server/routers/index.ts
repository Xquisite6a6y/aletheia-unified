import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { z } from 'zod';
import { boaRouter } from './boa.js';
import { aletheiaRouter } from './aletheia.js';
import { authRouter } from './auth.js';

export const appRouter = router({
  // Health check
  health: publicProcedure.query(() => ({
    ok: true,
    service: 'Aletheia Unified',
    timestamp: new Date().toISOString(),
  })),

  // Boa daemon system
  boa: boaRouter,

  // Aletheia agentic system
  aletheia: aletheiaRouter,

  // Authentication
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
