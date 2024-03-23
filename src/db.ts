import mongoose from 'mongoose';

// Load environment variables
require('dotenv').config();

// Database connection function
export const connectToDatabase = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGODB_URL!!, {
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
};
