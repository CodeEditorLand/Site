import type {
	AnalyticsEvent,
	ApiResponse,
	Download,
	DownloadEvent,
	GitHubActionRun,
	GitHubCommit,
	GitHubIssue,
	Session,
	User,
} from "./types";

export interface WorkersClient {
	// Auth
	auth: {
		login(
			email: string,
			password: string,
		): Promise<ApiResponse<{ user: User; session: Session }>>;
		register(
			email: string,
			password: string,
			username: string,
			displayName?: string,
		): Promise<
			ApiResponse<{ user: User; session: Session; message?: string }>
		>;
		logout(): Promise<ApiResponse<{ message?: string }>>;
		refresh(
			token: string,
		): Promise<ApiResponse<{ token: string; expiresIn: number }>>;
		verifyEmail(token: string): Promise<ApiResponse<void>>;
		resendVerification(): Promise<ApiResponse<{ message: string }>>;
		forgotPassword(
			email: string,
		): Promise<ApiResponse<{ message: string }>>;
		resetPassword(
			token: string,
			password: string,
		): Promise<ApiResponse<void>>;
		getSession(): Promise<ApiResponse<{ user: User; expiresIn: number }>>;
		oauth(
			provider: "github" | "google" | "gitlab",
		): Promise<{ success: boolean }>;
		handleOAuthCallback(): never;
	};
	// Download
	download: {
		getBinaries(
			platform?: string,
			architecture?: string,
		): Promise<ApiResponse<Download[]>>;
		getVersionList(limit?: number): Promise<ApiResponse<Download[]>>;
		getDownload(id: string): Promise<ApiResponse<Download>>;
		getSha256(id: string): Promise<ApiResponse<{ sha256: string }>>;
		getSignature(id: string): Promise<ApiResponse<{ signature: string }>>;
		getInfo(id: string): Promise<
			ApiResponse<
				Download & {
					downloadUrl: string;
					sha256Url: string;
					signatureUrl: string | null;
				}
			>
		>;
		getByVersion(
			version: string,
			platform?: string,
			architecture?: string,
		): Promise<ApiResponse<Download[]>>;
		getLatest(
			platform?: string,
			architecture?: string,
		): Promise<ApiResponse<Download>>;
		trackDownload(id: string): Promise<ApiResponse<{ eventId: string }>>;
		getAnalytics(
			limit?: number,
			offset?: number,
		): Promise<
			ApiResponse<{
				events: DownloadEvent[];
				stats: {
					total: number;
					byPlatform: Record<string, number>;
					byVersion: Record<string, number>;
				};
			}>
		>;
	};
	// Analytics
	analytics: {
		track(
			type: string,
			properties?: Record<string, unknown>,
		): Promise<ApiResponse<{ eventId: string }>>;
		trackBatch(
			events: Array<{
				type: string;
				userId?: string;
				sessionId?: string;
				properties?: Record<string, unknown>;
			}>,
		): Promise<ApiResponse<{ tracked: number; eventIds: string[] }>>;
		trackPageView(
			path: string,
			title?: string,
			referrer?: string,
		): Promise<ApiResponse<{ eventId: string }>>;
		getEvents(
			type?: string,
			limit?: number,
			offset?: number,
			startDate?: string,
			endDate?: string,
		): Promise<ApiResponse<AnalyticsEvent[]>>;
		getEvent(id: string): Promise<ApiResponse<AnalyticsEvent>>;
		getSummary(
			days?: number,
			type?: string,
		): Promise<
			ApiResponse<{
				totalEvents: number;
				uniqueVisitors: number;
				uniqueSessions: number;
				byType: Record<string, number>;
				byDate: Record<string, number>;
				period: { days: number; start: string; end: string };
			}>
		>;
		getTimeline(
			days?: number,
			type?: string,
		): Promise<
			ApiResponse<
				Array<{
					date: string;
					count: number;
					types: Record<string, number>;
				}>
			>
		>;
		getPageViewStats(
			days?: number,
			limit?: number,
		): Promise<
			ApiResponse<Array<{ path: string; title: string; count: number }>>
		>;
		getEventStats(days?: number): Promise<
			ApiResponse<{
				byType: Record<string, number>;
				byBrowser: Record<string, number>;
				byOS: Record<string, number>;
			}>
		>;
		getSessionStats(days?: number): Promise<
			ApiResponse<{
				totalSessions: number;
				avgEventsPerSession: number;
				sessionsByEventCount: Record<string, number>;
			}>
		>;
	};
	// Status
	status: {
		getOverallStatus(): Promise<
			ApiResponse<{
				status: "operational" | "degraded" | "outage" | "maintenance";
				lastUpdate: string;
				checks: Array<{
					id: string;
					name: string;
					status: string;
					lastChecked: string;
					latency?: number;
					message?: string;
				}>;
			}>
		>;
		getChecks(): Promise<
			ApiResponse<
				Array<{
					id: string;
					name: string;
					status: string;
					lastChecked: string;
					latency?: number;
					message?: string;
				}>
			>
		>;
		getCheck(id: string): Promise<
			ApiResponse<{
				id: string;
				name: string;
				status: string;
				lastChecked: string;
				latency?: number;
				message?: string;
			}>
		>;
		getHistory(
			limit?: number,
			checkId?: string,
		): Promise<
			ApiResponse<
				Array<{
					checkId: string;
					status: string;
					timestamp: string;
					message?: string;
				}>
			>
		>;
		getGitHubCommits(
			branch?: string,
			limit?: number,
		): Promise<ApiResponse<GitHubCommit[]>>;
		getGitHubActions(
			limit?: number,
		): Promise<ApiResponse<GitHubActionRun[]>>;
		getGitHubIssues(
			state?: string,
			limit?: number,
		): Promise<ApiResponse<GitHubIssue[]>>;
	};
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function withRetry<T>(
	fn: () => Promise<ApiResponse<T>>,
	retries = MAX_RETRIES,
): Promise<ApiResponse<T>> {
	return fn().catch(async (error: Error) => {
		if (retries > 0) {
			console.warn(
				`Retrying request... (${retries} retries left)`,
				error.message,
			);
			await delay(RETRY_DELAY);
			return withRetry(fn, retries - 1);
		}
		return { success: false, error: error.message };
	});
}

function getAuthToken(): string | null {
	try {
		const cookies = document.cookie.split(";");
		const sessionCookie = cookies.find((c) =>
			c.trim().startsWith("session="),
		);
		if (sessionCookie) {
			const token = sessionCookie.split("=")[1];
			return token ?? null;
		}
	} catch {
		// Cookie API not available during SSR
	}
	return localStorage.getItem("session_token");
}

function setAuthToken(token: string): void {
	try {
		document.cookie = `session=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.setItem("session_token", token);
}

function clearAuthToken(): void {
	try {
		document.cookie = "session=; path=/; max-age=0";
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.removeItem("session_token");
}

function createWorkerClient(baseUrl: string): Partial<WorkersClient> {
	const fetchWithAuth = async <T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<ApiResponse<T>> => {
		const token = getAuthToken();
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options.headers as Record<string, string>),
		};

		const response = await fetch(`${baseUrl}${endpoint}`, {
			...options,
			headers,
		});

		const data = await response
			.json()
			.catch(() => ({ success: false, error: "Invalid response" }));

		if (!response.ok || !data.success) {
			return {
				success: false,
				error: data.error || data.message || `HTTP ${response.status}`,
			};
		}

		return data as ApiResponse<T>;
	};

	return {
		auth: {
			login: (email, password) =>
				withRetry(() =>
					fetchWithAuth<{ user: User; session: Session }>(
						"/auth/login",
						{
							method: "POST",
							body: JSON.stringify({ email, password }),
						},
					),
				),
			register: (email, password, username, displayName) =>
				withRetry(() =>
					fetchWithAuth<{
						user: User;
						session: Session;
						message?: string;
					}>("/auth/register", {
						method: "POST",
						body: JSON.stringify({
							email,
							password,
							username,
							displayName,
						}),
					}),
				),
			logout: () =>
				withRetry(() =>
					fetchWithAuth("/auth/logout", { method: "POST" }),
				),
			refresh: (token) =>
				withRetry(() =>
					fetchWithAuth<{ token: string; expiresIn: number }>(
						"/auth/refresh",
						{
							method: "POST",
							headers: { Authorization: `Bearer ${token}` },
						},
					),
				),
			verifyEmail: (token) =>
				withRetry(() =>
					fetchWithAuth<void>(`/auth/verify-email/${token}`, {
						method: "GET",
					}),
				),
			resendVerification: () =>
				withRetry(() =>
					fetchWithAuth("/auth/resend-verification", {
						method: "POST",
					}),
				),
			forgotPassword: (email) =>
				withRetry(() =>
					fetchWithAuth<{ message: string }>(
						"/auth/forgot-password",
						{
							method: "POST",
							body: JSON.stringify({ email }),
						},
					),
				),
			resetPassword: (token, password) =>
				withRetry(() =>
					fetchWithAuth<void>(`/auth/reset-password/${token}`, {
						method: "POST",
						body: JSON.stringify({ password }),
					}),
				),
			getSession: () =>
				withRetry(() =>
					fetchWithAuth<{ user: User; expiresIn: number }>(
						"/auth/session",
					),
				),
			oauth: (provider) => {
				const url = `${baseUrl}/auth/oauth/${provider}`;
				window.location.href = url;
				return Promise.resolve({ success: true });
			},
			// Note: handleOAuthCallback is intentionally NOT implemented as a fetch call
			// The OAuth callback endpoint returns a 302 redirect to the frontend with token in URL
			// Frontend should extract token from URL query parameters on the redirect landing page
			handleOAuthCallback: () => {
				throw new Error(
					"handleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter.",
				);
			},
		},
		download: {
			getBinaries: (platform, architecture) => {
				const params = new URLSearchParams();
				if (platform) params.append("platform", platform);
				if (architecture) params.append("architecture", architecture);
				const query = params.toString();
				return withRetry(() =>
					fetchWithAuth<Download[]>(
						`/downloads${query ? `?${query}` : ""}`,
					),
				);
			},
			getVersionList: (limit) => {
				const query = limit ? `?limit=${limit}` : "";
				return withRetry(() =>
					fetchWithAuth<Download[]>(`/downloads${query}`),
				);
			},
			getDownload: (id) =>
				withRetry(() => fetchWithAuth<Download>(`/downloads/${id}`)),
			getSha256: (id) =>
				withRetry(() =>
					fetchWithAuth<{ sha256: string }>(
						`/downloads/${id}/sha256`,
					),
				),
			getSignature: (id) =>
				withRetry(() =>
					fetchWithAuth<{ signature: string }>(
						`/downloads/${id}/signature`,
					),
				),
			getInfo: (id) =>
				withRetry(() =>
					fetchWithAuth<
						Download & {
							downloadUrl: string;
							sha256Url: string;
							signatureUrl: string | null;
						}
					>(`/downloads/${id}/info`),
				),
			getByVersion: (version, platform, architecture) => {
				const params = new URLSearchParams();
				if (platform) params.append("platform", platform);
				if (architecture) params.append("architecture", architecture);
				const query = params.toString();
				return withRetry(() =>
					fetchWithAuth<Download[]>(
						`/downloads/version/${version}${query ? `?${query}` : ""}`,
					),
				);
			},
			getLatest: (platform, architecture) => {
				const params = new URLSearchParams();
				if (platform) params.append("platform", platform);
				if (architecture) params.append("architecture", architecture);
				const query = params.toString();
				return withRetry(() =>
					fetchWithAuth<Download>(
						`/downloads/latest${query ? `?${query}` : ""}`,
					),
				);
			},
			trackDownload: (id) =>
				withRetry(() =>
					fetchWithAuth<{ eventId: string }>(
						`/downloads/${id}/track`,
						{ method: "POST" },
					),
				),
			getAnalytics: (limit, offset) => {
				const params = new URLSearchParams();
				if (limit) params.append("limit", limit.toString());
				if (offset) params.append("offset", offset.toString());
				const query = params.toString();
				return withRetry(() =>
					fetchWithAuth<{
						events: DownloadEvent[];
						stats: {
							total: number;
							byPlatform: Record<string, number>;
							byVersion: Record<string, number>;
						};
					}>(`/analytics/downloads${query ? `?${query}` : ""}`),
				);
			},
		},
		analytics: {
			track: (type, properties = {}) =>
				withRetry(() =>
					fetchWithAuth<{ eventId: string }>("/track", {
						method: "POST",
						body: JSON.stringify({ type, properties }),
					}),
				),
			trackBatch: (events) =>
				withRetry(() =>
					fetchWithAuth<{ tracked: number; eventIds: string[] }>(
						"/track/batch",
						{
							method: "POST",
							body: JSON.stringify({ events }),
						},
					),
				),
			trackPageView: (path, title, referrer) =>
				withRetry(() =>
					fetchWithAuth<{ eventId: string }>("/pageview", {
						method: "POST",
						body: JSON.stringify({ path, title, referrer }),
					}),
				),
			getEvents: (type, limit, offset, startDate, endDate) => {
				const params = new URLSearchParams();
				if (type) params.append("type", type);
				if (limit) params.append("limit", limit.toString());
				if (offset) params.append("offset", offset.toString());
				if (startDate) params.append("start", startDate);
				if (endDate) params.append("end", endDate);
				return withRetry(() =>
					fetchWithAuth<AnalyticsEvent[]>(
						`/events?${params.toString()}`,
					),
				);
			},
			getEvent: (id) =>
				withRetry(() => fetchWithAuth<AnalyticsEvent>(`/events/${id}`)),
			getSummary: (days, type) => {
				const params = new URLSearchParams();
				if (days) params.append("days", days.toString());
				if (type) params.append("type", type);
				return withRetry(() =>
					fetchWithAuth<{
						totalEvents: number;
						uniqueVisitors: number;
						uniqueSessions: number;
						byType: Record<string, number>;
						byDate: Record<string, number>;
						period: { days: number; start: string; end: string };
					}>(`/summary?${params.toString()}`),
				);
			},
			getTimeline: (days, type) => {
				const params = new URLSearchParams();
				if (days) params.append("days", days.toString());
				if (type) params.append("type", type);
				return withRetry(() =>
					fetchWithAuth<
						Array<{
							date: string;
							count: number;
							types: Record<string, number>;
						}>
					>(`/timeline?${params.toString()}`),
				);
			},
			getPageViewStats: (days, limit) => {
				const params = new URLSearchParams();
				if (days) params.append("days", days.toString());
				if (limit) params.append("limit", limit.toString());
				return withRetry(() =>
					fetchWithAuth<
						Array<{ path: string; title: string; count: number }>
					>(`/stats/pageviews?${params.toString()}`),
				);
			},
			getEventStats: (days) => {
				const params = new URLSearchParams();
				if (days) params.append("days", days.toString());
				return withRetry(() =>
					fetchWithAuth<{
						byType: Record<string, number>;
						byBrowser: Record<string, number>;
						byOS: Record<string, number>;
					}>(`/stats/events?${params.toString()}`),
				);
			},
			getSessionStats: (days) => {
				const params = new URLSearchParams();
				if (days) params.append("days", days.toString());
				return withRetry(() =>
					fetchWithAuth<{
						totalSessions: number;
						avgEventsPerSession: number;
						sessionsByEventCount: Record<string, number>;
					}>(`/stats/sessions?${params.toString()}`),
				);
			},
		},
		status: {
			getOverallStatus: () =>
				withRetry(() =>
					fetchWithAuth<{
						status:
							| "operational"
							| "degraded"
							| "outage"
							| "maintenance";
						lastUpdate: string;
						checks: Array<{
							id: string;
							name: string;
							status: string;
							lastChecked: string;
							latency?: number;
							message?: string;
						}>;
					}>("/status"),
				),
			getChecks: () =>
				withRetry(() =>
					fetchWithAuth<
						Array<{
							id: string;
							name: string;
							status: string;
							lastChecked: string;
							latency?: number;
							message?: string;
						}>
					>("/status/checks"),
				),
			getCheck: (id) =>
				withRetry(() =>
					fetchWithAuth<{
						id: string;
						name: string;
						status: string;
						lastChecked: string;
						latency?: number;
						message?: string;
					}>(`/status/checks/${id}`),
				),
			getHistory: (limit, checkId) => {
				const params = new URLSearchParams();
				if (limit) params.append("limit", limit.toString());
				if (checkId) params.append("checkId", checkId);
				return withRetry(() =>
					fetchWithAuth<
						Array<{
							checkId: string;
							status: string;
							timestamp: string;
							message?: string;
						}>
					>(`/status/history?${params.toString()}`),
				);
			},
			getGitHubCommits: (branch, limit) => {
				const params = new URLSearchParams();
				if (branch) params.append("branch", branch);
				if (limit) params.append("limit", limit.toString());
				return withRetry(() =>
					fetchWithAuth<GitHubCommit[]>(
						`/status/github/commits?${params.toString()}`,
					),
				);
			},
			getGitHubActions: (limit) => {
				const params = new URLSearchParams();
				if (limit) params.append("limit", limit.toString());
				return withRetry(() =>
					fetchWithAuth<GitHubActionRun[]>(
						`/status/github/actions?${params.toString()}`,
					),
				);
			},
			getGitHubIssues: (state, limit) => {
				const params = new URLSearchParams();
				if (state) params.append("state", state);
				if (limit) params.append("limit", limit.toString());
				return withRetry(() =>
					fetchWithAuth<GitHubIssue[]>(
						`/status/github/issues?${params.toString()}`,
					),
				);
			},
		},
	};
}

let clientInstance: WorkersClient | null = null;

export function getWorkersClient(): WorkersClient {
	if (clientInstance) {
		return clientInstance;
	}

	const authUrl = import.meta.env.PUBLIC_AUTH_WORKER_URL;
	const downloadUrl = import.meta.env.PUBLIC_DOWNLOAD_WORKER_URL;
	const analyticsUrl = import.meta.env.PUBLIC_ANALYTICS_WORKER_URL;
	const frontendUrl = import.meta.env.PUBLIC_FRONTEND_URL;

	if (!authUrl || !downloadUrl || !analyticsUrl) {
		// During SSG pre-rendering, env vars may not be available.
		// Return a no-op client that returns error responses instead of throwing.
		const noopResponse = { success: false as const, error: "Worker URLs not configured" };
		const noop = () => Promise.resolve(noopResponse);
		const noopHandler = new Proxy({} as WorkersClient, {
			get: () => new Proxy({}, { get: () => noop }),
		});
		clientInstance = noopHandler;
		return clientInstance;
	}

	clientInstance = {
		auth: createWorkerClient(authUrl).auth as WorkersClient["auth"],
		download: createWorkerClient(downloadUrl)
			.download as WorkersClient["download"],
		analytics: createWorkerClient(analyticsUrl)
			.analytics as WorkersClient["analytics"],
		status: analyticsUrl
			? (createWorkerClient(analyticsUrl)
					.status as WorkersClient["status"])
			: (undefined as any),
	} as WorkersClient;

	return clientInstance;
}

export function clearWorkersClient(): void {
	clientInstance = null;
}
