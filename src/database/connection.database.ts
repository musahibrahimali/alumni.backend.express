import mongoose from "mongoose";
import {DB_URI} from "../config/config";
import log from '../logger';

export const connectDatabase = () => {
    // connect to mongodb
    mongoose
        .connect(DB_URI, {}).then(() => {
            log.info("Database connected");
        }).catch(error => {
            log.error("db error", error);
            process.exit(1);
        });
}


