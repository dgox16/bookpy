import { Router } from "express";
import healthRoutes from "./routes/healthcheck";

const router = Router();

router.use(healthRoutes);

export default router;
