import type { Request, Response } from "express";
import { TestimonialModel } from "../models/Testimonial.js";

// GET /api/testimonials
export async function listTestimonials(_req: Request, res: Response) {
  const testimonials = await TestimonialModel.find().sort({ createdAt: 1 });
  res.json(testimonials);
}
