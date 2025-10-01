import 'dotenv/config'

// ____NEW____
import nodemailer from 'nodemailer'

export const mailtrapClient = nodemailer.createTransport({
  // service: "gmail",
  host: 'sandbox.smtp.mailtrap.io',
  port: 465,
  secure: true,
  auth: {
    user: 'fd5f258f242263',
    pass: '5999837b2744ce', // Must be an App Password from Google
  },
});

export const sender = {
  email: process.env.SMTP_USER,
  name: "Auth App",
};