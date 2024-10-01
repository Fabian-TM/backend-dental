import { config } from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
config();

const MONGO_DB_URI = process.env.MONGO_DB_URI
const MONGO_DB_NAME = process.env.MONGO_DB_NAME
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await connect(`${MONGO_DB_URI}/${MONGO_DB_NAME}`, {
    } as ConnectOptions);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;