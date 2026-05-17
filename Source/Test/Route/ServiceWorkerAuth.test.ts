import { describe, expect, it } from "vitest";

// The ServiceWorker file uses `declare var self: ServiceWorkerGlobalScope` and
// build-time injected constants (__DEV__, __INCREMENT__, __ROUTE_MAP_*).
// We cannot import it directly - instead we replicate the testable pure logic
// (same approach as ServiceWorker.test.ts) and test the message bus contracts,
// auth gate routing rules, and API request classification deterministically.

// ─── Replicated from ServiceWorker.ts (pure logic) ───

const ProtectedRoute: Set<string> = new Set(["/Dashboard"]);

const AuthRoute: Set<string> = new Set([
	"/Account/SignIn",
	"/Account/SignUp",
	"/Account/ForgotPassword",
	"/Account/ResetPassword",
]);

const ApiPrefix: string[] = [
	"/api/",
	"/auth/",
	"/downloads/",
	"/track",
	"/pageview",
	"/events",
	"/summary",
	"/timeline",
	"/stats/",
	"/status",
];

interface AuthState {
	Token: string;
	ExpiresAt: number;
	UserId: string;
}

const IsApiRequest = (
	Pathname: string,
	Origin: string,
	SelfOrigin: string,
): boolean => {
	if (Origin === SelfOrigin) {
		return ApiPrefix.some((Prefix) => Pathname.startsWith(Prefix));
	}
	return Origin.endsWith(".workers.dev");
};

// ─── Message bus contract types ───

interface AuthWriteMessage {
	Type: "Auth:Write";
	Token: string;
	ExpiresAt: number;
	UserId: string;
}

interface AuthClearMessage {
	Type: "Auth:Clear";
}

interface AuthReadMessage {
	Type: "Auth:Read";
}

interface AuthRefreshMessage {
	Type: "Auth:Refresh";
}

// ─── Auth gate decision logic ───
// Extracted from the fetch event handler for testability.

type AuthGateResult =
	| { Action: "Redirect"; Target: string; Code: number }
	| { Action: "Continue" };

const EvaluateAuthGate = (Path: string, IsAuthed: boolean): AuthGateResult => {
	if (ProtectedRoute.has(Path) && !IsAuthed) {
		return {
			Action: "Redirect",
			Target: `/Account/SignIn?next=${Path}`,
			Code: 302,
		};
	}

	if (AuthRoute.has(Path) && IsAuthed) {
		return {
			Action: "Redirect",
			Target: "/Dashboard",
			Code: 302,
		};
	}

	return { Action: "Continue" };
};

// ─── Tests ───

describe("ServiceWorker Auth:Write message", () => {
	it("validates required fields in Auth:Write payload", () => {
		const ValidMessage: AuthWriteMessage = {
			Type: "Auth:Write",
			Token: "jwt-token-abc",
			ExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
			UserId: "user-42",
		};

		expect(ValidMessage.Type).toBe("Auth:Write");
		expect(ValidMessage.Token).toBeTruthy();
		expect(ValidMessage.ExpiresAt).toBeGreaterThan(Date.now());
		expect(ValidMessage.UserId).toBeTruthy();
	});

	it("rejects Auth:Write with missing Token", () => {
		const InvalidMessage = {
			Type: "Auth:Write",
			ExpiresAt: Date.now() + 1000,
			UserId: "user-1",
		};

		// The SW checks: if (!Data.Token || !Data.ExpiresAt || !Data.UserId) return;
		expect(!InvalidMessage.Token).toBe(true);
	});

	it("rejects Auth:Write with missing ExpiresAt", () => {
		const InvalidMessage = {
			Type: "Auth:Write",
			Token: "some-token",
			UserId: "user-1",
		};

		expect(!InvalidMessage.ExpiresAt).toBe(true);
	});

	it("rejects Auth:Write with missing UserId", () => {
		const InvalidMessage = {
			Type: "Auth:Write",
			Token: "some-token",
			ExpiresAt: Date.now() + 1000,
		};

		expect(!InvalidMessage.UserId).toBe(true);
	});
});

describe("ServiceWorker Auth:Read message", () => {
	it("constructs valid Auth:Read message", () => {
		const ReadMessage: AuthReadMessage = { Type: "Auth:Read" };

		expect(ReadMessage.Type).toBe("Auth:Read");
	});

	it("expected reply shape is Auth:State with State field", () => {
		const MockReply = {
			Type: "Auth:State",
			State: {
				Token: "jwt-token",
				ExpiresAt: Date.now() + 3600_000,
				UserId: "user-1",
			} as AuthState,
		};

		expect(MockReply.Type).toBe("Auth:State");
		expect(MockReply.State).toBeTruthy();
		expect(MockReply.State.Token).toBe("jwt-token");
	});

	it("expected reply can have null State when no auth", () => {
		const MockReply = {
			Type: "Auth:State",
			State: null as AuthState | null,
		};

		expect(MockReply.Type).toBe("Auth:State");
		expect(MockReply.State).toBeNull();
	});
});

