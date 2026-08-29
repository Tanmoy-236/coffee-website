const mongoose = require('mongoose');

const connectDatabase = async () => {
    const databaseUrl = process.env.MONGODB_URI;

    if (!databaseUrl) {
        throw new Error('MONGODB_URI is missing from the environment');
    }

    await mongoose.connect(databaseUrl);
    console.log('MongoDB connected');
};

module.exports = connectDatabase;