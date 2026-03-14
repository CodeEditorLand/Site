"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

import { getWorkersClient } from "../../Lib/workers-client";

interface AnalyticsContextType {
	track: (
		event: string,
		properties?: Record<string, unknown>,
	) => Promise<void>;
	trackPageView: (path: string, title?: string) => Promise<void>;
	identify: (
		userId: string,
		traits?: Record<string, unknown>,
	) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
	const [client, setClient] = useState<ReturnType<
		typeof getWorkersClient
	> | null>(null);

	useEffect(() => {
		try {
			setClient(getWorkersClient());
		} catch (error) {
			console.error("Failed to initialize analytics client:", error);
		}
	}, []);

	const track = async (
		event: string,
		properties: Record<string, unknown> = {},
	) => {
		if (!client) {
			console.warn("Analytics client not initialized");
			return;
		}

		try {
			await client.analytics.track(event, properties);
		} catch (error) {
			console.error("Failed to track event:", error);
		}
	};

	const trackPageView = async (path: string, title?: string) => {
		await track("pageview", {
			path,
			title,
			timestamp: new Date().toISOString(),
		});
	};

	const identify = async (
		userId: string,
		traits: Record<string, unknown> = {},
	) => {
		await track("user_identified", { userId, ...traits });
	};

	const value: AnalyticsContextType = {
		track,
		trackPageView,
		identify,
	};

	return (
		<AnalyticsContext.Provider value={value}>
			{children}
		</AnalyticsContext.Provider>
	);
}

export function useAnalytics() {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error(
			"useAnalytics must be used within an AnalyticsProvider",
		);
	}
	return context;
}
