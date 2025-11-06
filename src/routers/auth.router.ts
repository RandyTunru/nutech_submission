import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller";
import { validateSchema } from "../middleware/validate-schema";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/registration", validateSchema(registerSchema), registerController);
router.post("/login", validateSchema(loginSchema), loginController);

export default router;
