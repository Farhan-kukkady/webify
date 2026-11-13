const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <h3>Project Details:</h3>
          <p>${String(projectDetails).replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! We received your inquiry and will be in touch within 24 hours.',
    });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({
      error: err.message || 'Something went wrong. Please try again.',
    });
  }
};

