import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { vehiclesRouter } from "./routes/vehicles.js";
import { faqsRouter } from "./routes/faqs.js";
import { testimonialsRouter } from "./routes/testimonials.js";
import { leadsRouter } from "./routes/leads.js";

// This server is the content API for the VistaRent marketing site only —
// it serves the vehicle catalog, FAQs, and testimonials shown on the site,
// plus corporate quote enquiries (leads). Bookings, accounts, and admin
// functions live in a separate management system, so there is intentionally
// no auth or bookings API here.

const PORT = Number(process.env.PORT ?? 4000);
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/vistarent";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

async function main() {
  await connectDB(MONGODB_URI);

  const app = express();
  app.use(cors({ origin: CLIENT_ORIGIN }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/vehicles", vehiclesRouter);
  app.use("/api/faqs", faqsRouter);
  app.use("/api/testimonials", testimonialsRouter);
  app.use("/api/leads", leadsRouter);

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));

  app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[startup] fatal error:", err);
  process.exit(1);
});
