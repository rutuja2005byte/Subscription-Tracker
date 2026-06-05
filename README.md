# Subscription Tracker

A subscription management application that helps users track and receive reminders for their subscriptions.

## Features

| Feature | Description |
|---------|-------------|
| User Authentication | JWT-based sign-up and sign-in |
| Subscription Management | Create, view, update, and cancel subscriptions |
| Automated Reminders | Email reminders 7, 5, 2, and 1 day before renewal |
| Status Tracking | Active, cancelled, and expired subscriptions |
| Multi-Currency | USD, EUR, and GBP support |
| Categories | Organize subscriptions by type |

## Tech Stack

- Express.js with Node.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for emails
- Upstash QStash for workflows
- Arcjet for security

## Quick Start

1. Clone and install
```bash
git clone https://github.com/rutuja2005byte/Subscription-Tracker.git
cd Subscription-Tracker
npm install
```

2. Create `.env.development.local`
```env
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-tracker
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=
QSTASH_CURRENT_SIGNING_KEY=sig_test
QSTASH_NEXT_SIGNING_KEY=sig_test
```

3. Start QStash and run
```bash
docker run -p 8080:8080 upstash/qstash-local
npm run dev
```

## Email Reminders

Automated reminders are sent 7, 5, 2, and 1 day before subscription renewal.

Example email:

![Email Reminder](./assets/img.png)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/sign-up | Register user |
| POST | /api/v1/auth/sign-in | Login user |
| POST | /api/v1/subscriptions | Create subscription |
| GET | /api/v1/subscriptions/user/:id | Get user subscriptions |
| PUT | /api/v1/subscriptions/:id | Update subscription |
| DELETE | /api/v1/subscriptions/:id | Delete subscription |

## Scripts

```bash
npm run dev          Start development server
npm start           Start production server
npm run test-email  Send test email
npm run check-email Verify email configuration
```
## License

MIT

## Author

Rutuja Darade - [@rutuja2005byte](https://github.com/rutuja2005byte)
