# SLNB Website — Windows PowerShell Run Guide

This guide is for the extracted `slnb-phase3-4-complete` project.

> **Important:** Run the commands in the order shown.  
> You need **two PowerShell windows** when running the frontend and backend together.

---

## 0. Open the project folder

After extracting the ZIP, open PowerShell and go to the project folder.

If you extracted it to `C:\SLNB\project`, run:

```powershell
cd "C:\SLNB\project"
```

Check that you are in the correct folder:

```powershell
Get-ChildItem
```

You should see files/folders such as:

```text
package.json
src
server
vite.config.js
.env.example
```

---

# 1. Check Node.js and npm

Run:

```powershell
node -v
```

Then:

```powershell
npm -v
```

The project uses Node.js + npm.

If `node` or `npm` is not recognized, install/fix Node.js before continuing.

---

# 2. Install FRONTEND dependencies

Make sure PowerShell is in the project root:

```powershell
cd "C:\SLNB\project"
```

Then run:

```powershell
npm install
```

Wait until it finishes successfully.

### If you see an error

Do **not** continue to the next command.

Copy the complete error and keep it for troubleshooting.

---

# 3. Create the FRONTEND environment file

From the project root:

```powershell
Copy-Item ".env.example" ".env"
```

Check that it exists:

```powershell
Get-ChildItem -Force ".env"
```

Open it:

```powershell
notepad ".env"
```

Fill in real values where required.

For local development, you can leave optional analytics/CMS values empty.

**Do not put passwords or API secrets into files you plan to upload publicly.**

Save and close Notepad.

---

# 4. Install BACKEND dependencies

Open a second PowerShell window.

Run:

```powershell
cd "C:\SLNB\project\server"
```

Then:

```powershell
npm install
```

Wait until it finishes successfully.

---

# 5. Create the BACKEND environment file

Still inside:

```text
C:\SLNB\project\server
```

Run:

```powershell
Copy-Item ".env.example" ".env"
```

Open the backend environment file:

```powershell
notepad ".env"
```

At minimum, for the contact/email/admin features, configure:

```text
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=your-real-gmail@gmail.com
EMAIL_APP_PASSWORD=your-new-gmail-app-password
ADMIN_EMAIL=your-real-gmail@gmail.com
ADMIN_API_KEY=your-long-random-admin-key

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password
JWT_SECRET=your-long-random-jwt-secret
```

For Brevo/newsletter, configure these only if you want newsletter subscriptions connected:

```text
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=your_brevo_list_id
BREVO_SENDER_EMAIL=your_verified_sender_email
```

For CMS, leave these empty if you are using the project's local content:

```text
CMS_PROVIDER=none
CMS_API_URL=
CMS_API_TOKEN=
```

Save and close Notepad.

---

# 6. Start the BACKEND

In the second PowerShell window, still inside:

```text
C:\SLNB\project\server
```

Run:

```powershell
npm run dev
```

You should see the backend start on port `3001`.

**Keep this PowerShell window open.**

Do not close it while using the website.

---

# 7. Test the BACKEND

Open a third PowerShell window.

Run:

```powershell
Invoke-WebRequest "http://localhost:3001/api/health"
```

If the server is working, you should receive an HTTP response from the backend.

You can also open this in your browser:

```text
http://localhost:3001/api/health
```

Expected result is a successful health response.

---

# 8. Start the FRONTEND

Go back to the first PowerShell window.

Go to the project root:

```powershell
cd "C:\SLNB\project"
```

Run:

```powershell
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173
```

Open the URL shown by Vite in the terminal.

**Keep this PowerShell window open too.**

At this point you should have:

```text
PowerShell 1 → Frontend → Vite
PowerShell 2 → Backend  → Express on port 3001
```

---

# 9. Test the main website

Open the frontend URL shown by Vite.

Test these areas one by one:

```text
Home
About
Projects
Project Details
Gallery
Blog
Blog Details
Contact
Search
Compare
```

Do not assume a feature works just because the page opens.

Click through each feature.

---

# 10. Test Project Details

Open:

```text
/projects/<project-id>
```

From the Projects page, click **View Details**.

Check:

- Gallery
- Amenities
- Unit availability
- Map
- Brochure/floor plan
- Enquire Now

Click **Enquire Now** and verify that the Contact form is pre-filled.

---

# 11. Test Blog Details

Open the Blog page.

Click a blog article.

Check:

- Full article
- Author information
- Related posts
- Social sharing
- Copy link

---

# 12. Test Global Search

Open the Search feature.

Search for:

```text
project
```

Then try a project/location/amenity name from your actual data.

Check that matching projects/blog posts appear.

---

# 13. Test Property Comparison

From the Projects page:

