# Subscription Tracker

A subscription management application that helps users track, manage, and receive reminders for their subscriptions.

## Features

| Feature | Description |
|---------|-------------|
| User Authentication | Secure sign-up and sign-in with JWT tokens |
| Subscription Management | Create, view, update, and cancel subscriptions |
| Automated Reminders | Email reminders 7, 5, 2, and 1 day before renewal |
| Subscription Status | Track active, cancelled, and expired subscriptions |
| Payment Methods | Record and manage payment methods |
| Multi-Currency | Support for USD, EUR, and GBP |
| Categories | Organize by sports, news, entertainment, lifestyle, technology, finance, politics |
| Dashboard | View all subscriptions at a glance |

## Tech Stack

- Backend: Express.js with Node.js
- Database: MongoDB with Mongoose
- Authentication: JWT tokens
- Email: Nodemailer with Gmail SMTP
- Workflows: Upstash QStash
- Security: Arcjet rate limiting and bot detection

## Project Structure

```
config/              Configuration files
controllers/         Business logic
routes/             API endpoints
models/             MongoDB schemas
middlewares/        Express middlewares
utils/              Utility functions
database/           Database connection
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Gmail account with App Password
- Upstash account (for production)

### Installation

1. Clone the repository
```bash
git clone https://github.com/rutuja2005byte/Subscription-Tracker.git
cd Subscription-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.development.local`
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

4. Start local QStash (for development)
```bash
docker run -p 8080:8080 upstash/qstash-local
```

5. Run the server
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/v1/auth/sign-up
- POST /api/v1/auth/sign-in
- POST /api/v1/auth/sign-out

### Users
- GET /api/v1/users
- GET /api/v1/users/:id

### Subscriptions
- POST /api/v1/subscriptions
- GET /api/v1/subscriptions
- GET /api/v1/subscriptions/:id
- GET /api/v1/subscriptions/user/:id
- PUT /api/v1/subscriptions/:id
- PUT /api/v1/subscriptions/:id/cancel
- DELETE /api/v1/subscriptions/:id
- GET /api/v1/subscriptions/upcoming-renewals

## Scripts

```bash
npm run dev          Start development server with nodemon
npm start           Start production server
npm run test-email  Send test email
npm run check-email Verify email configuration
```

## Email Reminders

Automated reminders are sent on:
- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

## Security

- JWT authentication for sessions
- Bcrypt password hashing
- Rate limiting with token bucket
- Bot detection
- DDoS protection
- Input validation with schemas

## Documentation

- TROUBLESHOOTING.md - Email delivery troubleshooting
- DEBUG_GUIDE.md - Debugging and testing guide

## Troubleshooting

If emails are not sending:
1. Run `npm run check-email` to verify Gmail credentials
2. Ensure you're using Gmail App Password (not regular password)
3. Verify QStash is running locally
4. Check console logs for error messages

See TROUBLESHOOTING.md for detailed help.

## License

MIT License

## Author

Rutuja Darade - GitHub: @rutuja2005byte
