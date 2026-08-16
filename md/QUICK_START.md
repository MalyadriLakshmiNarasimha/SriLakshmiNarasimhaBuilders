# 🚀 Quick Start - Contact Form Setup

## ⚡ 3-Minute Setup

### 1️⃣ Create EmailJS Account
- Go to: https://www.emailjs.com/
- Sign up (FREE)
- Verify email

### 2️⃣ Get Your Credentials
1. **Add Email Service** → Connect Gmail → Copy **Service ID**
2. **Create Template** → Copy **Template ID**
3. **Account Settings** → Copy **Public Key**

### 3️⃣ Update Code
Open: `src/pages/Contact.jsx` (Line 50-52)

Replace:
```javascript
const SERVICE_ID = 'service_jtmkl5n'
const TEMPLATE_ID = 'template_lw5wg7j'
const PUBLIC_KEY = 'xJIj9O9KmsIy8BfAU'
```

With your actual IDs from EmailJS.

### 4️⃣ Test
```bash
npm run dev
```
Go to Contact page → Submit form → Check your email!

---

## 📧 After Publishing - How to View Submissions

### ✉️ Email Notifications (Primary Method)
All contact form submissions will be sent **directly to your email inbox**!

**Benefits:**
✅ Instant email notifications
✅ All submission details included
✅ Works from anywhere
✅ No need to login to any dashboard
✅ Accessible on phone, tablet, computer

**What you'll receive in each email:**
- Customer's Name
- Email Address
- Phone Number
- Subject
- Full Message
- Submission timestamp

### 📊 Backup Options (Optional)

**Option A: Admin Dashboard**
🔗 Visit: `https://your-website.com/admin/submissions`
- View all submissions in browser
- Export to CSV file
- Delete old entries

**Option B: EmailJS Dashboard**
🔗 Login to [emailjs.com](https://emailjs.com)
- View last 200 emails
- Check delivery status

---

## 📝 Free Plan: 200 emails/month

That's it! No backend needed! 🎉

**Primary Method: Check your email inbox for all submissions!**

For detailed instructions, see: `EMAILJS_SETUP.md`
