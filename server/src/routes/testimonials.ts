import { Router } from "express";
import { TestimonialModel } from "../models/Testimonial.js";

export const testimonialsRouter = Router();

// GET /api/testimonials
testimonialsRouter.get("/", async (_req, res) => {
  const testimonials = await TestimonialModel.find().sort({ createdAt: 1 });
  res.json(testimonials);
});
