import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MongoDB URL is missing in .env");
}

let isConnected = false;
export async function connect() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });
    connection.on("error", (error) => {
      console.error(
        "MongoDB connection error: Please make sure MongoDb is running.",
        error
      );
      process.exit(); //in production i have to remove this option
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      await connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });

    const connectionOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 50, // Maintain up to 50 socket connections
      wtimeoutMS: 2500, // Timeout for write operations
      retryWrites: true, // Retry write operations on network errors
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    await mongoose.connect(MONGODB_URL, connectionOptions);
    isConnected = true;

    return connection;
  } catch (error) {
    console.error(error);
  }
}
