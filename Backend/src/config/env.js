import dotenv from "dotenv";

dotenv.config();


export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STREAM_API_SECRET:process.env.STREAM_API_SECRET,
    SENTRY_DSN:process.env.SENTRY_DSN,
    INGEST_EVENT_KEY:process.env.INGEST_EVENT_KEY,
    INGEST_SIGNIN_KEY:process.env.INGEST_SIGNIN_KEY,
}