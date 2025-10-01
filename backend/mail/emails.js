import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { transporter, sender } from "./mail.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: 'Email Verification'
        })

        console.log('Email sent successfully', response)
    } catch (error) {
        console.error('Error sending verification : ', error)
        throw new Error('Error sending verification Email', error)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: 'Welcome Email'
        })

        console.log('Welcome Email sent successfully', response)
    } catch (error) {
        console.error('Error sending welcome email : ', error)
        throw new Error('Error sending welcome Email', error)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: 'Reset Your Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: 'Password Reset'
        })

        console.log('Password Reset Email sent successfully', response)
    } catch (error) {
        console.error('Error sending Reset Password Email : ', error)
        throw new Error('Error sending Reset Password Email', error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: 'Password Reset Successfylly',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        })

        console.log('Password Reset Email sent successfully', response)
    } catch (error) {
        console.error('Error sending Reset Password Email : ', error)
        throw new Error('Error sending Reset Password Email', error)
    }
}