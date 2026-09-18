import { Router } from "express";
import { listTestimonials } from "../controllers/testimonials.controller.js";

export const testimonialsRouter = Router();

testimonialsRouter.get("/", listTestimonials);
