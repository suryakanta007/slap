import mongoose from "mongoose";
import { ENV } from "../config/env.js";

const connectDB = async () =>{
    try {
       
        
        await mongoose.connect(ENV.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("mongoDB connection Failed ");
        process.exit(1);
    }
}

export default connectDB