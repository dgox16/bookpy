import express from "express";
import prisma from "./database";
import { env } from "./config/env";
import router from "./router";

const app = express();

const main = async () => {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.use(express.json());
    const morgan = require("morgan");
    app.use(morgan("dev"));

    app.use(router);

    app.listen(env.port, () => {
        console.log(`🚀 Server is listening on port ${env.port}`);
    });
};

main().catch(async (err) => {
    console.error("❌ Failed to start:", err);
    prisma.$disconnect();
    process.exit(1);
});
