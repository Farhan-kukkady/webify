"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config();
}
catch { }
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const contact_1 = require("./routes/contact");
const rateLimiter_1 = require("./middleware/rateLimiter");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const PORT = process.env['PORT'] ?? 3000;
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';
// ── Security middleware ───────────────────────────────────────────────────────
app.use((0, helmet_1.default)());
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))
            return callback(null, true);
        callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
// ── Rate limiter ──────────────────────────────────────────────────────────────
app.use(['/api', '/'], (0, rateLimiter_1.createRateLimiter)());
// ── Routes ────────────────────────────────────────────────────────────────────
app.use(['/api/contact', '/contact'], contact_1.contactRouter);
// ── Health check ──────────────────────────────────────────────────────────────
app.get(['/', '/api', '/health', '/api/health'], (_req, res) => {
    res.json({ status: 'ok', service: 'Webify & Co API', env: NODE_ENV, timestamp: new Date().toISOString() });
});
// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('[Error]', err.message);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`🚀 Webify & Co API running on port ${PORT} [${NODE_ENV}]`);
});
module.exports = app;
//# sourceMappingURL=index.js.map