import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

process.env.NODE_ENV = process.env.NODE_ENV || "production";


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser()) // allows us to parse imcoming cookies

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is Running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Failed to connect to DB", error);
        process.exit(1);
    }
}

startServer()