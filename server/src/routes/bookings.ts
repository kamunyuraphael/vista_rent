import { Router } from "express";
import { BookingModel } from "../models/Booking.js";
import { VehicleModel } from "../models/Vehicle.js";
import { attachUserIfPresent } from "../middleware/auth.js";

export function createBookingsRouter(jwtSecret: string) {
  const router = Router();
  router.use(attachUserIfPresent(jwtSecret));

  // POST /api/bookings — create a reservation. Works for guests and signed-in users.
  router.post("/", async (req, res) => {
    const { vehicleId, fullName, email, phone, pickupLocation, pickupDate, returnDate, notes } =
      req.body ?? {};

    if (!vehicleId || !fullName || !email || !phone || !pickupLocation || !pickupDate || !returnDate) {
      return res.status(400).json({
        error:
          "vehicleId, fullName, email, phone, pickupLocation, pickupDate, and returnDate are required",
      });
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    if (!vehicle.available) return res.status(409).json({ error: "Vehicle is not currently available" });

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return res.status(400).json({ error: "returnDate must be a valid date after pickupDate" });
    }

    // Reject overlapping bookings for the same vehicle (ignoring cancelled ones).
    const overlap = await BookingModel.findOne({
      vehicle: vehicle._id,
      status: { $ne: "cancelled" },
      pickupDate: { $lt: end },
      returnDate: { $gt: start },
    });
    if (overlap) {
      return res.status(409).json({ error: "This vehicle is already booked for part of that date range" });
    }

    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const totalPrice = days * vehicle.price;

    const booking = await BookingModel.create({
      vehicle: vehicle._id,
      user: req.user?.sub ?? null,
      fullName,
      email,
      phone,
      pickupLocation,
      pickupDate: start,
      returnDate: end,
      totalPrice,
      notes,
    });

    res.status(201).json(booking);
  });

  // GET /api/bookings/mine — signed-in user's own bookings.
  router.get("/mine", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Sign in to view your bookings" });
    const bookings = await BookingModel.find({ user: req.user.sub })
      .sort({ createdAt: -1 })
      .populate("vehicle");
    res.json(bookings);
  });

  return router;
}
