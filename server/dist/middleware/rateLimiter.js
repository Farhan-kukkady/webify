"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = createRateLimiter;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function createRateLimiter() {
    const windowMs = parseInt(process.env['RATE_LIMIT_WINDOW_MS'] ?? '900000', 10); // 15 min
    const max = parseInt(process.env['RATE_LIMIT_MAX'] ?? '10', 10);
    return (0, express_rate_limit_1.default)({
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
//# sourceMappingURL=rateLimiter.js.map