import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { vehiclesRouter } from "./routes/vehicles.js";
import { faqsRouter } from "./routes/faqs.js";
import { testimonialsRouter } from "./routes/testimonials.js";
import { createAuthRouter } from "./routes/auth.js";
import { createBookingsRouter } from "./routes/bookings.js";

const PORT = Number(process.env.PORT ?? 4000);
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/vistarent";
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

if (!JWT_SECRET) {
  console.error("[startup] JWT_SECRET is not set.");
  process.exit(1);
}

async function main() {
  await connectDB(MONGODB_URI);

  const app = express();
  app.use(cors({ origin: CLIENT_ORIGIN }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  // Base route health check
  app.get('/', (req, res) => {
    res.json({ status: "success", message: "Vista Rent API is running smoothly!" });
  });

  app.use("/api/vehicles", vehiclesRouter);
  app.use("/api/faqs", faqsRouter);
  app.use("/api/testimonials", testimonialsRouter);
  app.use("/api/auth", createAuthRouter(JWT_SECRET as string));
  app.use("/api/bookings", createBookingsRouter(JWT_SECRET as string));

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));

  app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[startup] fatal error:", err);
  process.exit(1);
});
