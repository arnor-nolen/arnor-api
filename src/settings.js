import dotenv from "dotenv";

dotenv.config();

// GitHub credentials
export const GITHUB_URL = process.env.GITHUB_URL;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// Application port
export const PORT = process.env.PORT || 3000;
