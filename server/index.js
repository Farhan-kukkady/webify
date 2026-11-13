const nodemailer = require('nodemailer');

async function handleContact(data, res) {
  const { name, email, phone, service, projectDetails, budget } = data || {};

  if (!name || !email || !projectDetails) {
    const payload = JSON.stringify({ error: 'Please fill in all required fields.' });
    if (res.status) {
      return res.status(422).json({ error: 'Please fill in all required fields.' });
    } else {
      res.writeHead(422, { 'Content-Type': 'application/json' });
      return res.end(payload);
    }
  }

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER || 'contact@webifyco.com';
    const smtpPass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_EMAIL || smtpUser;

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Webify & Co Website" <${smtpUser}>`,
        to: recipient,
        subject: `New Inquiry from ${name} — ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nBudget: ${budget}\n\nDetails:\n${projectDetails}`,
      });
    }

    const payload = JSON.stringify({
      success: true,
      message: 'Thank you! We received your inquiry and will be in touch within 24 hours.',
    });

    if (res.status) {
      return res.status(200).json(JSON.parse(payload));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(payload);
    }
  } catch (err) {
    console.error('[Contact Error]', err);
    const errPayload = JSON.stringify({
      error: err.message || 'Something went wrong. Please try again later.',
    });
    if (res.status) {
      return res.status(500).json(JSON.parse(errPayload));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(errPayload);
    }
  }
}

let app;

try {
  const express = require('express');
  const cors = require('cors');

  app = express();
  app.set('trust proxy', 1);

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(['/', '/api', '/health', '/api/health'], (req, res) => {
    res.json({ status: 'ok', service: 'Webify API', timestamp: new Date().toISOString() });
  });

  app.post(['/api/contact', '/contact'], async (req, res) => {
    await handleContact(req.body, res);
  });
} catch (e) {
  const http = require('http');
  app = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      return res.end();
    }

    if (req.url.includes('health') || req.url === '/' || req.url === '/api') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'ok', service: 'Webify API' }));
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}');
          await handleContact(parsed, res);
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
}

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Listen error:', err);
  }
}

module.exports = app;
