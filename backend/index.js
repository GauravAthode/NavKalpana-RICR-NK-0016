import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./src/config/db.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => res.json({ status: "ok" }));


app.use("/api/trips", tripRoutes);
app.use("/api/contact", contactRoutes);

