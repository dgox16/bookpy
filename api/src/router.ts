import { Router } from "express";
import healthRoutes from "./routes/healthRoutes";
import authorRoutes from "./routes/authorRoutes";

const router = Router();

router.use(healthRoutes);
router.use("/authors", authorRoutes);

export default router;
