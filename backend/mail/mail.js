import 'dotenv/config'
import e from 'express';

// ____NEW____
import nodemailer from 'nodemailer'

export const mailtrapClient = nodemailer.createTransport({
  // service: "gmail",
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'api',
    pass: process.env.MAILTRAP_TOKEN, // Must be an App Password from Google
  },
});

export const sender = {
  email: process.env.SMTP_USER,
  name: "Auth App",
};
