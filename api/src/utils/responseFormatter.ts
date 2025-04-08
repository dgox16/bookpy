import type { ApiResponse } from "../types/responseTypes";

export function formatResponse<T>(
    status: "success" | "error",
    data: T | null = null,
    message = "",
    error: object | null = null,
): ApiResponse<T> {
    return {
        status,
        data,
        message,
        error,
    };
}
