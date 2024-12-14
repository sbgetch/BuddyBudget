import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is connected!");
  } catch (error) {
    console.log("Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectDB;
