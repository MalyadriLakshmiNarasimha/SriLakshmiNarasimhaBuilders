# Email Setup Guide - Direct Email (No EmailJS)

This guide will help you set up direct email functionality for your contact form using Gmail and Nodemailer.

## 🚀 Quick Setup

### Step 1: Install Backend Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### Step 2: Configure Gmail App Password

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Sign in with your Gmail account

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Click on "2-Step Verification"
   - Follow the steps to enable it

3. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "SLNB Contact Form" as the name
   - Click "Generate"
   - **Copy the 16-character password** (you won't see it again!)

### Step 3: Create Environment File

1. Navigate to the `server` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` file with your credentials:
   ```env
   PORT=3001
   EMAIL_USER=your-gmail-address
   EMAIL_APP_PASSWORD=your-16-character-app-password-here
   ADMIN_EMAIL=your-admin-email
   ```

### Step 4: Update Frontend API URL

The Contact.jsx file is already configured to use `http://localhost:3001/api/contact`

For production, you'll need to:
1. Deploy the backend server (Heroku, Railway, Render, etc.)
2. Update the API URL in Contact.jsx to your production URL

### Step 5: Start the Backend Server

```bash
# From the server directory
npm run dev
```

The server will start on http://localhost:3001

### Step 6: Start the Frontend

```bash
# From the root directory
npm run dev
```

## 📧 How It Works

1. **User fills out the contact form** on your website
2. **Frontend sends data** to your backend server at `/api/contact`
3. **Backend sends TWO emails**:
   - **To Admin**: You receive the contact form submission with all details
   - **To Customer**: They receive an auto-reply confirming their message was received
4. **No "via EmailJS" notice** - emails come directly from your Gmail account!

## 🔒 Security Notes

- ✅ Never commit the `.env` file to Git (it's in .gitignore)
- ✅ Use App Password, not your regular Gmail password
- ✅ Keep your App Password secret
- ✅ The backend validates all form inputs

## 🌐 Production Deployment

### Backend Deployment Options:

1. **Railway** (Recommended - Free tier available)
   - Connect your GitHub repo
   - Set environment variables in Railway dashboard
   - Auto-deploys on push

2. **Render** (Free tier available)
   - Create a new Web Service
   - Connect your repo
   - Add environment variables
   - Deploy

3. **Heroku**
   - Create a new app
   - Set config vars (environment variables)
   - Deploy via Git

### After Deployment:

Update `Contact.jsx` with your production API URL:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app/api/contact';
```

Add to root `.env`:
```env
VITE_API_URL=https://your-backend.railway.app/api/contact
```

## 🧪 Testing

1. Start both frontend and backend servers
2. Fill out the contact form
3. Check your inbox (srilakshminarasimhabuilders117@gmail.com)
4. You should receive an email with the form details
5. The customer should receive an auto-reply

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure 2-Step Verification is enabled
- Use App Password, not regular password
- Check that EMAIL_USER matches the Gmail account

### Emails not arriving
- Check spam folder
- Verify App Password is correct
- Check server logs for errors
- Ensure Gmail account is active

### CORS errors
- Backend CORS is configured to allow all origins
- For production, restrict CORS to your domain

## 📝 Email Templates

Both emails are professionally formatted with HTML:
- Admin email includes all form details
- Customer email is a thank you message with your contact info
- Both include timestamps and branding

## 💡 Benefits Over EmailJS

✅ **No "via EmailJS" notice** - emails come directly from your Gmail  
✅ **No third-party service** - you control everything  
✅ **Free** - no EmailJS subscription needed  
✅ **Professional** - emails look like they come from your business  
✅ **Auto-replies** - customers get instant confirmation  
✅ **Customizable** - full control over email templates  

## 📞 Support

If you need help:
1. Check the server logs: `npm run dev` in server directory
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test the backend directly: `curl http://localhost:3001/api/health`
