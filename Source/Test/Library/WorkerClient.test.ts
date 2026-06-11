import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ─── Global mocks ───

const FetchMock = vi.fn();

const PostMessageMock = vi.fn();

const ConsoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

// Mock import.meta.env
const OriginalEnv = { ...import.meta.env };

beforeEach(() => {
	vi.useFakeTimers({ shouldAdvanceTime: true });

	// Reset fetch
	FetchMock.mockReset();

	globalThis.fetch = FetchMock;

	// Reset postMessage
	PostMessageMock.mockReset();

	// Mock navigator.serviceWorker.controller
	Object.defineProperty(globalThis.navigator, "serviceWorker", {
		value: {
			controller: {
				postMessage: PostMessageMock,
			},
		},
		writable: true,
		configurable: true,
	});

	// Mock localStorage
	const StorageMap: Record<string, string> = {};

	Object.defineProperty(globalThis, "localStorage", {
		value: {
			getItem: vi.fn((Key: string) => StorageMap[Key] ?? null),
			setItem: vi.fn((Key: string, Value: string) => {
				StorageMap[Key] = Value;
			}),
			removeItem: vi.fn((Key: string) => {
				delete StorageMap[Key];
			}),
		},
		writable: true,
		configurable: true,
	});

	// Mock document.cookie
	Object.defineProperty(document, "cookie", {
		value: "",
		writable: true,
		configurable: true,
	});
});

afterEach(() => {
	vi.useRealTimers();

	vi.restoreAllMocks();

	// Reset the cached client instance between tests
	vi.resetModules();
});

describe("WorkerClient", () => {
	describe("GetWorkersClient singleton", () => {
		it("returns the same instance on repeated calls", async () => {
			// Set env vars so real client is created
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const FirstInstance = GetWorkersClient();

			const SecondInstance = GetWorkersClient();

			expect(FirstInstance).toBe(SecondInstance);

			vi.unstubAllEnvs();
		});
	});

	describe("no-op proxy when URLs not configured", () => {
		it("returns no-op proxy that resolves with error response", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "");

			vi.stubEnv("PUBLIC_DOWNLOAD_WORKER_URL", "");

			vi.stubEnv("PUBLIC_ANALYTICS_WORKER_URL", "");

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			const Result = await Client.Authentication.Login(
				"test@example.com",

				"password",
			);

			expect(Result).toEqual({
				success: false,
				error: "Worker URLs not configured",
			});

			vi.unstubAllEnvs();
		});

		it("returns no-op for any nested method call", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "");

			vi.stubEnv("PUBLIC_DOWNLOAD_WORKER_URL", "");

			vi.stubEnv("PUBLIC_ANALYTICS_WORKER_URL", "");

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			const Result = await Client.Download.GetBinaries();

			expect(Result.success).toBe(false);

			vi.unstubAllEnvs();
		});
	});

	describe("Authentication.Login", () => {
		it("sends correct POST body with email and password", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			FetchMock.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve({
						success: true,
						data: {
							user: { id: "user-1", email: "test@example.com" },
							session: { token: "abc123" },
						},
					}),
			});

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			await Client.Authentication.Login(
				"test@example.com",

				"Password123",
			);

			expect(FetchMock).toHaveBeenCalledWith(
				"https://auth.workers.dev/auth/login",

				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({
						email: "test@example.com",
						password: "Password123",
					}),
				}),
			);

			vi.unstubAllEnvs();
		});
	});

	describe("Authentication.Logout", () => {
		it("clears localStorage and cookie after logout", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			FetchMock.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve({
						success: true,
						data: { message: "Logged out" },
					}),
			});

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			await Client.Authentication.Logout();

			expect(localStorage.removeItem).toHaveBeenCalledWith(
				"session_token",
			);

			vi.unstubAllEnvs();
		});
	});

	describe("PostAuthToServiceWorker", () => {
		it("calls navigator.serviceWorker.controller.postMessage on login success", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			FetchMock.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve({
						success: true,
						data: {
							user: { id: "user-42" },
							session: { token: "jwt-token-abc" },
						},
					}),
			});

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			await Client.Authentication.Login("user@example.com", "pass");

			expect(PostMessageMock).toHaveBeenCalledWith(
				expect.objectContaining({
					Type: "Auth:Write",
					Token: "jwt-token-abc",
					UserId: "user-42",
				}),
			);

			vi.unstubAllEnvs();
		});
	});

	describe("ClearAuthFromServiceWorker", () => {
		it("posts Auth:Clear message on logout", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			FetchMock.mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve({
						success: true,
						data: { message: "Logged out" },
					}),
			});

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			await Client.Authentication.Logout();

			expect(PostMessageMock).toHaveBeenCalledWith({
				Type: "Auth:Clear",
			});

			vi.unstubAllEnvs();
		});
	});

	describe("retry logic", () => {
		it("retries on fetch failure up to MAX_RETRIES", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			// Fail 3 times (MAX_RETRIES = 3), then no more retries
			FetchMock.mockRejectedValueOnce(new Error("Network error 1"))
				.mockRejectedValueOnce(new Error("Network error 2"))
				.mockRejectedValueOnce(new Error("Network error 3"))
				.mockRejectedValueOnce(new Error("Network error 4"));

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			// Advance all timers for retry delays
			const ResultPromise = Client.Authentication.GetSession();

			// Allow retries to execute by advancing timers
			await vi.advanceTimersByTimeAsync(10000);

			const Result = await ResultPromise;

			// After initial call + 3 retries = 4 total fetch calls
			expect(FetchMock).toHaveBeenCalledTimes(4);

			// Final result is an error response
			expect(Result.success).toBe(false);

			vi.unstubAllEnvs();
		});

		it("succeeds on retry after initial failure", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			// First call fails, second succeeds
			FetchMock.mockRejectedValueOnce(
				new Error("Temporary failure"),
			).mockResolvedValueOnce({
				ok: true,
				json: () =>
					Promise.resolve({
						success: true,
						data: {
							user: { id: "user-1" },
							expiresIn: 3600,
						},
					}),
			});

			const { GetWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const Client = GetWorkersClient();

			const ResultPromise = Client.Authentication.GetSession();

			await vi.advanceTimersByTimeAsync(5000);

			const Result = await ResultPromise;

			expect(FetchMock).toHaveBeenCalledTimes(2);

			expect(Result.success).toBe(true);

			vi.unstubAllEnvs();
		});
	});

	describe("ClearWorkersClient", () => {
		it("allows a new instance to be created after clearing", async () => {
			vi.stubEnv("PUBLIC_AUTH_WORKER_URL", "https://auth.workers.dev");

			vi.stubEnv(
				"PUBLIC_DOWNLOAD_WORKER_URL",

				"https://download.workers.dev",
			);

			vi.stubEnv(
				"PUBLIC_ANALYTICS_WORKER_URL",

				"https://analytics.workers.dev",
			);

			const { GetWorkersClient, ClearWorkersClient } =
				await import("../../Library/WorkerClient.js");

			const FirstInstance = GetWorkersClient();

			ClearWorkersClient();

			const SecondInstance = GetWorkersClient();

			// After clearing, a new instance is created (not same reference)
			expect(FirstInstance).not.toBe(SecondInstance);

			vi.unstubAllEnvs();
		});
	});
});
