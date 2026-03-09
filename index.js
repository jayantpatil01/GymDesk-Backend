import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Internal imports
import { testConnection } from "./config/TestConnection.js";
import authRoute from "./route/authRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoute);

/* -------------------- DATABASE CONNECTION -------------------- */

testConnection();

/* -------------------- SERVER START -------------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});