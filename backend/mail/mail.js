import 'dotenv/config'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dabwasef1441@gmail.com',      // e.g. your Gmail address
    pass: 'uehebkeyqmlwbefr',      // MUST be a Google App Password
  },
});

export const sender = {
  email: 'dabwasef1441@gmail.com',
  name: "Auth App",
};

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ Gmail SMTP is ready to send emails");
  }
});