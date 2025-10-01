import 'dotenv/config'

// ____NEW____
import nodemailer from 'nodemailer'

export const mailtrapClient = nodemailer.createTransport({
  // service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Must be an App Password from Google
  },
});

export const sender = {
  email: process.env.SMTP_USER,
  name: "Auth App",
};