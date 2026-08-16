// Server-side validation mirroring the client-side rules in src/pages/Contact.jsx
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts +91 98765 43210, 9876543210, +1 415-555-0132, etc. Requires 7-15 digits.
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function validateContactPayload(body) {
  const errors = {};
  const clean = {
    name: typeof body?.name === 'string' ? body.name.trim() : '',
    email: typeof body?.email === 'string' ? body.email.trim() : '',
    phone: typeof body?.phone === 'string' ? body.phone.trim() : '',
    subject: typeof body?.subject === 'string' ? body.subject.trim() : '',
    message: typeof body?.message === 'string' ? body.message.trim() : '',
    projectName: typeof body?.projectName === 'string' ? body.projectName.trim() : '',
    // honeypot field — real users never fill this in
    company: typeof body?.company === 'string' ? body.company.trim() : '',
  };

  if (!clean.name || clean.name.length < 2 || clean.name.length > 100) {
    errors.name = 'Please enter your full name (2-100 characters).';
  }
  if (!clean.email || !EMAIL_RE.test(clean.email) || clean.email.length > 254) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!clean.phone || !PHONE_RE.test(clean.phone) || clean.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!clean.subject || clean.subject.length < 3 || clean.subject.length > 150) {
    errors.subject = 'Subject must be between 3 and 150 characters.';
  }
  if (!clean.message || clean.message.length < 10 || clean.message.length > 5000) {
    errors.message = 'Message must be between 10 and 5000 characters.';
  }
  if (clean.company) {
    // honeypot tripped — treat as spam, but don't tell the bot why
    errors.spam = 'Submission rejected.';
  }

  return { valid: Object.keys(errors).length === 0, errors, clean };
}

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
