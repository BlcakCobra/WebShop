import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db";
import app from "./app";
import logger from "./log/logger";

const PORT = process.env.EXPRESS_PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export { app };
