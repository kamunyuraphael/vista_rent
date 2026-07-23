import { Schema, model, type InferSchemaType } from "mongoose";

// Captures corporate quote enquiries submitted from the marketing site's
// Services page. This is a simple contact/lead form — not a customer account
// or booking, so it's appropriate to live on this content API.
const leadSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    workEmail: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type Lead = InferSchemaType<typeof leadSchema>;
export const LeadModel = model("Lead", leadSchema);
