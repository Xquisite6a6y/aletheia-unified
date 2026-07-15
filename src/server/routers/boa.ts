import { publicProcedure, protectedProcedure, router } from '../trpc.js';
import { z } from 'zod';

export const boaRouter = router({
  // Daemon heartbeat endpoint
  heartbeat: publicProcedure
    .input(
      z.object({
        daemonId: z.string(),
        deviceToken: z.string(),
        timestamp: z.string().datetime(),
        resourceData: z.object({
          cpuUsage: z.number().int().min(0).max(100),
          memoryUsage: z.number().int().min(0).max(100),
          uptime: z.number().int(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      // Store heartbeat in database
      console.log(`[BOA] Heartbeat from daemon ${input.daemonId}:`, input.resourceData);
      
      return {
        success: true,
        message: 'Heartbeat recorded',
        timestamp: new Date().toISOString(),
      };
    }),

  // Cast frame (event logging)
  castFrame: publicProcedure
    .input(
      z.object({
        deviceToken: z.string(),
        title: z.string(),
        message: z.string(),
        frameType: z.enum(['info', 'success', 'warning', 'error']),
      })
    )
    .mutation(async ({ input }) => {
      console.log(`[BOA] Cast frame: ${input.title}`, input.message);
      
      return {
        success: true,
        message: 'Cast frame recorded',
      };
    }),

  // Get daemon status
  getStatus: protectedProcedure
    .query(async ({ ctx }) => {
      return {
        status: 'online',
        lastHeartbeat: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }),
});
