import { Router } from "express";
import prisma from "../database";
import { formatResponse } from "../utils/responseFormatter";

const router = Router();

router.get("/healthcheck", async (_req, res) => {
    try {
        const response = await prisma.$queryRaw`SELECT 1`;
        res.status(200).json(
            formatResponse(true, response, "The API works well"),
        );
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json(
            formatResponse(false, null, "API no longer works correctly", {
                message: error,
            }),
        );
    }
});

export default router;
