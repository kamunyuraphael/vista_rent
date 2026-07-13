import { Schema, model, type InferSchemaType } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export type Testimonial = InferSchemaType<typeof testimonialSchema>;
export const TestimonialModel = model("Testimonial", testimonialSchema);
