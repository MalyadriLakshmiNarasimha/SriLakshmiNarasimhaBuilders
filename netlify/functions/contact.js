import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validate(body) {
  const errors = {};
  const clean = {
    name: (body?.name || '').trim(),
    email: (body?.email || '').trim(),
    phone: (body?.phone || '').trim(),
    subject: (body?.subject || '').trim(),
    message: (body?.message || '').trim(),
    projectName: (body?.projectName || '').trim(),
    company: (body?.company || '').trim(), // honeypot
  };

  if (!clean.name || clean.name.length < 2 || clean.name.length > 100) errors.name = 'Invalid name';
  if (!clean.email || !EMAIL_RE.test(clean.email)) errors.email = 'Invalid email';
  if (!clean.phone || !PHONE_RE.test(clean.phone)) errors.phone = 'Invalid phone';
  if (!clean.subject || clean.subject.length < 3 || clean.subject.length > 150) errors.subject = 'Invalid subject';
  if (!clean.message || clean.message.length < 10 || clean.message.length > 5000) errors.message = 'Invalid message';
  if (clean.company) errors.spam = 'spam';

  return { valid: Object.keys(errors).length === 0, errors, clean };
}

// NOTE: Netlify Functions run on ephemeral, stateless containers, so there is
// no local disk to persist a SQLite fallback here (unlike server/index.js,
// which uses better-sqlite3). If you deploy on Netlify and want the same
// "never lose a lead" guarantee as the Express server, point this function
// at a hosted database (e.g. a serverless Postgres/MongoDB) instead of, or
// in addition to, sending email.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid request body' }) };
  }

  const { valid, errors, clean } = validate(body);

  if (!valid) {
    if (errors.spam) {
      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Message received.' }) };
    }
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Please fix the errors below.', errors }) };
  }

  const { name, email, phone, subject, message, projectName } = clean;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            ${projectName ? `<p><strong>Project:</strong> ${escapeHtml(projectName)}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937;">Message:</h3>
            <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the contact form on Sri Lakshmi Narasimha Builders website.</p>
            <p>Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      `,
    };

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Sri Lakshmi Narasimha Builders',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          <p>Dear ${escapeHtml(name)},</p>
          <p>
            Thank you for contacting <strong>Sri Lakshmi Narasimha Builders</strong>.
            We have received your message and our team will get back to you within 24 hours.
          </p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message Details:</h3>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong> ${escapeHtml(message)}</p>
          </div>
          <div style="margin: 30px 0;">
            <h3>Contact Information:</h3>
            <p>Phone: +91 9989625479</p>
            <p>Email: srilakshminarasimhabuilders117@gmail.com</p>
            <p>Working Hours: Mon-Sat: 9:00 AM - 6:00 PM</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Best Regards,<br><strong>Sri Lakshmi Narasimha Builders Team</strong></p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Email sent successfully' }) };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email. Please try again later or contact us by phone.',
        error: error.message,
      }),
    };
  }
};
