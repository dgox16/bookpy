import express from "express";
import { env } from "./config/env";

const app = express();

const main = async () => {
	app.use(express.json());

	app.listen(env.port, () => {
		console.log(`Server is listening on port ${env.port} ⚡`);
	});
};

main();
