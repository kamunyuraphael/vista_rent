import type { Request, Response } from "express";
import { FaqModel } from "../models/Faq.js";

// GET /api/faqs
export async function listFaqs(_req: Request, res: Response) {
  const faqs = await FaqModel.find().sort({ order: 1, createdAt: 1 });
  res.json(faqs);
}
