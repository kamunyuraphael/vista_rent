import { Router } from "express";
import { listVehicles, getVehicleById } from "../controllers/vehicles.controller.js";

export const vehiclesRouter = Router();

vehiclesRouter.get("/", listVehicles);
vehiclesRouter.get("/:id", getVehicleById);
