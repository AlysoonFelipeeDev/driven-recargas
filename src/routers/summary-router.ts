import { Router } from "express";
import { getSummary } from "../controllers/summary-controller";

const router = Router();

router.get("/:document", getSummary);

export default router;
