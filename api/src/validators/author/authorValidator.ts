import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const validateAuthorData = async (
    data: any,
    schema: z.ZodType<any, any>,
) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        return { valid: false, errors: parsed.error.flatten().fieldErrors };
    }

    if (data.nationalityCode) {
        const nationality = await prisma.nationality.findUnique({
            where: { code: data.nationalityCode },
        });

        if (!nationality) {
            return {
                valid: false,
                errors: { nationalityCode: "Nationality code not found" },
            };
        }
    }

    return { valid: true };
};
