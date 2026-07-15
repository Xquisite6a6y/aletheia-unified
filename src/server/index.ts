import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { createContext } from './context.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '../../dist/client')));

// Health check endpoint (required for Lambda)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'Aletheia Unified', timestamp: new Date().toISOString() });
});

// tRPC API routes
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../dist/client/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Aletheia Unified running on http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/trpc`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
});

export default app;
