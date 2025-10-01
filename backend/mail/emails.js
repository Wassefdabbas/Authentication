import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { resend, sender } from "./mail.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await resend.emails.send({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: 'Email Verification'
    });

    console.log('✅ Verification email sent successfully:', response);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Welcome to Auth App!', // ✅ added subject
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
      category: 'Welcome Email'
    });

    console.log('✅ Welcome email sent successfully:', response);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await resend.emails.send({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Reset Your Password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: 'Password Reset'
    });

    console.log('✅ Password reset email sent successfully:', response);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset'
    });

    console.log('✅ Password reset success email sent:', response);
  } catch (error) {
    console.error('❌ Error sending reset success email:', error);
    throw error;
  }
};
