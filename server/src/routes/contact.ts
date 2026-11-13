import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const contactRouter = Router();

/** Validation rules for the contact form */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[\d\s+\-().]{7,25}$/).withMessage('Please provide a valid phone number (digits, spaces, +, - allowed)'),

  body('service')
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

  body('projectDetails')
    .trim()
    .notEmpty().withMessage('Project details are required')
    .isLength({ min: 10, max: 2000 }).withMessage('Project details must be 10–2000 characters'),

  body('budget')
    .trim()
    .notEmpty().withMessage('Please select a budget range')
    .isIn(['under-1k', '1k-3k', '3k-5k', '5k-10k', '10k-plus', 'not-sure'])
    .withMessage('Invalid budget range'),
];

/** POST /api/contact */
contactRouter.post(
  '/',
  contactValidation,
  async (req: Request, res: Response): Promise<void> => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        error: 'Validation failed',
        details: errors.array().map((e) => ({ field: e.type === 'field' ? e.path : 'unknown', message: e.msg })),
      });
      return;
    }

    const { name, email, phone, service, projectDetails, budget } = req.body as {
      name: string;
      email: string;
      phone?: string;
      service: string;
      projectDetails: string;
      budget: string;
    };

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
        const nodemailer = await import('nodemailer');
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
    } catch (err) {
      console.error('[Contact Route Error]', err);
      res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
  },
);
