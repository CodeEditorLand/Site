// Shared type definitions for the frontend
// These mirror the types from @codeeditorland/shared

export interface User {
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

export interface Session {
	id: string;
	userId: string;
	token: string;
	expiresAt: string;
	createdAt: string;
}

export interface Download {
	id: string;
	version: string;
	platform: "windows" | "macos" | "linux";
	architecture: "x64" | "arm64" | "x86";
	fileName: string;
	fileSize: number;
	sha256: string;
	pgpSignature?: string;
	downloadCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface DownloadEvent {
	id: string;
	downloadId: string;
	version: string;
	platform: string;
	architecture: string;
	ip: string;
	userAgent?: string;
	country?: string;
	timestamp: string;
}

export interface AnalyticsEvent {
	id: string;
	type: "pageview" | "download" | "click" | "error" | "custom";
	userId?: string;
	sessionId?: string;
	properties: Record<string, unknown>;
	timestamp: string;
}

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	total: number;
	page: number;
	limit: number;
	hasMore: boolean;
}

// GitHub API types
export interface GitHubCommit {
	sha: string;
	commit: {
		author: {
			name: string;
			email: string;
			date: string;
		};
		message: string;
		url: string;
	};
	author?: {
		login: string;
		id: number;
		avatar_url: string;
		url: string;
	};
	url: string;
}

export interface GitHubActionRun {
	id: number;
	name: string;
	status: string;
	conclusion?: string;
	created_at: string;
	updated_at: string;
	html_url: string;
	actor: {
		login: string;
		id: number;
		avatar_url: string;
	};
	repository: {
		name: string;
		full_name: string;
		html_url: string;
	};
	workflow_id: number;
	head_branch: string;
	head_sha: string;
}

export interface GitHubIssue {
	id: number;
	number: number;
	title: string;
	state: 'open' | 'closed';
	user: {
		login: string;
		id: number;
		avatar_url: string;
		url: string;
	};
	created_at: string;
	updated_at: string;
	html_url: string;
	body?: string;
	comments: number;
	labels: Array<{
		id: number;
		name: string;
		color: string;
	}>;
}
