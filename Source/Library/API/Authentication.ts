import type Session from "../Interface/Session.js";
import type User from "../Interface/User.js";
import { getWorkersClient } from "../WorkerClient";

/**
 * Authentication API adapter
 * Provides clean, type-safe interface for auth operations
 */
export class AuthAPI {
	private workers = getWorkersClient();

	async login(
		email: string,
		password: string,
	): Promise<{ user: User; session: Session }> {
		const response = await this.workers.auth.login(email, password);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Login failed");
		}
		return response.data;
	}

	async register(
		email: string,
		password: string,
		username: string,
		displayName?: string,
	): Promise<{ user: User; session: Session }> {
		const response = await this.workers.auth.register(
			email,
			password,
			username,
			displayName,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Registration failed");
		}
		return response.data;
	}

	async logout(): Promise<void> {
		const response = await this.workers.auth.logout();
		if (!response.success) {
			throw new Error(response.error || "Logout failed");
		}
	}

	async refresh(
		token: string,
	): Promise<{ token: string; expiresIn: number }> {
		const response = await this.workers.auth.refresh(token);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Token refresh failed");
		}
		return response.data;
	}

	async verifyEmail(token: string): Promise<void> {
		const response = await this.workers.auth.verifyEmail(token);
		if (!response.success) {
			throw new Error(response.error || "Email verification failed");
		}
	}

	async resendVerification(): Promise<void> {
		const response = await this.workers.auth.resendVerification();
		if (!response.success) {
			throw new Error(
				response.error || "Failed to resend verification email",
			);
		}
	}

	async forgotPassword(email: string): Promise<{ message: string }> {
		const response = await this.workers.auth.forgotPassword(email);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Password reset request failed");
		}
		return response.data;
	}

	async resetPassword(token: string, password: string): Promise<void> {
		const response = await this.workers.auth.resetPassword(token, password);
		if (!response.success) {
			throw new Error(response.error || "Password reset failed");
		}
	}

	async getSession(): Promise<{ user: User; expiresIn: number }> {
		const response = await this.workers.auth.getSession();
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to get session");
		}
		return response.data;
	}

	async oauth(
		provider: "github" | "google" | "gitlab",
	): Promise<{ success: boolean }> {
		return await this.workers.auth.oauth(provider);
	}
}

export const authAPI = new AuthAPI();
