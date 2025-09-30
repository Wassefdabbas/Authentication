import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MONOGDB CONNECTED SUCCESSFULLY!')
    } catch(error) {
        console.log('Error Connecting to MONGODB : ', error)
        process.exit(1) // exit with failure // 0 success
    }
}
