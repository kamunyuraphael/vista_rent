import { Router } from "express";
import { LeadModel } from "../models/Lead.js";

export const leadsRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/leads — submit a corporate quote enquiry from the Services page.
leadsRouter.post("/", async (req, res) => {
  const { companyName, contactName, workEmail, phone, message } = req.body ?? {};

  if (!companyName || !contactName || !workEmail || !phone) {
    return res.status(400).json({
      error: "companyName, contactName, workEmail, and phone are required",
    });
  }
  if (typeof workEmail !== "string" || !EMAIL_RE.test(workEmail)) {
    return res.status(400).json({ error: "workEmail must be a valid email address" });
  }

  const lead = await LeadModel.create({ companyName, contactName, workEmail, phone, message });
  res.status(201).json({ id: lead.id });
});
