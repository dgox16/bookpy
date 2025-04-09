export interface ApiResponse<T> {
    status: boolean;
    data: T | null;
    message: string;
    error: object | null;
}
