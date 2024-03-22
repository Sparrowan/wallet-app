require('dotenv').config();

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL!);
