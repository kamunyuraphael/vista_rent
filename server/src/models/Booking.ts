import { Schema, model, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },

    // Guest bookings are allowed (no account required), so we capture contact
    // details directly on the booking rather than requiring a User.
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    pickupLocation: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },

    totalPrice: { type: Number, required: true, min: 0 }, // KES, computed server-side
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

bookingSchema.index({ vehicle: 1, pickupDate: 1, returnDate: 1 });

export type Booking = InferSchemaType<typeof bookingSchema>;
export const BookingModel = model("Booking", bookingSchema);
