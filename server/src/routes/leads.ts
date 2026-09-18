import { Router } from "express";
import { createLead } from "../controllers/leads.controller.js";

export const leadsRouter = Router();

leadsRouter.post("/", createLead);
