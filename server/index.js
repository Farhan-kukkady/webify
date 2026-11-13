const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/api', '/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', service: 'Webify API', timestamp: new Date().toISOString() });
});

app.post(['/api/contact', '/contact'], async (req, res) => {
  const { name, email, phone, service, projectDetails, budget } = req.body || {};

  if (!name || !email || !projectDetails) {
    return res.status(422).json({ error: 'Please fill in all required fields.' });
  }

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Webify & Co Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New Inquiry from ${name} — ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nBudget: ${budget}\n\nDetails:\n${projectDetails}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table border="1" cellpadding="6" style="border-collapse:collapse;">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone || 'N/A'}</td></tr>
            <tr><td><strong>Service</strong></td><td>${service}</td></tr>
            <tr><td><strong>Budget</strong></td><td>${budget}</td></tr>
          </table>
          <h3>Project Details</h3>
          <p>${String(projectDetails).replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! We received your inquiry and will be in touch within 24 hours.',
    });
  } catch (err) {
    console.error('[Contact Error]', err);
    return res.status(500).json({
      error: err.message || 'Something went wrong. Please try again later.',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
