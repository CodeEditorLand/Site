import type GitHubActionRun from "../Interface/GitHubActionRun.js";
import type GitHubCommit from "../Interface/GitHubCommit.js";
import type GitHubIssue from "../Interface/GitHubIssue.js";
import { getWorkersClient } from "../WorkerClient";

/**
 * Status API adapter
 * Provides clean, type-safe interface for status/health check operations
 */
export class StatusAPI {
	private workers = getWorkersClient();

	async getOverallStatus(): Promise<{
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
		const response = await this.workers.status.getOverallStatus();
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch overall status");
		}
		return response.data;
	}

	async getChecks(): Promise<
		Array<{
			id: string;
			name: string;
			status: string;
			lastChecked: string;
			latency?: number;
			message?: string;
		}>
	> {
		const response = await this.workers.status.getChecks();
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch status checks");
		}
		return response.data;
	}

	async getCheck(id: string): Promise<{
		id: string;
		name: string;
		status: string;
		lastChecked: string;
		latency?: number;
		message?: string;
	}> {
		const response = await this.workers.status.getCheck(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch check");
		}
		return response.data;
	}

	async getHistory(
		limit?: number,
		checkId?: string,
	): Promise<
		Array<{
			checkId: string;
			status: string;
			timestamp: string;
			message?: string;
		}>
	> {
		const response = await this.workers.status.getHistory(limit, checkId);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch status history");
		}
		return response.data;
	}

	async getGitHubCommits(
		branch?: string,
		limit?: number,
	): Promise<GitHubCommit[]> {
		const response = await this.workers.status.getGitHubCommits(
			branch,
			limit,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch GitHub commits");
		}
		return response.data;
	}

	async getGitHubActions(limit?: number): Promise<GitHubActionRun[]> {
		const response = await this.workers.status.getGitHubActions(limit);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch GitHub actions");
		}
		return response.data;
	}

	async getGitHubIssues(
		state?: string,
		limit?: number,
	): Promise<GitHubIssue[]> {
		const response = await this.workers.status.getGitHubIssues(
			state,
			limit,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch GitHub issues");
		}
		return response.data;
	}
}

export const statusAPI = new StatusAPI();
