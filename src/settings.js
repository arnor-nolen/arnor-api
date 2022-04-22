import dotenv from "dotenv";

dotenv.config();

// GitHub credentials
export const GITHUB_URL = process.env.GITHUB_URL;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
export const MAILGUN_EMAIL = process.env.MAILGUN_EMAIL;

// Application port
export const PORT = process.env.PORT || 3000;
