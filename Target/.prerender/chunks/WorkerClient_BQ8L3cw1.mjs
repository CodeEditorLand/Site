//#region Source/Library/WorkerClient.ts
var PostAuthToServiceWorker = (Token, UserId) => {
	try {
		if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller) return;
		navigator.serviceWorker.controller.postMessage({
			Type: "Auth:Write",
			Token,
			ExpiresAt: Date.now() + 10080 * 60 * 1e3,
			UserId
		});
	} catch {}
};
var ClearAuthFromServiceWorker = () => {
	try {
		if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller) return;
		navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
	} catch {}
};
var MAX_RETRIES = 3;
var RETRY_DELAY = 1e3;
function Delay(Millisecond) {
	return new Promise((Resolve) => setTimeout(Resolve, Millisecond));
}
function WithRetry(Function, Retries = MAX_RETRIES) {
	return Function().catch(async (Error2) => {
		if (Retries > 0) {
			console.warn(`Retrying request... (${Retries} retries left)`, Error2.message);
			await Delay(RETRY_DELAY);
			return WithRetry(Function, Retries - 1);
		}
		return {
			success: false,
			error: Error2.message
		};
	});
}
function GetAuthToken() {
	try {
		const SessionCookie = document.cookie.split(";").find((Cookie) => Cookie.trim().startsWith("session="));
		if (SessionCookie) return SessionCookie.split("=")[1] ?? null;
	} catch {}
	return localStorage.getItem("session_token");
}
function CreateWorkerClient(BaseURL) {
	const FetchWithAuthentication = async (Endpoint, Option = {}) => {
		const Token = GetAuthToken();
		const Header = {
			"Content-Type": "application/json",
			...Token ? { Authorization: `Bearer ${Token}` } : {},
			...Option.headers
		};
		const Response = await fetch(`${BaseURL}${Endpoint}`, {
			...Option,
			headers: Header
		});
		const Data = await Response.json().catch(() => ({
			success: false,
			error: "Invalid response"
		}));
		if (!Response.ok || !Data.success) return {
			success: false,
			error: Data.error || Data.message || `HTTP ${Response.status}`
		};
		return Data;
	};
	return {
		Authentication: {
			Login: (Email, Password) => WithRetry(() => FetchWithAuthentication("/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email: Email,
					password: Password
				})
			})).then(async (Result) => {
				if (Result.success && Result.data?.session) PostAuthToServiceWorker(Result.data.session.token, Result.data.user.id);
				return Result;
			}),
			Register: (Email, Password, Username, DisplayName) => WithRetry(() => FetchWithAuthentication("/auth/register", {
				method: "POST",
				body: JSON.stringify({
					email: Email,
					password: Password,
					username: Username,
					displayName: DisplayName
				})
			})).then(async (Result) => {
				if (Result.success && Result.data?.session) PostAuthToServiceWorker(Result.data.session.token, Result.data.user.id);
				return Result;
			}),
			Logout: () => WithRetry(() => FetchWithAuthentication("/auth/logout", { method: "POST" })).then((Result) => {
				ClearAuthFromServiceWorker();
				try {
					localStorage.removeItem("session_token");
					document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				} catch {}
				return Result;
			}),
			Refresh: (Token) => WithRetry(() => FetchWithAuthentication("/auth/refresh", {
				method: "POST",
				headers: { Authorization: `Bearer ${Token}` }
			})),
			VerifyEmail: (Token) => WithRetry(() => FetchWithAuthentication(`/auth/verify-email/${Token}`, { method: "GET" })),
			ResendVerification: () => WithRetry(() => FetchWithAuthentication("/auth/resend-verification", { method: "POST" })),
			ForgotPassword: (Email) => WithRetry(() => FetchWithAuthentication("/auth/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email: Email })
			})),
			ResetPassword: (Token, Password) => WithRetry(() => FetchWithAuthentication(`/auth/reset-password/${Token}`, {
				method: "POST",
				body: JSON.stringify({ password: Password })
			})),
			GetSession: () => WithRetry(() => FetchWithAuthentication("/auth/session")),
			OAuth: (Provider) => {
				const RedirectURL = `${BaseURL}/auth/oauth/${Provider}`;
				window.location.href = RedirectURL;
				return Promise.resolve({ success: true });
			},
			HandleOAuthCallback: () => {
				throw new Error("HandleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter.");
			}
		},
		Download: {
			GetBinaries: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads${Query ? `?${Query}` : ""}`));
			},
			GetVersionList: (Limit) => {
				const Query = Limit ? `?limit=${Limit}` : "";
				return WithRetry(() => FetchWithAuthentication(`/downloads${Query}`));
			},
			GetDownload: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}`)),
			GetSHA256: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/sha256`)),
			GetSignature: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/signature`)),
			GetInfo: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/info`)),
			GetByVersion: (Version, Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads/version/${Version}${Query ? `?${Query}` : ""}`));
			},
			GetLatest: (Platform, Architecture) => {
				const Parameter = new URLSearchParams();
				if (Platform) Parameter.append("platform", Platform);
				if (Architecture) Parameter.append("architecture", Architecture);
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/downloads/latest${Query ? `?${Query}` : ""}`));
			},
			TrackDownload: (Id) => WithRetry(() => FetchWithAuthentication(`/downloads/${Id}/track`, { method: "POST" })),
			GetAnalytics: (Limit, Offset) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				const Query = Parameter.toString();
				return WithRetry(() => FetchWithAuthentication(`/analytics/downloads${Query ? `?${Query}` : ""}`));
			}
		},
		Analytics: {
			Track: (Type, Properties = {}) => WithRetry(() => FetchWithAuthentication("/track", {
				method: "POST",
				body: JSON.stringify({
					type: Type,
					properties: Properties
				})
			})),
			TrackBatch: (Events) => WithRetry(() => FetchWithAuthentication("/track/batch", {
				method: "POST",
				body: JSON.stringify({ events: Events })
			})),
			TrackPageView: (Path, Title, Referrer) => WithRetry(() => FetchWithAuthentication("/pageview", {
				method: "POST",
				body: JSON.stringify({
					path: Path,
					title: Title,
					referrer: Referrer
				})
			})),
			GetEvents: (Type, Limit, Offset, StartDate, EndDate) => {
				const Parameter = new URLSearchParams();
				if (Type) Parameter.append("type", Type);
				if (Limit) Parameter.append("limit", Limit.toString());
				if (Offset) Parameter.append("offset", Offset.toString());
				if (StartDate) Parameter.append("start", StartDate);
				if (EndDate) Parameter.append("end", EndDate);
				return WithRetry(() => FetchWithAuthentication(`/events?${Parameter.toString()}`));
			},
			GetEvent: (Id) => WithRetry(() => FetchWithAuthentication(`/events/${Id}`)),
			GetSummary: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
				return WithRetry(() => FetchWithAuthentication(`/summary?${Parameter.toString()}`));
			},
			GetTimeline: (Days, Type) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Type) Parameter.append("type", Type);
				return WithRetry(() => FetchWithAuthentication(`/timeline?${Parameter.toString()}`));
			},
			GetPageViewStats: (Days, Limit) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/pageviews?${Parameter.toString()}`));
			},
			GetEventStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/events?${Parameter.toString()}`));
			},
			GetSessionStats: (Days) => {
				const Parameter = new URLSearchParams();
				if (Days) Parameter.append("days", Days.toString());
				return WithRetry(() => FetchWithAuthentication(`/stats/sessions?${Parameter.toString()}`));
			}
		},
		Status: {
			GetOverallStatus: () => WithRetry(() => FetchWithAuthentication("/status")),
			GetChecks: () => WithRetry(() => FetchWithAuthentication("/status/checks")),
			GetCheck: (Id) => WithRetry(() => FetchWithAuthentication(`/status/checks/${Id}`)),
			GetHistory: (Limit, CheckId) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				if (CheckId) Parameter.append("checkId", CheckId);
				return WithRetry(() => FetchWithAuthentication(`/status/history?${Parameter.toString()}`));
			},
			GetGitHubCommits: (Branch, Limit) => {
				const Parameter = new URLSearchParams();
				if (Branch) Parameter.append("branch", Branch);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/commits?${Parameter.toString()}`));
			},
			GetGitHubActions: (Limit) => {
				const Parameter = new URLSearchParams();
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/actions?${Parameter.toString()}`));
			},
			GetGitHubIssues: (State, Limit) => {
				const Parameter = new URLSearchParams();
				if (State) Parameter.append("state", State);
				if (Limit) Parameter.append("limit", Limit.toString());
				return WithRetry(() => FetchWithAuthentication(`/status/github/issues?${Parameter.toString()}`));
			}
		}
	};
}
var ClientInstance = null;
function GetWorkersClient() {
	if (ClientInstance) return ClientInstance;
	const AuthenticationURL = void 0;
	const DownloadURL = void 0;
	const AnalyticsURL = void 0;
	{
		const NoOperationResponse = {
			success: false,
			error: "Worker URLs not configured"
		};
		const NoOperation = () => Promise.resolve(NoOperationResponse);
		ClientInstance = new Proxy({}, { get: () => new Proxy({}, { get: () => NoOperation }) });
		return ClientInstance;
	}
	ClientInstance = {
		Authentication: CreateWorkerClient(AuthenticationURL).Authentication,
		Download: CreateWorkerClient(DownloadURL).Download,
		Analytics: CreateWorkerClient(AnalyticsURL).Analytics,
		Status: void 0
	};
	return ClientInstance;
}
//#endregion
export { GetWorkersClient as t };
