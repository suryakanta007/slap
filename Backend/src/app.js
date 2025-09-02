import express from 'express'
import {clerkMiddleware} from "@clerk/express";
import {serve} from "inngest/express";
import { functions,inngest } from './config/inngest.js';
import chatRoutes from "./routes/chat.route.js";

const app = express();

app.get("/", (req, res) => {
    res.send("hello 123")
})

app.get("/debug-sentry",(req,res)=>{
    throw new Error("my first sentry error")
})


app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat",chatRoutes);




export default app