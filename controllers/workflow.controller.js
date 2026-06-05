import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/Subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
import { QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY } from '../config/env.js';
import connectToDatabase from '../database/mongodb.js';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve( 
    async(context) => {
        try {
            // Ensure database connection
            await connectToDatabase();
            
            const { subscriptionId } = context.requestPayload;
            console.log('Workflow triggered for subscription:', subscriptionId);
            
            const subscription = await fetchSubscription(context, subscriptionId);

            if(!subscription || subscription.status !== 'active') {
                console.log('Subscription not found or not active:', subscriptionId);
                return;
            }

            const renewalDate = dayjs(subscription.renewalDate);

            if(renewalDate.isBefore(dayjs())) {
                console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
                return;
            }

            for (const daysBefore of REMINDERS) {
                const reminderDate = renewalDate.subtract(daysBefore, 'days');

                if(reminderDate.isAfter(dayjs())) {
                    await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
                }

                await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
            }
        } catch (error) {
            console.error('Error in workflow:', error);
            throw error;
        }
    },
    {
        baseUrl: process.env.QSTASH_URL,
        token: process.env.QSTASH_TOKEN,
        currentSigningKey: QSTASH_CURRENT_SIGNING_KEY,
        nextSigningKey: QSTASH_NEXT_SIGNING_KEY,
    }
);

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        await sendReminderEmail ({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}