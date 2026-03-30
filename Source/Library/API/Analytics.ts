import type AnalyticsEvent from "../Interface/AnalyticsEvent.js";
import { getWorkersClient } from "../WorkerClient";

/**
 * Analytics API adapter
 * Provides clean, type-safe interface for analytics operations
 */
export class AnalyticsAPI {
	private workers = getWorkersClient();

	async track(
		type: string,
		properties?: Record<string, unknown>,
	): Promise<{ eventId: string }> {
		const response = await this.workers.analytics.track(type, properties);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to track event");
		}
		return response.data;
	}

	async trackBatch(
		events: Array<{
			type: string;
			userId?: string;
			sessionId?: string;
			properties?: Record<string, unknown>;
		}>,
	): Promise<{ tracked: number; eventIds: string[] }> {
		const response = await this.workers.analytics.trackBatch(events);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to track batch events");
		}
		return response.data;
	}

	async trackPageView(
		path: string,
		title?: string,
		referrer?: string,
	): Promise<{ eventId: string }> {
		const response = await this.workers.analytics.trackPageView(
			path,
			title,
			referrer,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to track page view");
		}
		return response.data;
	}

	async getEvents(
		type?: string,
		limit?: number,
		offset?: number,
		startDate?: string,
		endDate?: string,
	): Promise<AnalyticsEvent[]> {
		const response = await this.workers.analytics.getEvents(
			type,
			limit,
			offset,
			startDate,
			endDate,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch events");
		}
		return response.data;
	}

	async getEvent(id: string): Promise<AnalyticsEvent> {
		const response = await this.workers.analytics.getEvent(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch event");
		}
		return response.data;
	}

	async getSummary(
		days?: number,
		type?: string,
	): Promise<{
		totalEvents: number;
		uniqueVisitors: number;
		uniqueSessions: number;
		byType: Record<string, number>;
		byDate: Record<string, number>;
		period: { days: number; start: string; end: string };
	}> {
		const response = await this.workers.analytics.getSummary(days, type);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch summary");
		}
		return response.data;
	}

	async getTimeline(
		days?: number,
		type?: string,
	): Promise<
		Array<{ date: string; count: number; types: Record<string, number> }>
	> {
		const response = await this.workers.analytics.getTimeline(days, type);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch timeline");
		}
		return response.data;
	}

	async getPageViewStats(
		days?: number,
		limit?: number,
	): Promise<Array<{ path: string; title: string; count: number }>> {
		const response = await this.workers.analytics.getPageViewStats(
			days,
			limit,
		);
		if (!response.success || !response.data) {
			throw new Error(
				response.error || "Failed to fetch page view stats",
			);
		}
		return response.data;
	}

	async getEventStats(days?: number): Promise<{
		byType: Record<string, number>;
		byBrowser: Record<string, number>;
		byOS: Record<string, number>;
	}> {
		const response = await this.workers.analytics.getEventStats(days);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch event stats");
		}
		return response.data;
	}

	async getSessionStats(days?: number): Promise<{
		totalSessions: number;
		avgEventsPerSession: number;
		sessionsByEventCount: Record<string, number>;
	}> {
		const response = await this.workers.analytics.getSessionStats(days);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch session stats");
		}
		return response.data;
	}
}

export const analyticsAPI = new AnalyticsAPI();