1. Select a project for comparison.
2. Select another project.
3. Open Compare.
4. Add more projects if desired.
5. Check the side-by-side information.

The comparison should support up to four properties.

---

# 14. Test Contact Form

Open:

```text
Contact
```

Submit a test inquiry.

Use a real email address that you control.

Check:

- Validation
- Required fields
- Phone validation
- Success/error message
- Backend receives the request
- Lead is stored
- Email delivery works if SMTP is configured

---

# 15. Check the SQLite lead database

After submitting a contact form, look inside:

```text
C:\SLNB\project\server
```

A local SQLite database should be created by the backend.

Do not delete it while testing.

---

# 16. Test Admin

Open:

```text
/admin
```

or the admin route implemented by the project.

Use the credentials you configured in:

```text
server\.env
```

Test:

- Admin login
- Dashboard
- Contact submissions
- Delete
- Logout

Never use the default password in production.

---

# 17. Test English / Telugu

Use the language switcher.

Check:

```text
English
Telugu
```

Refresh the page and verify that the selected language is retained where implemented.

Test navigation after changing language.

---

# 18. Test WhatsApp button

Check the floating WhatsApp button.

Make sure:

```text
VITE_WHATSAPP_NUMBER
```

contains the correct number.

Do not include spaces, `+`, or punctuation unless the project's implementation specifically expects them.

---

# 19. Test production build

Stop the frontend development server with:

```powershell
Ctrl + C
```

Then from the project root run:

```powershell
npm run build
```

A successful build should create:

```text
dist
```

If the build fails:

**STOP HERE.**

Copy the complete terminal error before doing anything else.

---

# 20. Run the production preview

After a successful build:

```powershell
npm run preview
```

Vite will show the preview URL.

Open that URL in the browser.

Test the important pages again.

---

# 21. Run ESLint

From the project root:

```powershell
npm run lint
```

If lint reports errors, copy the complete output.

---

# 22. Stop the servers

Frontend terminal:

```powershell
Ctrl + C
```

Backend terminal:

```powershell
Ctrl + C
```

---

# 23. Normal daily startup after everything works

You do **NOT** need to run `npm install` every time.

### Terminal 1 — Backend

```powershell
cd "C:\SLNB\project\server"
npm run dev
```

### Terminal 2 — Frontend

```powershell
cd "C:\SLNB\project"
npm run dev
```

Then open the Vite URL shown in Terminal 2.

---

# 24. Complete first-time command list

If you want the shortest sequence, use this order.

### Terminal 1 — Frontend setup

```powershell
cd "C:\SLNB\project"
node -v
npm -v
npm install
Copy-Item ".env.example" ".env"
notepad ".env"
```

Configure `.env`, save, then:

```powershell
npm run build
```

If the build succeeds:

```powershell
npm run dev
```

---

### Terminal 2 — Backend setup

```powershell
cd "C:\SLNB\project\server"
npm install
Copy-Item ".env.example" ".env"
notepad ".env"
```

Configure the backend `.env`, save, then:

```powershell
npm run dev
```

---

### Terminal 3 — Backend test

```powershell
Invoke-WebRequest "http://localhost:3001/api/health"
```

---

# 25. If `vite` is not recognized

If you get:

```text
vite is not recognized as an internal or external command
```

run:

```powershell
cd "C:\SLNB\project"
npm install
```

Then check:

```powershell
Test-Path ".\node_modules\.bin\vite.cmd"
```

If it returns:

```text
True
```

run:

```powershell
npm run dev
```

If it returns:

```text
False
```

send the complete output of:

```powershell
npm install
```

Do not manually download Vite.

---

# 26. If `npm install` fails

Run:

```powershell
node -v
npm -v
npm cache verify
```

Then try:

```powershell
npm install
```

If it still fails, send the **complete npm error**.

Do not randomly delete `package-lock.json` or `node_modules` until the error has been checked.

---

# 27. Important security rules

Never send me or upload:

```text
.env
server\.env
Gmail app passwords
JWT secrets
ADMIN_PASSWORD
ADMIN_API_KEY
BREVO_API_KEY
CMS_API_TOKEN
```

Only share:

```text
.env.example
server\.env.example
```

If an actual password/API key was ever exposed publicly, revoke it and create a new one.

---

# 28. Final verification order

Once everything runs, verify in this exact order:

```text
1. Backend health
2. Frontend starts
3. Home
4. Navigation
5. Projects
6. Project details
7. Blog
8. Blog details
9. Search
10. Compare
11. Contact form
12. Lead storage
13. Email
14. Admin login
15. Admin submissions
16. English/Telugu
17. WhatsApp
18. npm run lint
19. npm run build
20. npm run preview
```

If any step fails, stop at that step and send the error/output before continuing.
