import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {

    console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

    try {

        const dbConnection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${dbConnection.connection.host}`);
    } catch (error) {

        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDb;