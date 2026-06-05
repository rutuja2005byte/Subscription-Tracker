import { sendReminderEmail } from './utils/send-email.js';
import dayjs from 'dayjs';

// Test email sending
const testEmail = async () => {
    try {
        const testSubscription = {
            name: 'Netflix Premium',
            price: 15.99,
            currency: 'USD',
            frequency: 'monthly',
            paymentMethod: 'Credit Card',
            renewalDate: dayjs().add(7, 'days').toDate(),
            user: {
                name: 'Rutuja',
                email: 'rutujadarade2005@gmail.com',
            }
        };

        console.log('Sending test email...');
        const result = await sendReminderEmail({
            to: testSubscription.user.email,
            type: '7 days before reminder',
            subscription: testSubscription,
        });

        console.log('Email sent successfully!', result);
    } catch (error) {
        console.error('Error sending email:', error);
        process.exit(1);
    }
};

testEmail();
