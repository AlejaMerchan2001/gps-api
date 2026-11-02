import { Router } from "express";
import demoRoutes from "../../modules/demo/demo.routes";
import gpsRoutes from "../../modules/gps/gps.routes";

const router = Router();

router.use("/demo", demoRoutes);
router.use("/location", gpsRoutes);

export default router;
