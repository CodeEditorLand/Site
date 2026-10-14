export default interface AnalyticsEvent {
	id: string;

	type: "pageview" | "download" | "click" | "error" | "custom";

	userId?: string;

	sessionId?: string;

	properties: Record<string, unknown>;

	timestamp: string;
}
