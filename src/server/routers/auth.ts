import { publicProcedure, protectedProcedure, router } from '../trpc.js';
import { z } from 'zod';

export const authRouter = router({
  // Get current user
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user || null;
  }),

  // Login
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      // Simulate login
      return {
        success: true,
        user: {
          id: 1,
          email: input.email,
          name: 'User',
        },
        token: 'mock-token',
      };
    }),

  // Logout
  logout: protectedProcedure.mutation(({ ctx }) => {
    return { success: true };
  }),
});
