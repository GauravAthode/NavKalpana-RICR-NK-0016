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

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
