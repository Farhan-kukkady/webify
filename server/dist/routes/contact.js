"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
exports.contactRouter = (0, express_1.Router)();
/** Validation rules for the contact form */
const contactValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    (0, express_validator_1.body)('phone')
        .optional({ checkFalsy: true })
        .trim()
        .matches(/^[\d\s+\-().]{7,25}$/).withMessage('Please provide a valid phone number (digits, spaces, +, - allowed)'),
    (0, express_validator_1.body)('service')
        .trim()
        .notEmpty().withMessage('Please select a service')
        .isIn([
        'website-design',
        'signature-site',
        'keepsake-website',
        'couple-website',
        'document-attestation',
        'ecommerce',
        'landing-page',
        'redesign',
        'maintenance',
        'social-media',
        'branding',
        'seo',
        'other',
    ]).withMessage('Invalid service selected'),
    (0, express_validator_1.body)('projectDetails')
        .trim()
        .notEmpty().withMessage('Project details are required')
        .isLength({ min: 10, max: 2000 }).withMessage('Project details must be 10–2000 characters'),
    (0, express_validator_1.body)('budget')
        .trim()
        .notEmpty().withMessage('Please select a budget range')
        .isIn(['under-1k', '1k-3k', '3k-5k', '5k-10k', '10k-plus', 'not-sure'])
        .withMessage('Invalid budget range'),
];
/** POST /api/contact */
exports.contactRouter.post('/', contactValidation, async (req, res) => {
    // Validate input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: 'Validation failed',
            details: errors.array().map((e) => ({ field: e.type === 'field' ? e.path : 'unknown', message: e.msg })),
        });
        return;
    }
    const { name, email, phone, service, projectDetails, budget } = req.body;
    try {
        // Log the submission (replace with email sending / DB insert as needed)
        console.log('[Contact Form Submission]', {
            name,
            email,
            phone: phone ?? 'N/A',
            service,
            budget,
            projectDetails: projectDetails.substring(0, 50) + '…',
            receivedAt: new Date().toISOString(),
        });
        // Optionally send an email via nodemailer (only if SMTP is configured)
        if (process.env['SMTP_HOST'] && process.env['SMTP_USER'] && process.env['SMTP_PASS']) {
            const nodemailer = await Promise.resolve().then(() => __importStar(require('nodemailer')));
            const port = parseInt(process.env['SMTP_PORT'] ?? '465', 10);
            const transporter = nodemailer.createTransport({
                host: process.env['SMTP_HOST'],
                port: port,
                secure: port === 465,
                auth: { user: process.env['SMTP_USER'], pass: process.env['SMTP_PASS'] },
            });
            await transporter.sendMail({
                from: `"Webify & Co Website" <${process.env['SMTP_USER']}>`,
                to: process.env['CONTACT_EMAIL'] ?? process.env['SMTP_USER'],
                subject: `New Inquiry from ${name} — ${service}`,
                text: [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone ?? 'N/A'}`,
                    `Service: ${service}`,
                    `Budget: ${budget}`,
                    `\nProject Details:\n${projectDetails}`,
                ].join('\n'),
                html: `
            <h2>New Contact Form Submission</h2>
            <table>
              <tr><td><strong>Name</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email</strong></td><td>${email}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${phone ?? 'N/A'}</td></tr>
              <tr><td><strong>Service</strong></td><td>${service}</td></tr>
              <tr><td><strong>Budget</strong></td><td>${budget}</td></tr>
            </table>
            <h3>Project Details</h3>
            <p>${projectDetails.replace(/\n/g, '<br>')}</p>
          `,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Thank you! We received your inquiry and will be in touch within 24 hours.',
        });
    }
    catch (err) {
        console.error('[Contact Route Error]', err);
        res.status(500).json({
            error: err?.message || 'Something went wrong. Please try again later.',
            details: err?.code || 'EMAIL_FAILED',
        });
    }
});
//# sourceMappingURL=contact.js.map