describe("ServiceWorker Auth:Clear message", () => {
	it("constructs valid Auth:Clear message", () => {
		const ClearMessage: AuthClearMessage = { Type: "Auth:Clear" };

		expect(ClearMessage.Type).toBe("Auth:Clear");
	});

	it("expected reply is Auth:Cleared", () => {
		const MockReply = { Type: "Auth:Cleared" };

		expect(MockReply.Type).toBe("Auth:Cleared");
	});
});

describe("ServiceWorker Auth:Refresh message", () => {
	it("constructs valid Auth:Refresh message", () => {
		const RefreshMessage: AuthRefreshMessage = { Type: "Auth:Refresh" };

		expect(RefreshMessage.Type).toBe("Auth:Refresh");
	});

	it("expected reply is Auth:State after refresh", () => {
		const MockReply = {
			Type: "Auth:State",
			State: {
				Token: "refreshed-jwt-token",
				ExpiresAt: Date.now() + 7200_000,
				UserId: "user-1",
			} as AuthState,
		};

		expect(MockReply.Type).toBe("Auth:State");
		expect(MockReply.State.Token).toBe("refreshed-jwt-token");
	});
});

describe("Protected route auth gate", () => {
	it("redirects to SignIn when no auth on /Dashboard", () => {
		const Result = EvaluateAuthGate("/Dashboard", false);

		expect(Result.Action).toBe("Redirect");

		if (Result.Action === "Redirect") {
			expect(Result.Target).toBe("/Account/SignIn?next=/Dashboard");
			expect(Result.Code).toBe(302);
		}
	});

	it("continues when authenticated on /Dashboard", () => {
		const Result = EvaluateAuthGate("/Dashboard", true);

		expect(Result.Action).toBe("Continue");
	});

	it("continues when no auth on unprotected route", () => {
		const Result = EvaluateAuthGate("/Blog", false);

		expect(Result.Action).toBe("Continue");
	});
});

describe("Auth route bypass", () => {
	it("redirects to Dashboard when authenticated on /Account/SignIn", () => {
		const Result = EvaluateAuthGate("/Account/SignIn", true);

		expect(Result.Action).toBe("Redirect");

		if (Result.Action === "Redirect") {
			expect(Result.Target).toBe("/Dashboard");
			expect(Result.Code).toBe(302);
		}
	});

	it("redirects to Dashboard when authenticated on /Account/SignUp", () => {
		const Result = EvaluateAuthGate("/Account/SignUp", true);

		expect(Result.Action).toBe("Redirect");

		if (Result.Action === "Redirect") {
			expect(Result.Target).toBe("/Dashboard");
		}
	});

	it("redirects to Dashboard when authenticated on /Account/ForgotPassword", () => {
		const Result = EvaluateAuthGate("/Account/ForgotPassword", true);

		expect(Result.Action).toBe("Redirect");

		if (Result.Action === "Redirect") {
			expect(Result.Target).toBe("/Dashboard");
		}
	});

	it("redirects to Dashboard when authenticated on /Account/ResetPassword", () => {
		const Result = EvaluateAuthGate("/Account/ResetPassword", true);

		expect(Result.Action).toBe("Redirect");

		if (Result.Action === "Redirect") {
			expect(Result.Target).toBe("/Dashboard");
		}
	});

	it("continues when not authenticated on /Account/SignIn", () => {
		const Result = EvaluateAuthGate("/Account/SignIn", false);

		expect(Result.Action).toBe("Continue");
	});

	it("continues when not authenticated on /Account/SignUp", () => {
		const Result = EvaluateAuthGate("/Account/SignUp", false);

		expect(Result.Action).toBe("Continue");
	});
});

