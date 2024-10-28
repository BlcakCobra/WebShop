import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    if (process.env.NODE_ENV === "test") {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      console.log("MongoDB URI:", uri);
      await mongoose.connect(uri);
      console.log("Connected to in-memory MongoDB for testing");
    } else {
      const mongoUri = process.env.MONGO_URI as string;
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit();
  }
};

export const closeDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log("Disconnected from MongoDB");
    }

    if (mongoServer) {
      await mongoServer.stop();
      console.log("In-memory MongoDB stopped");
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB", error);
  }
};

export default connectDB;
