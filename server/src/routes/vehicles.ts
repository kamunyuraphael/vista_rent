import { Router } from "express";
import { VehicleModel } from "../models/Vehicle.js";

export const vehiclesRouter = Router();

// GET /api/vehicles?category=suv
vehiclesRouter.get("/", async (req, res) => {
  const { category } = req.query;
  const filter: Record<string, unknown> = {};

  if (typeof category === "string" && category !== "all") {
    filter.category = category;
  }

  const vehicles = await VehicleModel.find(filter).sort({ createdAt: -1 });
  res.json(vehicles);
});

// GET /api/vehicles/:id
vehiclesRouter.get("/:id", async (req, res) => {
  const vehicle = await VehicleModel.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
  res.json(vehicle);
});
