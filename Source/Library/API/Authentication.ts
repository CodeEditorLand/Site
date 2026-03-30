import type Session from "../Interface/Session.js";
import type User from "../Interface/User.js";
import { GetWorkersClient } from "../WorkerClient";

/**
 * Authentication API adapter
 * Provides clean, type-safe interface for auth operations
 */
export class AuthAPI {
	private Workers = GetWorkersClient();

	async Login(
		Email: string,
		Password: string,
	): Promise<{ user: User; session: Session }> {
		const Response = await this.Workers.Authentication.Login(
			Email,
			Password,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Login failed");
		}
		return Response.data;
	}

	async Register(
		Email: string,
		Password: string,
		Username: string,
		DisplayName?: string,
	): Promise<{ user: User; session: Session }> {
		const Response = await this.Workers.Authentication.Register(
			Email,
			Password,
			Username,
			DisplayName,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Registration failed");
		}
		return Response.data;
	}

	async Logout(): Promise<void> {
		const Response = await this.Workers.Authentication.Logout();
		if (!Response.success) {
			throw new Error(Response.error || "Logout failed");
		}
	}

	async Refresh(
		Token: string,
	): Promise<{ token: string; expiresIn: number }> {
		const Response = await this.Workers.Authentication.Refresh(Token);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Token refresh failed");
		}
		return Response.data;
	}

	async VerifyEmail(Token: string): Promise<void> {
		const Response = await this.Workers.Authentication.VerifyEmail(Token);
		if (!Response.success) {
			throw new Error(Response.error || "Email verification failed");
		}
	}

	async ResendVerification(): Promise<void> {
		const Response =
			await this.Workers.Authentication.ResendVerification();
		if (!Response.success) {
			throw new Error(
				Response.error || "Failed to resend verification email",
			);
		}
	}

	async ForgotPassword(Email: string): Promise<{ message: string }> {
		const Response =
			await this.Workers.Authentication.ForgotPassword(Email);
		if (!Response.success || !Response.data) {
			throw new Error(
				Response.error || "Password reset request failed",
			);
		}
		return Response.data;
	}

	async ResetPassword(Token: string, Password: string): Promise<void> {
		const Response = await this.Workers.Authentication.ResetPassword(
			Token,
			Password,
		);
		if (!Response.success) {
			throw new Error(Response.error || "Password reset failed");
		}
	}

	async GetSession(): Promise<{ user: User; expiresIn: number }> {
		const Response = await this.Workers.Authentication.GetSession();
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to get session");
		}
		return Response.data;
	}

	async OAuth(
		Provider: "github" | "google" | "gitlab",
	): Promise<{ success: boolean }> {
		return await this.Workers.Authentication.OAuth(Provider);
	}
}

export default new AuthAPI();
