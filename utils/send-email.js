import { emailTemplates } from './email-template.js'
import dayjs from 'dayjs'
import transporter, { accountEmail } from '../config/nodemailer.js'

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if(!to || !type) throw new Error('Missing required parameters: to, type');
  
  if(!subscription) throw new Error('Missing subscription object');

  const template = emailTemplates.find((t) => t.label === type);

  if(!template) throw new Error(`Invalid email type: ${type}. Valid types are: ${emailTemplates.map(t => t.label).join(', ')}`);

  // Ensure user object exists
  if (!subscription.user) {
    throw new Error('Subscription user information is missing');
  }

  const mailInfo = {
    userName: subscription.user.name || 'Subscriber',
    subscriptionName: subscription.name || 'Your Subscription',
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name || 'Plan',
    price: `${subscription.currency || 'USD'} ${subscription.price} (${subscription.frequency || 'unknown'})`,
    paymentMethod: subscription.paymentMethod || 'Not specified',
    accountSettingsLink: `${process.env.CLIENT_URL || 'http://localhost:3000'}/settings`,
    supportLink: `${process.env.CLIENT_URL || 'http://localhost:3000'}/support`,
  }

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.error('Error sending email to', to, ':', error);
        reject(error);
      } else {
        console.log('Email sent successfully to', to, ':', info.response);
        resolve(info);
      }
    })
  })
}