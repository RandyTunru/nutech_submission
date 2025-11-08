import { Router } from "express";

import { getBannersController, getServicesController } from "../controllers/information.controller";
import { validateToken } from "../middleware/validate-token";
const router = Router();

router.use(validateToken);

router.get("/banners", getBannersController);
router.get("/services", getServicesController);

export default router;