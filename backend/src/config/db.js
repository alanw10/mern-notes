import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async () => {
    try {
        console.log("connected to mongodb");
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error("Error connecting to mongodb",error)
        process.exit(1)
    }
}
