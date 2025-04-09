import prisma from "../database";
import { formatResponse } from "../utils/responseFormatter";
import { validateAuthorData } from "../validators/author/authorValidator";
import {
    authorCreateSchema,
    authorUpdateSchema,
} from "../validators/author/AuthorSchemas";
import type { Response, Request } from "express";

export const getAuthors = async (_req: Request, res: Response) => {
    try {
        const authors = await prisma.author.findMany();

        res.status(200).json(formatResponse(true, authors, "Authors saved"));
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, "Server error", {
                message: (error as Error).message,
            }),
        );
    }
};

export const getAuthor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const author = await prisma.author.findUnique({
            where: { id },
            include: {
                books: {
                    include: {
                        stories: true,
                    },
                },
                stories: true,
            },
        });

        res.status(200).json(
            formatResponse(true, author, "Author with books and stories"),
        );
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, "Server error", {
                message: (error as Error).message,
            }),
        );
    }
};

export const createAuthor = async (req: Request, res: Response) => {
    const validation = await validateAuthorData(req.body, authorCreateSchema);
    if (!validation.valid) {
        res.status(400).json(
            formatResponse(false, null, "Validation failed", {
                errors: validation.errors,
            }),
        );
        return;
    }

    try {
        const author = await prisma.author.create({ data: req.body });
        res.status(201).json(formatResponse(true, author, "Author created"));
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, "Server error", {
                message: (error as Error).message,
            }),
        );
    }
};

export const updateAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;

    const validation = await validateAuthorData(req.body, authorUpdateSchema);
    if (!validation.valid) {
        res.status(400).json(
            formatResponse(false, null, "Validation failed", {
                errors: validation.errors,
            }),
        );
        return;
    }

    const existingAuthor = await prisma.author.findUnique({ where: { id } });
    if (!existingAuthor) {
        res.status(404).json(formatResponse(false, null, "Author not found"));
        return;
    }

    try {
        const updatedAuthor = await prisma.author.update({
            where: { id },
            data: req.body,
        });

        res.status(200).json(
            formatResponse(true, updatedAuthor, "Author updated"),
        );
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, "Server error", {
                message: (error as Error).message,
            }),
        );
    }
};

export const deleteAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingAuthor = await prisma.author.findUnique({ where: { id } });
    if (!existingAuthor) {
        res.status(404).json(formatResponse(false, null, "Author not found"));
        return;
    }

    try {
        const deletedAuthor = await prisma.author.delete({
            where: { id },
        });

        res.status(200).json(
            formatResponse(true, deletedAuthor, "Author deleted"),
        );
    } catch (error) {
        res.status(500).json(
            formatResponse(false, null, "Server error", {
                message: (error as Error).message,
            }),
        );
    }
};
