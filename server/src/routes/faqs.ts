import { Router } from "express";
import { listFaqs } from "../controllers/faqs.controller.js";

export const faqsRouter = Router();

faqsRouter.get("/", listFaqs);
