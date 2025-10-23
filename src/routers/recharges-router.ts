import { Router } from "express";
import { createRecharge, listByNumber } from "../controllers/recharges-controller";
import { validateSchema } from "../middlewares/validate-schema";
import { createRechargeSchema } from "../schemas/recharges-schema";

const router = Router();

router.post("/", validateSchema(createRechargeSchema), createRecharge);
router.get("/:number", listByNumber);

export default router;
