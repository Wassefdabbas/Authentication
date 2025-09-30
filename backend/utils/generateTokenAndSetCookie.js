import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly: true, // prevent XSS attacks // can't access cookie from JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict', // prevent CSRF attacks // Prevents the browser from sending cookies in cross-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    })

    return token
}