const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI); //|| "mongodb://127.0.0.1:27017/trendbetter"
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop the server if DB fails
  }
}

module.exports = connectDB;