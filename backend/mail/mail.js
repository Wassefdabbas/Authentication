import 'dotenv/config'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER,      // e.g. your Gmail address
    pass: process.env.SMTP_PASS,      // MUST be a Google App Password
  },
});

export const sender = {
  email: process.env.SMTP_USER,
  name: "Auth App",
};

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ Gmail SMTP is ready to send emails");
  }
});