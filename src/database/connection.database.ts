import mongoose from "mongoose";
import {DB_URI} from "../config/config";

export const connectDatabase = () => {
    // connect to mongodb
    mongoose
        .connect(DB_URI).then(() => {
            console.info("Connected to database successfully");
        }).catch(error => {
            console.error("database connection error", error);
            process.exit(1);
        });
}


