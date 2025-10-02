# Deployment Guide - Netlify

## Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify serverless function for contact form"
   git push
   ```

2. **Deploy to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository
   - Build settings are auto-detected from `netlify.toml`

3. **Add Environment Variables in Netlify**
   - Go to Site settings > Environment variables
   - Add these variables:
     - `EMAIL_USER` = your Gmail address
     - `EMAIL_APP_PASSWORD` = your Gmail App Password (from Google Account settings)
     - `ADMIN_EMAIL` = srilakshminarasimhabuilders117@gmail.com

4. **Deploy**
   - Click "Deploy site"
   - Your contact form will work automatically!

## How It Works

- Contact form now uses `/.netlify/functions/contact` endpoint
- This works both locally (with Netlify CLI) and in production
- No separate backend server needed
- Emails sent via Gmail SMTP

## Testing Locally with Netlify CLI

```bash
npm install -g netlify-cli
netlify dev
```

This will run both your frontend and serverless functions locally.
