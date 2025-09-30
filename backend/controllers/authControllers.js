import crypto from 'crypto'

import { User } from '../models/User.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mail/emails.js'

// SIGN_UP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are Required !' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User Already Exists' })
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const newUser = await User.create({
            name,
            email,
            password,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        const user = newUser.toObject()
        delete user.password

        // jwt
        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({ success: true, message: 'User Created', user })
    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}

// VERIFY_EMAIL
export const verifyEmail = async (req, res) => {
    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // $gt : grater than
        })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' })
        }

        user.isVerified = true
        // no need after verification
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({ success: true, message: "Email verified successfully", user})
    } catch (error) {
        console.log("Error in verification controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}

// LOG_IN
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are Required !' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Email or Password' })
        }

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Invalid Email or Password" })
        }

        // jwt
        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()

        await user.save()

        const userData = user.toObject()
        delete userData.password

        res.status(200).json({ success: true, message: 'Logged in successfully', userData })
    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}

// LOG_OUT
export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logged out successfully' })
}

// FORGET_PASSWORD
export const forgetPassword = async (req, res) => {
    const { email } = req.body

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: 'All fields are Required !' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpireAt = Date.now() + 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpireAt

        await user.save()

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({ success: true, message: 'Password reset link sent to your email' })
    } catch (error) {
        console.log("Error in forgetPassword controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}

// RESET_PASSWORD
export const resetPasswrd = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            res.status(400).json({ success: false, message: 'Invalid or Expired reset token' })
        }

        // password auto hash -pre save=
        user.password = password;

        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        await sendResetSuccessEmail(user.email)
        res.status(200).json({ success: true, message: 'Password reset successfully' })
    } catch (error) {
        console.log("Error in ResetPassword controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}

// CHECK_AUTH
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password') // without password
        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log("Error in Check Auth controller", error)
        res.status(500).json({ message: "Server Error" })
    }
}