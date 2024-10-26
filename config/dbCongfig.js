// db.js
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL || 'mongodb+srv://oluwolefolawe:Uxls8lKXNEb7SBWl@icedtphotosdb.0fubl.mongodb.net/foto?retryWrites=true&w=majority'


const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1); // Exit the app with failure
  }
};

module.exports = connectDB;
