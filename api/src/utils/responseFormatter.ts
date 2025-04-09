import type { ApiResponse } from "../types/responseTypes";

export function formatResponse<T>(
    status: boolean,
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
