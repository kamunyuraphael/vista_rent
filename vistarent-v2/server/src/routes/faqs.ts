import { Router } from "express";
import { FaqModel } from "../models/Faq.js";

export const faqsRouter = Router();

// GET /api/faqs
faqsRouter.get("/", async (_req, res) => {
  const faqs = await FaqModel.find().sort({ order: 1, createdAt: 1 });
  res.json(faqs);
});
