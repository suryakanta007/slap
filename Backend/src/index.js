import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import {ENV} from "./config/env.js";




dotenv.config();


const startServer = async ()=>{
    try {
        await connectDB();
        if(ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT,()=>{
                console.log("Server started on port:" , ENV.PORT)
            })
        }
    } catch (error) {
        console.log("Error starting server :",error);
        process.exit(1);
    }
}

startServer();

export default app ; 