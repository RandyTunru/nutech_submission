import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import { validateSchema } from "../middleware/validate-schema";
import { updateProfileSchema } from "../schemas/profile.schema";
import { getProfileController, updateProfileController, updateProfileImageController } from "../controllers/profile.controller";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

router.use(validateToken);

router.get("/profile", getProfileController);
router.put("/profile/update", validateSchema(updateProfileSchema), updateProfileController);
router.put("/profile/image", upload.single("file"), updateProfileImageController);

export default router;