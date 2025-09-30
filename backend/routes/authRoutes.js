import express from 'express'
import { signup, login, logout, verifyEmail, forgetPassword, resetPasswrd, checkAuth } from '../controllers/authControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const route = express.Router()

route.get('/check-auth', verifyToken, checkAuth)

route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', logout)

route.post('/verify-email', verifyEmail)

route.post('/forget-password', forgetPassword)

route.post('/reset-password/:token', resetPasswrd)


export default route