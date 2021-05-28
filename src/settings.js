import dotenv from "dotenv";

dotenv.config();

// GitHub credentials
export const GITHUB_URL = process.env.GITHUB_URL;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Application port
export const PORT = process.env.PORT || 3000;
