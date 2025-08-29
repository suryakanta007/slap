import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import {ENV} from "./config/env.js";



dotenv.config();
connectDB()
.then(()=>{
    app.listen(ENV.PORT,()=>{
        console.log(`Server is running on port ${ENV.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection Failed ");
    process.exit(1);
})