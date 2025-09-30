import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: { type: String },
        resetPasswordExpiresAt: { type: Date },
        verificationToken: { type: String },
        verificationTokenExpiresAt: { type: Date },
    },
    { timestamps: true }
)

// Hash Password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = 12
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password)
    return isPasswordCorrect
}

export const User = mongoose.model('User', userSchema)