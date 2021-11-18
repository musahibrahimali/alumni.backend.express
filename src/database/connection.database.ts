import mongoose from "mongoose";
import {DB_URI} from "../config/config";

export const connectDatabase = () => {
    // connect to mongodb
    mongoose.connect(DB_URI)
        .then((result) => {
            console.log("Connected to MongoDB successfully", result.connections.values);
        })
        .catch(error => {
            console.log("There was an error connecting to database ", error);
        });
}


