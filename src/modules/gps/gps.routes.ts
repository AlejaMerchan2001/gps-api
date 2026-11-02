import { Router } from "express";
import { GpsController } from "./gps.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const gpsController = new GpsController();

router.post("/", asyncHandler(gpsController.create));
router.get("/", asyncHandler(gpsController.findAll));
router.get("/:id", asyncHandler(gpsController.findById));
router.put("/:id", asyncHandler(gpsController.update));
router.delete("/:id", asyncHandler(gpsController.delete));

export default router;
