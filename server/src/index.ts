import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { contactRouter } from './routes/contact';
import { createRateLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env['PORT'] ?? 3000;
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet());

const envOrigins = (process.env['ALLOWED_ORIGINS'] ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:4200',
  'https://webifyco.com',
  'https://www.webifyco.com',
];

const allowedOrigins = [...defaultOrigins, ...envOrigins];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Rate limiter ──────────────────────────────────────────────────────────────
app.use(['/api', '/'], createRateLimiter());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use(['/api/contact', '/contact'], contactRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get(['/health', '/api/health'], (_req, res) => {
  res.json({ status: 'ok', env: NODE_ENV, timestamp: new Date().toISOString() });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

if (!process.env['VERCEL']) {
  app.listen(PORT, () => {
    console.log(`🚀 Webify & Co API running on http://localhost:${PORT} [${NODE_ENV}]`);
  });
}

export = app;
