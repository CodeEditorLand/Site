import type AnalyticsEvent from "./Interface/AnalyticsEvent.js";
import type APIResponse from "./Interface/APIResponse.js";
import type Download from "./Interface/Download.js";
import type DownloadEvent from "./Interface/DownloadEvent.js";
import type GitHubActionRun from "./Interface/GitHubActionRun.js";
import type GitHubCommit from "./Interface/GitHubCommit.js";
import type GitHubIssue from "./Interface/GitHubIssue.js";
import type Session from "./Interface/Session.js";
import type User from "./Interface/User.js";

export interface WorkersClient {
	// Authentication
	Authentication: {
		Login(
			Email: string,
			Password: string,
		): Promise<APIResponse<{ user: User; session: Session }>>;
		Register(
			Email: string,
			Password: string,
			Username: string,
			DisplayName?: string,
		): Promise<
			APIResponse<{ user: User; session: Session; message?: string }>
		>;
		Logout(): Promise<APIResponse<{ message?: string }>>;
		Refresh(
			Token: string,
		): Promise<APIResponse<{ token: string; expiresIn: number }>>;
		VerifyEmail(Token: string): Promise<APIResponse<void>>;
		ResendVerification(): Promise<APIResponse<{ message: string }>>;
		ForgotPassword(
			Email: string,
		): Promise<APIResponse<{ message: string }>>;
		ResetPassword(
			Token: string,
			Password: string,
		): Promise<APIResponse<void>>;
		GetSession(): Promise<APIResponse<{ user: User; expiresIn: number }>>;
		OAuth(
			Provider: "github" | "google" | "gitlab",
		): Promise<{ success: boolean }>;
		HandleOAuthCallback(): never;
	};
	// Download
	Download: {
		GetBinaries(
			Platform?: string,
			Architecture?: string,
		): Promise<APIResponse<Download[]>>;
		GetVersionList(Limit?: number): Promise<APIResponse<Download[]>>;
		GetDownload(Identifier: string): Promise<APIResponse<Download>>;
		GetSHA256(
			Identifier: string,
		): Promise<APIResponse<{ sha256: string }>>;
		GetSignature(
			Identifier: string,
		): Promise<APIResponse<{ signature: string }>>;
		GetInfo(Identifier: string): Promise<
			APIResponse<
				Download & {
					downloadUrl: string;
					sha256Url: string;
					signatureUrl: string | null;
				}
			>
		>;
		GetByVersion(
			Version: string,
			Platform?: string,
			Architecture?: string,
		): Promise<APIResponse<Download[]>>;
		GetLatest(
			Platform?: string,
			Architecture?: string,
		): Promise<APIResponse<Download>>;
		TrackDownload(
			Identifier: string,
		): Promise<APIResponse<{ eventId: string }>>;
		GetAnalytics(
			Limit?: number,
			Offset?: number,
		): Promise<
			APIResponse<{
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
	Analytics: {
		Track(
			Type: string,
			Properties?: Record<string, unknown>,
		): Promise<APIResponse<{ eventId: string }>>;
		TrackBatch(
			Events: Array<{
				type: string;
				userId?: string;
				sessionId?: string;
				properties?: Record<string, unknown>;
			}>,
		): Promise<APIResponse<{ tracked: number; eventIds: string[] }>>;
		TrackPageView(
			Path: string,
			Title?: string,
			Referrer?: string,
		): Promise<APIResponse<{ eventId: string }>>;
		GetEvents(
			Type?: string,
			Limit?: number,
			Offset?: number,
			StartDate?: string,
			EndDate?: string,
		): Promise<APIResponse<AnalyticsEvent[]>>;
		GetEvent(Identifier: string): Promise<APIResponse<AnalyticsEvent>>;
		GetSummary(
			Days?: number,
			Type?: string,
		): Promise<
			APIResponse<{
				totalEvents: number;
				uniqueVisitors: number;
				uniqueSessions: number;
				byType: Record<string, number>;
				byDate: Record<string, number>;
				period: { days: number; start: string; end: string };
			}>
		>;
		GetTimeline(
			Days?: number,
			Type?: string,
		): Promise<
			APIResponse<
				Array<{
					date: string;
					count: number;
					types: Record<string, number>;
				}>
			>
		>;
		GetPageViewStats(
			Days?: number,
			Limit?: number,
		): Promise<
			APIResponse<Array<{ path: string; title: string; count: number }>>
		>;
		GetEventStats(Days?: number): Promise<
			APIResponse<{
				byType: Record<string, number>;
				byBrowser: Record<string, number>;
				byOS: Record<string, number>;
			}>
		>;
		GetSessionStats(Days?: number): Promise<
			APIResponse<{
				totalSessions: number;
				avgEventsPerSession: number;
				sessionsByEventCount: Record<string, number>;
			}>
		>;
	};
	// Status
	Status: {
		GetOverallStatus(): Promise<
			APIResponse<{
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
		GetChecks(): Promise<
			APIResponse<
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
		GetCheck(Identifier: string): Promise<
			APIResponse<{
				id: string;
				name: string;
				status: string;
				lastChecked: string;
				latency?: number;
				message?: string;
			}>
		>;
		GetHistory(
			Limit?: number,
			CheckIdentifier?: string,
		): Promise<
			APIResponse<
				Array<{
					checkId: string;
					status: string;
					timestamp: string;
					message?: string;
				}>
			>
		>;
		GetGitHubCommits(
			Branch?: string,
			Limit?: number,
		): Promise<APIResponse<GitHubCommit[]>>;
		GetGitHubActions(
			Limit?: number,
		): Promise<APIResponse<GitHubActionRun[]>>;
		GetGitHubIssues(
			State?: string,
			Limit?: number,
		): Promise<APIResponse<GitHubIssue[]>>;
	};
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

function Delay(Millisecond: number): Promise<void> {
	return new Promise((Resolve) => setTimeout(Resolve, Millisecond));
}

function WithRetry<T>(
	Function: () => Promise<APIResponse<T>>,
	Retries = MAX_RETRIES,
): Promise<APIResponse<T>> {
	return Function().catch(async (Error: Error) => {
		if (Retries > 0) {
			console.warn(
				`Retrying request... (${Retries} retries left)`,
				Error.message,
			);
			await Delay(RETRY_DELAY);
			return WithRetry(Function, Retries - 1);
		}
		return { success: false, error: Error.message };
	});
}

function GetAuthToken(): string | null {
	try {
		const Cookies = document.cookie.split(";");
		const SessionCookie = Cookies.find((Cookie) =>
			Cookie.trim().startsWith("session="),
		);
		if (SessionCookie) {
			const Token = SessionCookie.split("=")[1];
			return Token ?? null;
		}
	} catch {
		// Cookie API not available during SSR
	}
	return localStorage.getItem("session_token");
}

function SetAuthToken(Token: string): void {
	try {
		document.cookie = `session=${Token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.setItem("session_token", Token);
}

function ClearAuthToken(): void {
	try {
		document.cookie = "session=; path=/; max-age=0";
	} catch {
		// Cookie API not available during SSR
	}
	localStorage.removeItem("session_token");
}

function CreateWorkerClient(BaseURL: string): Partial<WorkersClient> {
	const FetchWithAuthentication = async <T>(
		Endpoint: string,
		Options: RequestInit = {},
	): Promise<APIResponse<T>> => {
		const Token = GetAuthToken();
		const Headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(Token ? { Authorization: `Bearer ${Token}` } : {}),
			...(Options.headers as Record<string, string>),
		};

		const Response = await fetch(`${BaseURL}${Endpoint}`, {
			...Options,
			headers: Headers,
		});

		const Data = await Response.json().catch(() => ({
			success: false,
			error: "Invalid response",
		}));

		if (!Response.ok || !Data.success) {
			return {
				success: false,
				error: Data.error || Data.message || `HTTP ${Response.status}`,
			};
		}

		return Data as APIResponse<T>;
	};

	return {
		Authentication: {
			Login: (Email, Password) =>
				WithRetry(() =>
					FetchWithAuthentication<{ user: User; session: Session }>(
						"/auth/login",
						{
							method: "POST",
							body: JSON.stringify({
								email: Email,
								password: Password,
							}),
						},
					),
				),
			Register: (Email, Password, Username, DisplayName) =>
				WithRetry(() =>
					FetchWithAuthentication<{
						user: User;
						session: Session;
						message?: string;
					}>("/auth/register", {
						method: "POST",
						body: JSON.stringify({
							email: Email,
							password: Password,
							username: Username,
							displayName: DisplayName,
						}),
					}),
				),
			Logout: () =>
				WithRetry(() =>
					FetchWithAuthentication("/auth/logout", { method: "POST" }),
				),
			Refresh: (Token) =>
				WithRetry(() =>
					FetchWithAuthentication<{
						token: string;
						expiresIn: number;
					}>("/auth/refresh", {
						method: "POST",
						headers: { Authorization: `Bearer ${Token}` },
					}),
				),
			VerifyEmail: (Token) =>
				WithRetry(() =>
					FetchWithAuthentication<void>(
						`/auth/verify-email/${Token}`,
						{
							method: "GET",
						},
					),
				),
			ResendVerification: () =>
				WithRetry(() =>
					FetchWithAuthentication("/auth/resend-verification", {
						method: "POST",
					}),
				),
			ForgotPassword: (Email) =>
				WithRetry(() =>
					FetchWithAuthentication<{ message: string }>(
						"/auth/forgot-password",
						{
							method: "POST",
							body: JSON.stringify({ email: Email }),
						},
					),
				),
			ResetPassword: (Token, Password) =>
				WithRetry(() =>
					FetchWithAuthentication<void>(
						`/auth/reset-password/${Token}`,
						{
							method: "POST",
							body: JSON.stringify({ password: Password }),
						},
					),
				),
			GetSession: () =>
				WithRetry(() =>
					FetchWithAuthentication<{
						user: User;
						expiresIn: number;
					}>("/auth/session"),
				),
			OAuth: (Provider) => {
				const URL = `${BaseURL}/auth/oauth/${Provider}`;
				window.location.href = URL;
				return Promise.resolve({ success: true });
			},
			// Note: HandleOAuthCallback is intentionally NOT implemented as a fetch call
			// The OAuth callback endpoint returns a 302 redirect to the frontend with token in URL
			// Frontend should extract token from URL query parameters on the redirect landing page
			HandleOAuthCallback: () => {
				throw new Error(
					"HandleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter.",
				);
			},
		},
		Download: {
			GetBinaries: (Platform, Architecture) => {
				const Params = new URLSearchParams();
				if (Platform) Params.append("platform", Platform);
				if (Architecture)
					Params.append("architecture", Architecture);
				const Query = Params.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(
						`/downloads${Query ? `?${Query}` : ""}`,
					),
				);
			},
			GetVersionList: (Limit) => {
				const Query = Limit ? `?limit=${Limit}` : "";
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(
						`/downloads${Query}`,
					),
				);
			},
			GetDownload: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<Download>(
						`/downloads/${Identifier}`,
					),
				),
			GetSHA256: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<{ sha256: string }>(
						`/downloads/${Identifier}/sha256`,
					),
				),
			GetSignature: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<{ signature: string }>(
						`/downloads/${Identifier}/signature`,
					),
				),
			GetInfo: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<
						Download & {
							downloadUrl: string;
							sha256Url: string;
							signatureUrl: string | null;
						}
					>(`/downloads/${Identifier}/info`),
				),
			GetByVersion: (Version, Platform, Architecture) => {
				const Params = new URLSearchParams();
				if (Platform) Params.append("platform", Platform);
				if (Architecture)
					Params.append("architecture", Architecture);
				const Query = Params.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(
						`/downloads/version/${Version}${Query ? `?${Query}` : ""}`,
					),
				);
			},
			GetLatest: (Platform, Architecture) => {
				const Params = new URLSearchParams();
				if (Platform) Params.append("platform", Platform);
				if (Architecture)
					Params.append("architecture", Architecture);
				const Query = Params.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download>(
						`/downloads/latest${Query ? `?${Query}` : ""}`,
					),
				);
			},
			TrackDownload: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<{ eventId: string }>(
						`/downloads/${Identifier}/track`,
						{ method: "POST" },
					),
				),
			GetAnalytics: (Limit, Offset) => {
				const Params = new URLSearchParams();
				if (Limit) Params.append("limit", Limit.toString());
				if (Offset) Params.append("offset", Offset.toString());
				const Query = Params.toString();
				return WithRetry(() =>
					FetchWithAuthentication<{
						events: DownloadEvent[];
						stats: {
							total: number;
							byPlatform: Record<string, number>;
							byVersion: Record<string, number>;
						};
					}>(
						`/analytics/downloads${Query ? `?${Query}` : ""}`,
					),
				);
			},
		},
		Analytics: {
			Track: (Type, Properties = {}) =>
				WithRetry(() =>
					FetchWithAuthentication<{ eventId: string }>("/track", {
						method: "POST",
						body: JSON.stringify({
							type: Type,
							properties: Properties,
						}),
					}),
				),
			TrackBatch: (Events) =>
				WithRetry(() =>
					FetchWithAuthentication<{
						tracked: number;
						eventIds: string[];
					}>("/track/batch", {
						method: "POST",
						body: JSON.stringify({ events: Events }),
					}),
				),
			TrackPageView: (Path, Title, Referrer) =>
				WithRetry(() =>
					FetchWithAuthentication<{ eventId: string }>("/pageview", {
						method: "POST",
						body: JSON.stringify({
							path: Path,
							title: Title,
							referrer: Referrer,
						}),
					}),
				),
			GetEvents: (Type, Limit, Offset, StartDate, EndDate) => {
				const Params = new URLSearchParams();
				if (Type) Params.append("type", Type);
				if (Limit) Params.append("limit", Limit.toString());
				if (Offset) Params.append("offset", Offset.toString());
				if (StartDate) Params.append("start", StartDate);
				if (EndDate) Params.append("end", EndDate);
				return WithRetry(() =>
					FetchWithAuthentication<AnalyticsEvent[]>(
						`/events?${Params.toString()}`,
					),
				);
			},
			GetEvent: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<AnalyticsEvent>(
						`/events/${Identifier}`,
					),
				),
			GetSummary: (Days, Type) => {
				const Params = new URLSearchParams();
				if (Days) Params.append("days", Days.toString());
				if (Type) Params.append("type", Type);
				return WithRetry(() =>
					FetchWithAuthentication<{
						totalEvents: number;
						uniqueVisitors: number;
						uniqueSessions: number;
						byType: Record<string, number>;
						byDate: Record<string, number>;
						period: {
							days: number;
							start: string;
							end: string;
						};
					}>(`/summary?${Params.toString()}`),
				);
			},
			GetTimeline: (Days, Type) => {
				const Params = new URLSearchParams();
				if (Days) Params.append("days", Days.toString());
				if (Type) Params.append("type", Type);
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							date: string;
							count: number;
							types: Record<string, number>;
						}>
					>(`/timeline?${Params.toString()}`),
				);
			},
			GetPageViewStats: (Days, Limit) => {
				const Params = new URLSearchParams();
				if (Days) Params.append("days", Days.toString());
				if (Limit) Params.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							path: string;
							title: string;
							count: number;
						}>
					>(`/stats/pageviews?${Params.toString()}`),
				);
			},
			GetEventStats: (Days) => {
				const Params = new URLSearchParams();
				if (Days) Params.append("days", Days.toString());
				return WithRetry(() =>
					FetchWithAuthentication<{
						byType: Record<string, number>;
						byBrowser: Record<string, number>;
						byOS: Record<string, number>;
					}>(`/stats/events?${Params.toString()}`),
				);
			},
			GetSessionStats: (Days) => {
				const Params = new URLSearchParams();
				if (Days) Params.append("days", Days.toString());
				return WithRetry(() =>
					FetchWithAuthentication<{
						totalSessions: number;
						avgEventsPerSession: number;
						sessionsByEventCount: Record<string, number>;
					}>(`/stats/sessions?${Params.toString()}`),
				);
			},
		},
		Status: {
			GetOverallStatus: () =>
				WithRetry(() =>
					FetchWithAuthentication<{
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
			GetChecks: () =>
				WithRetry(() =>
					FetchWithAuthentication<
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
			GetCheck: (Identifier) =>
				WithRetry(() =>
					FetchWithAuthentication<{
						id: string;
						name: string;
						status: string;
						lastChecked: string;
						latency?: number;
						message?: string;
					}>(`/status/checks/${Identifier}`),
				),
			GetHistory: (Limit, CheckIdentifier) => {
				const Params = new URLSearchParams();
				if (Limit) Params.append("limit", Limit.toString());
				if (CheckIdentifier)
					Params.append("checkId", CheckIdentifier);
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							checkId: string;
							status: string;
							timestamp: string;
							message?: string;
						}>
					>(`/status/history?${Params.toString()}`),
				);
			},
			GetGitHubCommits: (Branch, Limit) => {
				const Params = new URLSearchParams();
				if (Branch) Params.append("branch", Branch);
				if (Limit) Params.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubCommit[]>(
						`/status/github/commits?${Params.toString()}`,
					),
				);
			},
			GetGitHubActions: (Limit) => {
				const Params = new URLSearchParams();
				if (Limit) Params.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubActionRun[]>(
						`/status/github/actions?${Params.toString()}`,
					),
				);
			},
			GetGitHubIssues: (State, Limit) => {
				const Params = new URLSearchParams();
				if (State) Params.append("state", State);
				if (Limit) Params.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubIssue[]>(
						`/status/github/issues?${Params.toString()}`,
					),
				);
			},
		},
	};
}

let ClientInstance: WorkersClient | null = null;

export function GetWorkersClient(): WorkersClient {
	if (ClientInstance) {
		return ClientInstance;
	}

	const AuthenticationURL = import.meta.env.PUBLIC_AUTH_WORKER_URL;
	const DownloadURL = import.meta.env.PUBLIC_DOWNLOAD_WORKER_URL;
	const AnalyticsURL = import.meta.env.PUBLIC_ANALYTICS_WORKER_URL;
	const FrontendURL = import.meta.env.PUBLIC_FRONTEND_URL;

	if (!AuthenticationURL || !DownloadURL || !AnalyticsURL) {
		// During SSG pre-rendering, env vars may not be available.
		// Return a no-op client that returns error responses instead of throwing.
		const NoopResponse = {
			success: false as const,
			error: "Worker URLs not configured",
		};
		const Noop = () => Promise.resolve(NoopResponse);
		const NoopHandler = new Proxy({} as WorkersClient, {
			get: () => new Proxy({}, { get: () => Noop }),
		});
		ClientInstance = NoopHandler;
		return ClientInstance;
	}

	ClientInstance = {
		Authentication: CreateWorkerClient(AuthenticationURL)
			.Authentication as WorkersClient["Authentication"],
		Download: CreateWorkerClient(DownloadURL)
			.Download as WorkersClient["Download"],
		Analytics: CreateWorkerClient(AnalyticsURL)
			.Analytics as WorkersClient["Analytics"],
		Status: AnalyticsURL
			? (CreateWorkerClient(AnalyticsURL)
					.Status as WorkersClient["Status"])
			: (undefined as any),
	} as WorkersClient;

	return ClientInstance;
}

export function ClearWorkersClient(): void {
	ClientInstance = null;
}
