require("dotenv").config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  OMDBAP_KEY: process.env.OMDBAP_KEY,
  JWT_SECRET: process.env.JWT_SECRET
};