import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { validateContactPayload, escapeHtml } from './validate.js';
import { insertSubmission, getAllSubmissions, updateSubmissionStatus, deleteSubmission } from './db.js';
import { issueAdminToken, verifyAdminCredentials, requireJwtAdmin } from './auth.js';
import { getPosts, createPost, updatePost, deletePost } from './posts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFile = path.join(__dirname, 'data', 'projects.json');

function readProjectsData() {
  return JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
}

function writeProjectsData(data) {
  fs.writeFileSync(projectsFile, JSON.stringify(data, null, 2) + '\n', 'utf8');
}


app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Basic abuse protection on the public contact endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

// JWT-based admin authentication
// --- Contact form endpoint -------------------------------------------------
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { valid, errors, clean } = validateContactPayload(req.body);

  if (!valid) {
    // Don't leak the honeypot field name back to the client
    const { spam, ...fieldErrors } = errors;
    if (spam) {
      // Pretend success to spammers so they don't learn the honeypot exists
      return res.status(200).json({ success: true, message: 'Message received.' });
    }
    return res.status(400).json({ success: false, message: 'Please fix the errors below.', errors: fieldErrors });
  }

  const { name, email, phone, subject, message, projectName } = clean;
  let emailSent = false;
  let emailError = null;

  try {
    const transporter = createTransporter();

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
    emailSent = true;
  } catch (err) {
    console.error('Error sending email:', err);
    emailError = err.message;
  }

  // Always persist the lead, even if email delivery failed — this is the
  // fallback so no enquiry is ever silently lost.
  let leadId = null;
  try {
    leadId = insertSubmission({ name, email, phone, subject, message, projectName, emailSent });
  } catch (dbErr) {
    console.error('Error saving lead to database:', dbErr);
  }

  if (emailSent) {
    return res.status(200).json({ success: true, message: 'Message sent successfully.', leadId });
  }

  if (leadId !== null) {
    // Email failed but we still captured the lead — tell the user it went
    // through so they aren't stuck retrying, but flag it for ops.
    return res.status(200).json({
      success: true,
      message: 'Your message was received. Our team will get back to you shortly.',
      leadId,
      emailDelivery: 'failed',
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Failed to submit your message. Please try again later or contact us by phone.',
    error: emailError,
  });
});

// --- Newsletter ------------------------------------------------------------
const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

app.post('/api/newsletter/subscribe', newsletterLimiter, async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' })
  }
  if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID || !process.env.BREVO_SENDER_EMAIL) {
    return res.status(503).json({ success: false, message: 'Newsletter service is not configured yet.' })
  }
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    })
    if (!response.ok && response.status !== 201) {
      const detail = await response.text()
      console.error('Brevo newsletter error:', detail)
      return res.status(502).json({ success: false, message: 'Unable to subscribe right now. Please try again later.' })
    }
    return res.status(200).json({ success: true, message: 'You are subscribed to our updates.' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(502).json({ success: false, message: 'Unable to subscribe right now. Please try again later.' })
  }
})


app.post('/api/admin/login', contactLimiter, (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '')
  if (!verifyAdminCredentials(username, password)) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' })
  }
  return res.json({ success: true, token: issueAdminToken(username), expiresIn: 8 * 60 * 60 })
})

app.get('/api/admin/me', requireJwtAdmin, (req, res) => {
  res.json({ success: true, admin: { username: req.admin.sub, role: req.admin.role, expiresAt: req.admin.exp } })
})

// --- Public/admin project management ------------------------------------
app.get('/api/projects', (req, res) => {
  try { res.json({ success: true, ...readProjectsData() }); }
  catch (err) { console.error('Error reading projects:', err); res.status(500).json({ success:false, message:'Failed to load projects.' }); }
});

app.post('/api/admin/projects', requireJwtAdmin, (req, res) => {
  try {
    const data = readProjectsData();
    const project = { ...req.body, id: Date.now() };
    if (!project.name || !project.description || !project.location || !project.image) return res.status(400).json({success:false,message:'Name, description, location and image are required.'});
    data.projects.push(project); writeProjectsData(data); res.status(201).json({success:true, project});
  } catch (err) { console.error('Error creating project:', err); res.status(500).json({success:false,message:'Failed to create project.'}); }
});

app.put('/api/admin/projects/:id', requireJwtAdmin, (req, res) => {
  try {
    const data = readProjectsData(); const id = Number(req.params.id);
    const index = data.projects.findIndex(p => Number(p.id) === id);
    if (index === -1) return res.status(404).json({success:false,message:'Project not found.'});
    const updated = { ...data.projects[index], ...req.body, id: data.projects[index].id };
    data.projects[index] = updated; writeProjectsData(data); res.json({success:true,project:updated});
  } catch (err) { console.error('Error updating project:', err); res.status(500).json({success:false,message:'Failed to update project.'}); }
});

app.delete('/api/admin/projects/:id', requireJwtAdmin, (req, res) => {
  try {
    const data = readProjectsData(); const id = Number(req.params.id); const before = data.projects.length;
    data.projects = data.projects.filter(p => Number(p.id) !== id);
    if (data.projects.length === before) return res.status(404).json({success:false,message:'Project not found.'});
    writeProjectsData(data); res.json({success:true});
  } catch (err) { console.error('Error deleting project:', err); res.status(500).json({success:false,message:'Failed to delete project.'}); }
});

// --- Admin endpoints (leads captured via the DB fallback) -----------------
app.get('/api/submissions', requireJwtAdmin, (req, res) => {
  try {
    const submissions = getAllSubmissions();
    res.json({ success: true, submissions });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ success: false, message: 'Failed to load submissions.' });
  }
});

app.put('/api/submissions/:id/status', requireJwtAdmin, (req, res) => {
  try {
    const status = String(req.body?.status || '').toLowerCase();
    if (!['pending', 'completed'].includes(status)) return res.status(400).json({ success: false, message: 'Status must be pending or completed.' });
    const result = updateSubmissionStatus(req.params.id, status);
    if (!result.changes) return res.status(404).json({ success: false, message: 'Submission not found.' });
    res.json({ success: true, status });
  } catch (err) {
    console.error('Error updating submission status:', err);
    res.status(500).json({ success: false, message: 'Failed to update submission status.' });
  }
});

app.delete('/api/submissions/:id', requireJwtAdmin, (req, res) => {
  try {
    deleteSubmission(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting submission:', err);
    res.status(500).json({ success: false, message: 'Failed to delete submission.' });
  }
});

// --- Blog posts -----------------------------------------------------------
app.get('/api/posts', (req, res) => {
  try {
    res.json({ success: true, posts: getPosts() });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Failed to load posts.' });
  }
});

app.post('/api/posts', requireJwtAdmin, (req, res) => {
  try {
    const { title, excerpt, image, date, author, authorBio, category, readTime, content } = req.body || {};
    if (!title || !excerpt || !image || !author || !category || !content) {
      return res.status(400).json({ success: false, message: 'Title, excerpt, image, author, category and content are required.' });
    }
    const post = createPost({ title, excerpt, image, date, author, authorBio, category, readTime, content });
    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ success: false, message: 'Failed to create post.' });
  }
});

app.put('/api/posts/:id', requireJwtAdmin, (req, res) => {
  try {
    const post = updatePost(req.params.id, req.body || {});
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, post });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ success: false, message: 'Failed to update post.' });
  }
});

app.delete('/api/posts/:id', requireJwtAdmin, (req, res) => {
  try {
    if (!deletePost(req.params.id)) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ success: false, message: 'Failed to delete post.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
