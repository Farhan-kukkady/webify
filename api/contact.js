const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', service: 'Webify Contact API' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body safely (supports JSON object, JSON string, or streamed body)
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // ignore
    }
  }

  if (!body && typeof req.on === 'function') {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      if (raw) {
        body = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[Contact] Could not read raw stream body:', e.message);
    }
  }

  const { name, email, phone, service, projectDetails, budget } = body || {};

  if (!name || !email || !projectDetails) {
    return res.status(422).json({
      error: 'Please fill in all required fields (Name, Email, Project Details).',
    });
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
        replyTo: email,
        subject: `New Inquiry from ${name} — ${service || 'General Inquiry'}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nProject Details:\n${projectDetails}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #6366f1; margin-top: 0;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight: bold;">Phone</td><td style="padding: 8px 0;">${phone || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight: bold;">Service</td><td style="padding: 8px 0;">${service || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight: bold;">Budget</td><td style="padding: 8px 0;">${budget || 'N/A'}</td></tr>
            </table>
            <h3 style="color: #0f172a; margin-bottom: 8px;">Project Details</h3>
            <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5;">${String(projectDetails)}</div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Sent from Webify & Co Website (webifyco.com)</p>
          </div>
        `,
      });
      console.log(`[Contact] Email successfully dispatched to ${recipient}`);
    } else {
      console.warn('[Contact] SMTP_PASS not set. Email logged but not dispatched via SMTP.');
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
};
