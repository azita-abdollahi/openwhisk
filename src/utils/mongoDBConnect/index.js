const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_IP}/${process.env.MONGO_DB}?authSource=admin`;

async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('database connected successfully...');
  } catch (error) {
    console.log("connection error...!\n");
    console.error(error);
    process.exit(1)
  }
};
module.exports = { connectDB };