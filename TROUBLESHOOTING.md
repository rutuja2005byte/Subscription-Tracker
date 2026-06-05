# Email Delivery Troubleshooting Checklist

## Issues Fixed

✅ Added missing `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` to `.env.development.local`
✅ Added missing import for `sendReminderEmail` in workflow controller
✅ Converted `sendReminderEmail` to return a Promise for proper async/await
✅ Added missing email template variables (`accountSettingsLink`, `supportLink`)
✅ Fixed undefined `reminderDate` variable in workflow loop
✅ Enhanced error logging in email sending
✅ Added database connection check in workflow controller
✅ Made email sending more robust with fallback values

## Testing Steps

### 1. Check Email Configuration
```bash
npm run check-email
```
This will verify:
- Gmail credentials are correct
- Nodemailer can authenticate
- Email address is valid

**If it fails:** Your Gmail App Password may be incorrect. See "Gmail Setup" section below.

### 2. Test Direct Email Sending
```bash
npm run test-email
```
This sends a test email to `rutujadarade2005@gmail.com`. If successful, emails work!

**If it fails:** Check the error message and fix accordingly.

### 3. Test Full API Flow
1. Start the server: `npm run dev`
2. Make sure QStash is running locally (if in development)
3. Use Postman to POST to `/api/v1/subscriptions` with:
   ```json
   {
     "name": "Netflix Premium",
     "price": 15.99,
     "currency": "USD",
     "frequency": "monthly",
     "category": "entertainment",
     "startDate": "2024-02-01T00:00:00.000Z",
     "paymentMethod": "Credit Card"
   }
   ```
4. Add Authorization header with Bearer token from signup
5. Check console logs for:
   - "Subscription created: [id]"
   - "Workflow triggered successfully: [id]"
   - "Email sent successfully: [email]"

## Gmail Setup (Important!)

### ⚠️ Gmail with 2FA Enabled (RECOMMENDED)
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character app password
4. Copy this password to `EMAIL_PASSWORD` in `.env.development.local`
5. Use the generated password, NOT your regular Gmail password

### Gmail without 2FA (Less Secure)
1. Go to https://myaccount.google.com/lesssecureapps
2. Enable "Allow less secure apps"
3. Use your regular Gmail password in `EMAIL_PASSWORD`

## Environment Variables Checklist

In `.env.development.local`, verify you have:
```
EMAIL=rutujadarade2005@gmail.com
EMAIL_PASSWORD=<16-char app password>
SERVER_URL=http://localhost:5500
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=
QSTASH_CURRENT_SIGNING_KEY=sig_test
QSTASH_NEXT_SIGNING_KEY=sig_test
```

## QStash Setup (For Development)

For local testing, you need QStash running locally:

### Option 1: Using Docker
```bash
docker run -p 8080:8080 upstash/qstash-local
```

### Option 2: Using NPX
```bash
npx @upstash/qstash-local
```

Make sure it's running before testing!

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid login` | Wrong Gmail password/app password | Get new app password from Google |
| `Username and password not accepted` | Gmail auth failed | Check email and password in .env |
| `fetch failed` | SERVER_URL is wrong or QStash can't reach it | Verify SERVER_URL and QStash running |
| `404 Not Found` on workflow endpoint | Workflow route not registered | Check routes/workflow.routes.js |
| `ECONNREFUSED` on MongoDB | Database not connected | Check DB_URI and MongoDB connection |
| `Subscription not found` | Subscription ID issue | Check subscription was created first |

## Debugging Commands

```bash
# Check if all environment variables are loaded
node -e "import('./config/env.js').then(m => Object.entries(m).forEach(([k,v]) => console.log(k, ':', v)))"

# Check if QStash is running
curl http://127.0.0.1:8080/health

# Check if MongoDB is accessible
node -e "import('./database/mongodb.js').then(m => m.default()).then(() => console.log('✅ Connected!')).catch(e => console.error('❌ Error:', e.message))"

# Check email credentials
npm run check-email

# Send test email
npm run test-email
```

## Still Not Working?

1. **Check browser console** for frontend errors
2. **Check server console** for backend errors (should see detailed logs)
3. **Check Gmail inbox AND spam folder** - emails might be there!
4. **Check email logs**: Create a log file in send-email.js
5. **Test with a different email** (e.g., your personal email instead of rutujadarade2005@gmail.com)
6. **Restart the server** after making env changes
7. **Clear cache** - restart terminal session to load new .env values

## Performance Notes

- Workflow execution happens **asynchronously** in the background
- Email sends on the scheduled reminder dates (7, 5, 2, 1 days before)
- For testing, change the REMINDERS array to smaller numbers to test immediately
