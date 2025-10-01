import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// This is the single, correct CORS configuration
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL   // deployed frontend
    : 'http://localhost:5175'; // your local frontend dev

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
console.log("CORS origin:", allowedOrigin);

app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming cookies

// Your API routes
app.use('/api/auth', authRoutes);

// This section serves the built frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is Running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to DB", error);
        process.exit(1);
    }
};

startServer();