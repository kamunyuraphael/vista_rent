import { Schema, model, type InferSchemaType } from "mongoose";

const vehicleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["luxury", "saloon", "suv", "vans"],
    },
    price: { type: Number, required: true, min: 0 }, // KES per day
    seats: { type: Number, required: true, min: 1 },
    transmission: { type: String, required: true },
    engine: { type: String, required: true },
    luggage: { type: String, required: true },
    badge: { type: String, default: null },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type Vehicle = InferSchemaType<typeof vehicleSchema>;
export const VehicleModel = model("Vehicle", vehicleSchema);
