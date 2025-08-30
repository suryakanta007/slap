import express from 'express'
import {clerkMiddleware} from "@clerk/express";
import {serve} from "inngest/express";
import { functions,inngest } from './config/inngest.js';

const app = express();

app.get("/", (req, res) => {
    res.send("hello 123")
})


app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));




export default app