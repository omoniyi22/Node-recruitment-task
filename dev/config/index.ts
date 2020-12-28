import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_MONGO_URI
      : process.env.DEV_MONGO_URI,
  OMDBAP_KEY: process.env.OMDBAP_KEY,
  JWT_SECRET: process.env.JWT_SECRET
};