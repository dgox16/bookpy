import { z } from "zod";

export const authorCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthDate: z.coerce.date().optional(),
    nationalityCode: z.string().optional(),
    biography: z.string().optional(),
});

export const authorUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    birthDate: z.coerce.date().optional(),
    nationalityCode: z.string().optional(),
    biography: z.string().optional(),
});
