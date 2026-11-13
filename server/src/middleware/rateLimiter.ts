import rateLimit from 'express-rate-limit';

export function createRateLimiter() {
  const windowMs = parseInt(process.env['RATE_LIMIT_WINDOW_MS'] ?? '900000', 10); // 15 min
  const max = parseInt(process.env['RATE_LIMIT_MAX'] ?? '10', 10);

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false },
    message: {
      error: 'Too many requests from this IP. Please try again later.',
    },
    handler: (_req, res, _next, options) => {
      res.status(429).json(options.message);
    },
  });
}