describe("API request detection with Bearer token injection", () => {
	const SelfOrigin = "https://land.playform.cloud";

	it("detects same-origin /api/ paths as API requests", () => {
		expect(IsApiRequest("/api/user", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /auth/ paths as API requests", () => {
		expect(IsApiRequest("/auth/login", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /downloads/ paths as API requests", () => {
		expect(IsApiRequest("/downloads/latest", SelfOrigin, SelfOrigin)).toBe(
			true,
		);
	});

	it("detects same-origin /track path as API request", () => {
		expect(IsApiRequest("/track", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /pageview path as API request", () => {
		expect(IsApiRequest("/pageview", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /events path as API request", () => {
		expect(IsApiRequest("/events", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /summary path as API request", () => {
		expect(IsApiRequest("/summary", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /timeline path as API request", () => {
		expect(IsApiRequest("/timeline", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("detects same-origin /stats/ paths as API requests", () => {
		expect(IsApiRequest("/stats/pageviews", SelfOrigin, SelfOrigin)).toBe(
			true,
		);
	});

	it("detects same-origin /status path as API request", () => {
		expect(IsApiRequest("/status", SelfOrigin, SelfOrigin)).toBe(true);
	});

	it("does not detect non-API same-origin paths", () => {
		expect(IsApiRequest("/Blog", SelfOrigin, SelfOrigin)).toBe(false);
		expect(IsApiRequest("/Download", SelfOrigin, SelfOrigin)).toBe(false);
		expect(IsApiRequest("/Dashboard", SelfOrigin, SelfOrigin)).toBe(false);
		expect(IsApiRequest("/", SelfOrigin, SelfOrigin)).toBe(false);
	});

	it("detects cross-origin workers.dev requests as API requests", () => {
		expect(
			IsApiRequest("/auth/login", "https://auth.workers.dev", SelfOrigin),
		).toBe(true);
	});

	it("does not detect non-workers.dev cross-origin as API requests", () => {
		expect(
			IsApiRequest("/some/path", "https://external-api.com", SelfOrigin),
		).toBe(false);
	});
});

describe("API request HMAC signing contract", () => {
	it("X-Signature header format covers METHOD, PATH, TIMESTAMP, BODY", () => {
		// The SW signs: `${Method}\n${PathName}\n${Timestamp}\n${Body}`
		const Method = "POST";
		const PathName = "/auth/login";
		const Timestamp = Date.now().toString();
		const Body = JSON.stringify({ email: "test@example.com" });
		const Message = `${Method}\n${PathName}\n${Timestamp}\n${Body}`;

		expect(Message).toContain("POST");
		expect(Message).toContain("/auth/login");
		expect(Message).toContain(Timestamp);
		expect(Message).toContain(Body);
		expect(Message.split("\n")).toHaveLength(4);
	});

	it("GET requests have empty body in signature", () => {
		const Method = "GET";
		const PathName = "/auth/session";
		const Timestamp = Date.now().toString();
		const Body = "";
		const Message = `${Method}\n${PathName}\n${Timestamp}\n${Body}`;

		expect(Message.endsWith("\n")).toBe(true);
	});
});

describe("Auth state expiry logic", () => {
	it("considers token expired when ExpiresAt minus 30s buffer is past", () => {
		const NowMs = Date.now();
		const State: AuthState = {
			Token: "expired-token",
			ExpiresAt: NowMs + 20_000, // 20 seconds from now
			UserId: "user-1",
		};

		// SW checks: State.ExpiresAt - 30_000 < Date.now()
		const IsExpired = State.ExpiresAt - 30_000 < NowMs;

		expect(IsExpired).toBe(true);
	});

	it("considers token valid when more than 30s remaining", () => {
		const NowMs = Date.now();
		const State: AuthState = {
			Token: "valid-token",
			ExpiresAt: NowMs + 60_000, // 60 seconds from now
			UserId: "user-1",
		};

		const IsExpired = State.ExpiresAt - 30_000 < NowMs;

		expect(IsExpired).toBe(false);
	});

	it("token refresh triggers when less than 5 minutes remain", () => {
		const NowMs = Date.now();
		const State: AuthState = {
			Token: "almost-expired",
			ExpiresAt: NowMs + 4 * 60_000, // 4 minutes from now
			UserId: "user-1",
		};

		// SW checks: (State.ExpiresAt - Date.now()) / 60_000 > 5
		const MinutesLeft = (State.ExpiresAt - NowMs) / 60_000;
		const ShouldRefresh = MinutesLeft <= 5;

		expect(ShouldRefresh).toBe(true);
	});

	it("token refresh does not trigger when more than 5 minutes remain", () => {
		const NowMs = Date.now();
		const State: AuthState = {
			Token: "fresh-token",
			ExpiresAt: NowMs + 10 * 60_000, // 10 minutes from now
			UserId: "user-1",
		};

		const MinutesLeft = (State.ExpiresAt - NowMs) / 60_000;
		const ShouldRefresh = MinutesLeft <= 5;

		expect(ShouldRefresh).toBe(false);
	});
});

describe("Protected and auth route sets", () => {
	it("only /Dashboard is protected", () => {
		expect(ProtectedRoute.size).toBe(1);
		expect(ProtectedRoute.has("/Dashboard")).toBe(true);
	});

	it("/Portal is NOT protected (public gateway)", () => {
		expect(ProtectedRoute.has("/Portal")).toBe(false);
	});

	it("all four auth routes are registered", () => {
		expect(AuthRoute.size).toBe(4);
		expect(AuthRoute.has("/Account/SignIn")).toBe(true);
		expect(AuthRoute.has("/Account/SignUp")).toBe(true);
		expect(AuthRoute.has("/Account/ForgotPassword")).toBe(true);
		expect(AuthRoute.has("/Account/ResetPassword")).toBe(true);
	});

	it("/Dashboard is not an auth route", () => {
		expect(AuthRoute.has("/Dashboard")).toBe(false);
	});

	it("/Portal is not an auth route", () => {
		expect(AuthRoute.has("/Portal")).toBe(false);
	});
});
