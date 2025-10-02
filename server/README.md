# SLNB Backend Server

Backend API server for Sri Lakshmi Narasimha Builders contact form with direct email functionality.

## Features

- ✅ Direct email sending (no EmailJS)
- ✅ Sends email to admin with form details
- ✅ Sends auto-reply to customer
- ✅ Professional HTML email templates
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error handling

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your Gmail credentials
   - See `EMAIL_SETUP_GUIDE.md` in root directory for detailed instructions

3. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### POST /api/contact
Send contact form submission

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Project Inquiry",
  "message": "I'm interested in your projects..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `EMAIL_USER` - Gmail address
- `EMAIL_APP_PASSWORD` - Gmail app password (16 characters)
- `ADMIN_EMAIL` - Email where form submissions are sent

## Gmail Setup

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password at: https://myaccount.google.com/apppasswords
3. Use the 16-character app password in `.env`

See `EMAIL_SETUP_GUIDE.md` for detailed instructions.

## Deployment

This server can be deployed to:
- Railway (recommended)
- Render
- Heroku
- Any Node.js hosting platform

Make sure to set environment variables in your hosting platform's dashboard.
