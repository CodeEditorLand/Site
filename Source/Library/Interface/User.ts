export default interface User {
	id: string;

	email: string;

	username: string;

	displayName?: string;

	avatarUrl?: string;

	provider: "email" | "github" | "google" | "gitlab";

	providerId?: string;

	emailVerified: boolean;

	createdAt: string;

	updatedAt: string;
}
