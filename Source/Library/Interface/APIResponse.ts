export default interface APIResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}
