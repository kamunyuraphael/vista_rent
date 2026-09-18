import type { Request, Response } from "express";
import { VehicleModel } from "../models/Vehicle.js";

// GET /api/vehicles?category=suv
export async function listVehicles(req: Request, res: Response) {
  const { category } = req.query;
  const filter: Record<string, unknown> = {};

  if (typeof category === "string" && category !== "all") {
    filter.category = category;
  }

  const vehicles = await VehicleModel.find(filter).sort({ createdAt: -1 });
  res.json(vehicles);
}

// GET /api/vehicles/:id
export async function getVehicleById(req: Request, res: Response) {
  const vehicle = await VehicleModel.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
  res.json(vehicle);
}
