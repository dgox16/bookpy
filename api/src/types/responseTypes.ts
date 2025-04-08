export interface ApiResponse<T> {
	status: "success" | "error";
	data: T | null;
	message: string;
	error: object | null;
}
