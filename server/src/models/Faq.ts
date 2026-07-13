import { Schema, model, type InferSchemaType } from "mongoose";

const faqSchema = new Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Faq = InferSchemaType<typeof faqSchema>;
export const FaqModel = model("Faq", faqSchema);
