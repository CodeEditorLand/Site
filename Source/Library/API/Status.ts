import type GitHubActionRun from "../Interface/GitHubActionRun.js";

import type GitHubCommit from "../Interface/GitHubCommit.js";

import type GitHubIssue from "../Interface/GitHubIssue.js";

import { GetWorkersClient } from "../WorkerClient";

export interface StatusCheck {
	id: string;

	name: string;

	status: string;

	lastChecked: string;

	latency?: number;

	message?: string;
}

export interface StatusResponse {
	status: "operational" | "degraded" | "outage" | "maintenance";

	lastUpdate: string;

	checks: StatusCheck[];
}

/**
 * Status API adapter
 * Provides clean, type-safe interface for status/health check operations.
 * GetCachedStatus() caches in memory for 60 seconds - no localStorage.
 */
export class StatusAPI {
	private Workers = GetWorkersClient();

	private CachedStatus: StatusResponse | null = null;

	private CacheTimestamp: number = 0;

	private static readonly CacheTtl: number = 60_000;

	/**
	 * Returns the overall status, caching the result for 60 seconds.
	 * Uses an in-memory cache only - no localStorage or sessionStorage.
	 */
	async GetCachedStatus(): Promise<StatusResponse> {
		const Now = Date.now();

		if (
			this.CachedStatus !== null &&
			Now - this.CacheTimestamp < StatusAPI.CacheTtl
		) {
			return this.CachedStatus;
		}

		const Result = await this.GetOverallStatus();

		this.CachedStatus = Result;

		this.CacheTimestamp = Now;

		return Result;
	}

	async GetOverallStatus(): Promise<StatusResponse> {
		const Response = await this.Workers.Status.GetOverallStatus();

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch overall status");
		}

		return Response.data;
	}

	async GetChecks(): Promise<StatusCheck[]> {
		const Response = await this.Workers.Status.GetChecks();

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch status checks");
		}

		return Response.data;
	}

	async GetCheck(Identifier: string): Promise<StatusCheck> {
		const Response = await this.Workers.Status.GetCheck(Identifier);

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch check");
		}

		return Response.data;
	}

	async GetHistory(
		Limit?: number,

		CheckIdentifier?: string,
	): Promise<
		Array<{
			checkId: string;

			status: string;

			timestamp: string;

			message?: string;
		}>
	> {
		const Response = await this.Workers.Status.GetHistory(
			Limit,

			CheckIdentifier,
		);

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch status history");
		}

		return Response.data;
	}

	async GetGitHubCommits(
		Branch?: string,

		Limit?: number,
	): Promise<GitHubCommit[]> {
		const Response = await this.Workers.Status.GetGitHubCommits(
			Branch,

			Limit,
		);

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch GitHub commits");
		}

		return Response.data;
	}

	async GetGitHubActions(Limit?: number): Promise<GitHubActionRun[]> {
		const Response = await this.Workers.Status.GetGitHubActions(Limit);

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch GitHub actions");
		}

		return Response.data;
	}

	async GetGitHubIssues(
		State?: string,

		Limit?: number,
	): Promise<GitHubIssue[]> {
		const Response = await this.Workers.Status.GetGitHubIssues(
			State,

			Limit,
		);

		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch GitHub issues");
		}

		return Response.data;
	}
}

export default new StatusAPI();
