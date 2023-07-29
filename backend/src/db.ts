import mongoose from "mongoose";
import logger from "./utils/logger";

const connectToDatabase = async () => {
    const url = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    if (!url || !dbName) {
        logger.error("DB_URL or DB_NAME is undefinied");
        process.exit(1);
    }
    try {
        await mongoose.connect(url, { dbName: dbName })
        logger.info("Database connected successfully")
    } catch (error) {
        logger.error("trouble in connecting Database")
        logger.error(error)
        process.exit(1);
    }
}

export default connectToDatabase;