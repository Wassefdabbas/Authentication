import {MailtrapClient} from "mailtrap";
import 'dotenv/config'

// ____NEW____
import nodemailer from 'nodemailer'

const TOKEN = process.env.MailToken;

export const mailtrapClient = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// export const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });

export const sender = {
  email: process.env.SMTP_USER,
  name: "Auth App",
};