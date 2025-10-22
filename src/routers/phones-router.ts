import { Router } from "express";
import { createPhone, listPhones } from "../controllers/phones-controller";
import { validateSchema } from "../middlewares/validate-schema";
import { createPhoneSchema } from "../schemas/phones-schema";

const router = Router();

router.post("/", validateSchema(createPhoneSchema), createPhone);
router.get("/:document", listPhones);

export default router;
