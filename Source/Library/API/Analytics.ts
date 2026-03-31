import type AnalyticsEvent from "../Interface/AnalyticsEvent.js";
import { GetWorkersClient } from "../WorkerClient";

/**
 * Analytics API adapter
 * Provides clean, type-safe interface for analytics operations
 */
export class AnalyticsAPI {
	private Workers = GetWorkersClient();

	async Track(
		Type: string,
		Properties?: Record<string, unknown>,
	): Promise<{ eventId: string }> {
		const Response = await this.Workers.Analytics.Track(Type, Properties);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to track event");
		}
		return Response.data;
	}

	async TrackBatch(
		Events: Array<{
			type: string;
			userId?: string;
			sessionId?: string;
			properties?: Record<string, unknown>;
		}>,
	): Promise<{ tracked: number; eventIds: string[] }> {
		const Response = await this.Workers.Analytics.TrackBatch(Events);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to track batch events");
		}
		return Response.data;
	}

	async TrackPageView(
		Path: string,
		Title?: string,
		Referrer?: string,
	): Promise<{ eventId: string }> {
		const Response = await this.Workers.Analytics.TrackPageView(
			Path,
			Title,
			Referrer,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to track page view");
		}
		return Response.data;
	}

	async GetEvents(
		Type?: string,
		Limit?: number,
		Offset?: number,
		StartDate?: string,
		EndDate?: string,
	): Promise<AnalyticsEvent[]> {
		const Response = await this.Workers.Analytics.GetEvents(
			Type,
			Limit,
			Offset,
			StartDate,
			EndDate,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch events");
		}
		return Response.data;
	}

	async GetEvent(Identifier: string): Promise<AnalyticsEvent> {
		const Response = await this.Workers.Analytics.GetEvent(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch event");
		}
		return Response.data;
	}

	async GetSummary(
		Days?: number,
		Type?: string,
	): Promise<{
		totalEvents: number;
		uniqueVisitors: number;
		uniqueSessions: number;
		byType: Record<string, number>;
		byDate: Record<string, number>;
		period: { days: number; start: string; end: string };
	}> {
		const Response = await this.Workers.Analytics.GetSummary(Days, Type);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch summary");
		}
		return Response.data;
	}

	async GetTimeline(
		Days?: number,
		Type?: string,
	): Promise<
		Array<{ date: string; count: number; types: Record<string, number> }>
	> {
		const Response = await this.Workers.Analytics.GetTimeline(Days, Type);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch timeline");
		}
		return Response.data;
	}

	async GetPageViewStats(
		Days?: number,
		Limit?: number,
	): Promise<Array<{ path: string; title: string; count: number }>> {
		const Response = await this.Workers.Analytics.GetPageViewStats(
			Days,
			Limit,
		);
		if (!Response.success || !Response.data) {
			throw new Error(
				Response.error || "Failed to fetch page view stats",
			);
		}
		return Response.data;
	}

	async GetEventStats(Days?: number): Promise<{
		byType: Record<string, number>;
		byBrowser: Record<string, number>;
		byOS: Record<string, number>;
	}> {
		const Response = await this.Workers.Analytics.GetEventStats(Days);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch event stats");
		}
		return Response.data;
	}

	async GetSessionStats(Days?: number): Promise<{
		totalSessions: number;
		avgEventsPerSession: number;
		sessionsByEventCount: Record<string, number>;
	}> {
		const Response = await this.Workers.Analytics.GetSessionStats(Days);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch session stats");
		}
		return Response.data;
	}
}

export default new AnalyticsAPI();
