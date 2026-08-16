# 🚀 Quick Start - Direct Email Setup

Follow these steps to set up direct email functionality (no EmailJS needed).

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Create .env File

In the `server` directory, create a new file named `.env` and add:

```env
PORT=3001
EMAIL_USER=srilakshminarasimhabuilders117@gmail.com
EMAIL_APP_PASSWORD=your-app-password-here
ADMIN_EMAIL=srilakshminarasimhabuilders117@gmail.com
```

## Step 3: Get Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Select **Mail** and **Other (Custom name)**
5. Enter "SLNB Contact Form"
6. Click **Generate**
7. Copy the **16-character password**
8. Paste it in your `.env` file as `EMAIL_APP_PASSWORD`

## Step 4: Start Backend Server

```bash
# From server directory
npm run dev
```

You should see: `Server is running on port 3001`

## Step 5: Start Frontend (New Terminal)

```bash
# From root directory
npm run dev
```

## Step 6: Test It!

1. Open http://localhost:5173 (or your Vite port)
2. Go to Contact page
3. Fill out the form
4. Submit
5. Check your email inbox!

## ✅ What Happens

When someone submits the contact form:

1. **You receive an email** with:
   - Customer name, email, phone
   - Subject and message
   - Timestamp
   
2. **Customer receives auto-reply** with:
   - Thank you message
   - Their message details
   - Your contact information

3. **No "via EmailJS" notice** - emails come directly from your Gmail!

## 🐛 Troubleshooting

**"Invalid login" error:**
- Make sure you're using the App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled

**Emails not arriving:**
- Check spam folder
- Verify EMAIL_USER and ADMIN_EMAIL are correct
- Check server console for errors

**CORS errors:**
- Make sure backend is running on port 3001
- Frontend should auto-detect localhost:3001

## 📝 Next Steps

For production deployment, see `EMAIL_SETUP_GUIDE.md` for detailed instructions on deploying to Railway, Render, or Heroku.
