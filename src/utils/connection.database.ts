import mongoose from "mongoose";
import config from "../config/config";

export const connectDatabase = () => {
    // connect to mongodb
    mongoose
        .connect(
            config.mongodb.DB_URL,
        ).then(() => {
            console.info("Connected to database successfully");
        }).catch(error => {
            console.error("database connection error", error);
            process.exit(1);
        });
}


