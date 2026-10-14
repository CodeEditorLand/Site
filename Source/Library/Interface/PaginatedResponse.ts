import type APIResponse from "./APIResponse.js";

export default interface PaginatedResponse<T> extends APIResponse<T[]> {
	total: number;

	page: number;

	limit: number;

	hasMore: boolean;
}
