require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = () => {
  console.log('Attempting to connect to MongoDB...');
  // console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug log

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectDB;
