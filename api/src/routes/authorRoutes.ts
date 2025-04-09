import { Router } from "express";
import {
    createAuthor,
    deleteAuthor,
    getAuthor,
    getAuthors,
    updateAuthor,
} from "../controllers/authorControllers";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
