/**
 * WorkerClient - typed HTTP client for all Cloudflare Worker APIs.
 *
 * Handles auth (JWT Bearer), analytics, downloads, status, and GitHub
 * integration. Localhost detection enables local dev tokens without a
 * real auth flow.
 *
 * Each method returns `APIResponse<T>` for consistent error handling.
 */

import type AnalyticsEvent from "./Interface/AnalyticsEvent.js";
import type APIResponse from "./Interface/APIResponse.js";
import type Download from "./Interface/Download.js";
import type DownloadEvent from "./Interface/DownloadEvent.js";
import type GitHubActionRun from "./Interface/GitHubActionRun.js";
import type GitHubCommit from "./Interface/GitHubCommit.js";
import type GitHubIssue from "./Interface/GitHubIssue.js";
import type Session from "./Interface/Session.js";
import type User from "./Interface/User.js";

const IsLocalhost = (): boolean => {
	try {
		return (
			typeof window !== "undefined" &&
			(window.location.hostname === "localhost" ||
				window.location.hostname === "127.0.0.1")
		);
	} catch {
		return false;
	}
};

const LocalDevToken = async (): Promise<{
	Token: string;
	ExpiresAt: number;
	UserId: string;
} | null> => {
	if (!IsLocalhost()) return null;

	try {
		const AuthURL = import.meta.env.PUBLIC_AUTH_WORKER_URL;
		if (!AuthURL) return null;

		const Response = await fetch(`${AuthURL}/auth/local-token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: "local-dev-user",
				email: "dev@localhost",
			}),
		});

		if (!Response.ok) return null;

		const Data = (await Response.json()) as {
			success: boolean;
			data?: { token: string; expiresAt: number; userId: string };
		};

		if (!Data.success || !Data.data) return null;

		return {
			Token: Data.data.token,
			ExpiresAt: Data.data.expiresAt,
			UserId: Data.data.userId,
		};
	} catch {
		return null;
	}
};

const PostAuthToServiceWorker = (Token: string, UserId: string): void => {
	try {
		if (
			typeof navigator === "undefined" ||
			!navigator.serviceWorker?.controller
		)
			return;

		navigator.serviceWorker.controller.postMessage({
			Type: "Auth:Write",
			Token,
			ExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
			UserId,
		});
	} catch {
		// ServiceWorker not available - gracefully degrade
	}
};

const ClearAuthFromServiceWorker = (): void => {
	try {
		if (
			typeof navigator === "undefined" ||
			!navigator.serviceWorker?.controller
		)
			return;

		navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
	} catch {
		// ServiceWorker not available
	}
};

export interface WorkersClient {
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
			Provider: "github" | "google" | "gitlab" | "okta",
		): Promise<{ success: boolean }>;
		HandleOAuthCallback(): never;
	};
	Download: {
		GetBinaries(
			Platform?: string,
			Architecture?: string,
		): Promise<APIResponse<Download[]>>;
		GetVersionList(Limit?: number): Promise<APIResponse<Download[]>>;
		GetDownload(Id: string): Promise<APIResponse<Download>>;
		GetSHA256(Id: string): Promise<APIResponse<{ sha256: string }>>;
		GetSignature(Id: string): Promise<APIResponse<{ signature: string }>>;
		GetInfo(Id: string): Promise<
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
		TrackDownload(Id: string): Promise<APIResponse<{ eventId: string }>>;
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
		GetEvent(Id: string): Promise<APIResponse<AnalyticsEvent>>;
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
		GetCheck(Id: string): Promise<
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
			CheckId?: string,
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
		const CookieList = document.cookie.split(";");
		const SessionCookie = CookieList.find((Cookie) =>
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

function CreateWorkerClient(BaseURL: string): Partial<WorkersClient> {
	const FetchWithAuthentication = async <T>(
		Endpoint: string,
		Option: RequestInit = {},
	): Promise<APIResponse<T>> => {
		const Token = GetAuthToken();
		const Header: Record<string, string> = {
			"Content-Type": "application/json",
			...(Token ? { Authorization: `Bearer ${Token}` } : {}),
			...(Option.headers as Record<string, string>),
		};

		const Response = await fetch(`${BaseURL}${Endpoint}`, {
			...Option,
			headers: Header,
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
					FetchWithAuthentication<{
						user: User;
						session: Session;
					}>("/auth/login", {
						method: "POST",
						body: JSON.stringify({
							email: Email,
							password: Password,
						}),
					}),
				).then(async (Result) => {
					if (Result.success && Result.data?.session) {
						PostAuthToServiceWorker(
							Result.data.session.token,
							Result.data.user.id,
						);
					}
					return Result;
				}),
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
				).then(async (Result) => {
					if (Result.success && Result.data?.session) {
						PostAuthToServiceWorker(
							Result.data.session.token,
							Result.data.user.id,
						);
					}
					return Result;
				}),
			Logout: () =>
				WithRetry(() =>
					FetchWithAuthentication("/auth/logout", {
						method: "POST",
					}),
				).then((Result) => {
					ClearAuthFromServiceWorker();
					try {
						localStorage.removeItem("session_token");
						document.cookie =
							"session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
					} catch {
						// Storage not available
					}
					return Result;
				}),
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
						{ method: "GET" },
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
				const RedirectURL = `${BaseURL}/auth/oauth/${Provider}`;
				window.location.href = RedirectURL;
				return Promise.resolve({ success: true });
			},
			HandleOAuthCallback: () => {
				throw new Error(
					"HandleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter.",
				);
			},
		},
		Download: {
			GetBinaries: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture)
					Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(
						`/downloads${Query ? `?${Query}` : ""}`,
					),
				);
			},
			GetVersionList: (Limit) => {
				const Query = Limit ? `?limit=${Limit}` : "";
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(`/downloads${Query}`),
				);
			},
			GetDownload: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<Download>(`/downloads/${Id}`),
				),
			GetSHA256: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<{ sha256: string }>(
						`/downloads/${Id}/sha256`,
					),
				),
			GetSignature: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<{ signature: string }>(
						`/downloads/${Id}/signature`,
					),
				),
			GetInfo: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<
						Download & {
							downloadUrl: string;
							sha256Url: string;
							signatureUrl: string | null;
						}
					>(`/downloads/${Id}/info`),
				),
			GetByVersion: (Version, Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture)
					Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download[]>(
						`/downloads/version/${Version}${Query ? `?${Query}` : ""}`,
					),
				);
			},
			GetLatest: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture)
					Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() =>
					FetchWithAuthentication<Download>(
						`/downloads/latest${Query ? `?${Query}` : ""}`,
					),
				);
			},
			TrackDownload: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<{ eventId: string }>(
						`/downloads/${Id}/track`,
						{ method: "POST" },
					),
				),
			GetAnalytics: (Limit, Offset) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				const Query = Parameter.toString();
				return WithRetry(() =>
					FetchWithAuthentication<{
						events: DownloadEvent[];
						stats: {
							total: number;
							byPlatform: Record<string, number>;
							byVersion: Record<string, number>;
						};
					}>(`/analytics/downloads${Query ? `?${Query}` : ""}`),
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
				const Parameter = new URLSearchParams();
				if (Type) Parameter.append("type", Type);
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				if (StartDate) Parameter.append("start", StartDate);
				if (EndDate) Parameter.append("end", EndDate);
				return WithRetry(() =>
					FetchWithAuthentication<AnalyticsEvent[]>(
						`/events?${Parameter.toString()}`,
					),
				);
			},
			GetEvent: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<AnalyticsEvent>(`/events/${Id}`),
				),
			GetSummary: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
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
					}>(`/summary?${Parameter.toString()}`),
				);
			},
			GetTimeline: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							date: string;
							count: number;
							types: Record<string, number>;
						}>
					>(`/timeline?${Parameter.toString()}`),
				);
			},
			GetPageViewStats: (Days, Limit) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							path: string;
							title: string;
							count: number;
						}>
					>(`/stats/pageviews?${Parameter.toString()}`),
				);
			},
			GetEventStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() =>
					FetchWithAuthentication<{
						byType: Record<string, number>;
						byBrowser: Record<string, number>;
						byOS: Record<string, number>;
					}>(`/stats/events?${Parameter.toString()}`),
				);
			},
			GetSessionStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() =>
					FetchWithAuthentication<{
						totalSessions: number;
						avgEventsPerSession: number;
						sessionsByEventCount: Record<string, number>;
					}>(`/stats/sessions?${Parameter.toString()}`),
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
			GetCheck: (Id) =>
				WithRetry(() =>
					FetchWithAuthentication<{
						id: string;
						name: string;
						status: string;
						lastChecked: string;
						latency?: number;
						message?: string;
					}>(`/status/checks/${Id}`),
				),
			GetHistory: (Limit, CheckId) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (CheckId) Parameter.append("checkId", CheckId);
				return WithRetry(() =>
					FetchWithAuthentication<
						Array<{
							checkId: string;
							status: string;
							timestamp: string;
							message?: string;
						}>
					>(`/status/history?${Parameter.toString()}`),
				);
			},
			GetGitHubCommits: (Branch, Limit) => {
				const Parameter = new URLSearchParams();
				if (Branch) Parameter.append("branch", Branch);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubCommit[]>(
						`/status/github/commits?${Parameter.toString()}`,
					),
				);
			},
			GetGitHubActions: (Limit) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubActionRun[]>(
						`/status/github/actions?${Parameter.toString()}`,
					),
				);
			},
			GetGitHubIssues: (State, Limit) => {
				const Parameter = new URLSearchParams();
				if (State) Parameter.append("state", State);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() =>
					FetchWithAuthentication<GitHubIssue[]>(
						`/status/github/issues?${Parameter.toString()}`,
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
	if (!AuthenticationURL || !DownloadURL || !AnalyticsURL) {
		const NoOperationResponse = {
			success: false as const,
			error: "Worker URLs not configured",
		};
		const NoOperation = () => Promise.resolve(NoOperationResponse);
		const NoOperationHandler = new Proxy({} as WorkersClient, {
			get: () => new Proxy({}, { get: () => NoOperation }),
		});
		ClientInstance = NoOperationHandler;
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
