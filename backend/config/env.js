// config/env.js
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const COHERE_API_KEY = process.env.COHERE_API_KEY
