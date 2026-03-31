import type GitHubActionRun from "../Interface/GitHubActionRun.js";
import type GitHubCommit from "../Interface/GitHubCommit.js";
import type GitHubIssue from "../Interface/GitHubIssue.js";
import { GetWorkersClient } from "../WorkerClient";

/**
 * Status API adapter
 * Provides clean, type-safe interface for status/health check operations
 */
export class StatusAPI {
	private Workers = GetWorkersClient();

	async GetOverallStatus(): Promise<{
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
	}> {
		const Response = await this.Workers.Status.GetOverallStatus();
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch overall status");
		}
		return Response.data;
	}

	async GetChecks(): Promise<
		Array<{
			id: string;
			name: string;
			status: string;
			lastChecked: string;
			latency?: number;
			message?: string;
		}>
	> {
		const Response = await this.Workers.Status.GetChecks();
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch status checks");
		}
		return Response.data;
	}

	async GetCheck(Identifier: string): Promise<{
		id: string;
		name: string;
		status: string;
		lastChecked: string;
		latency?: number;
		message?: string;
	}> {
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
