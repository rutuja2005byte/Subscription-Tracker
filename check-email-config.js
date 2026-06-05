import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

console.log('=== Email Configuration Check ===');
console.log('Email:', EMAIL);
console.log('Password length:', EMAIL_PASSWORD?.length || 0);
console.log('Password starts with:', EMAIL_PASSWORD?.substring(0, 3) + '***');
console.log('');

if (!EMAIL || !EMAIL_PASSWORD) {
    console.error('❌ ERROR: EMAIL or EMAIL_PASSWORD not set in .env file');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

console.log('Testing Nodemailer configuration...');
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ FAILED: Nodemailer verification failed');
        console.error('Error:', error.message);
        console.error('');
        console.error('Common issues:');
        console.error('1. Gmail App Password is incorrect (should be 16 characters)');
        console.error('2. Email address typo');
        console.error('3. Gmail security settings - enable "Less secure app access" or use App Passwords');
        console.error('4. Gmail 2FA not set up - need to use App Passwords instead');
        process.exit(1);
    } else {
        console.log('✅ SUCCESS: Nodemailer is properly configured!');
        console.log('');
        console.log('Attempting to send test email...');
        
        transporter.sendMail({
            from: EMAIL,
            to: 'test@example.com', // This will fail but we can see the auth works
            subject: 'Test Email',
            html: '<h1>Test</h1>'
        }, (error, info) => {
            if (error && error.message.includes('Invalid login')) {
                console.error('❌ FAILED: Invalid Gmail credentials');
                process.exit(1);
            } else if (error && error.message.includes('recipient')) {
                console.log('✅ Auth successful! (test recipient rejected - this is expected)');
                process.exit(0);
            } else if (error) {
                console.error('Error:', error.message);
                process.exit(1);
            } else {
                console.log('✅ Test email sent successfully!');
                process.exit(0);
            }
        });
    }
});
