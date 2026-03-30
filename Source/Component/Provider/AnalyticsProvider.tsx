"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

import { getWorkersClient } from "../../Library/workers-client";

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
	const [Client, SetClient] = useState<ReturnType<
		typeof getWorkersClient
	> | null>(null);

	useEffect(() => {
		try {
			SetClient(getWorkersClient());
		} catch (AnalyticsError) {
			console.error("Failed to initialize analytics client:", AnalyticsError);
		}
	}, []);

	const Track = async (
		Event: string,
		Properties: Record<string, unknown> = {},
	) => {
		if (!Client) {
			console.warn("Analytics client not initialized");
			return;
		}

		try {
			await Client.analytics.track(Event, Properties);
		} catch (TrackError) {
			console.error("Failed to track event:", TrackError);
		}
	};

	const TrackPageView = async (Path: string, Title?: string) => {
		await Track("pageview", {
			path: Path,
			title: Title,
			timestamp: new Date().toISOString(),
		});
	};

	const Identify = async (
		UserIdentifier: string,
		Traits: Record<string, unknown> = {},
	) => {
		await Track("user_identified", { userId: UserIdentifier, ...Traits });
	};

	const Value: AnalyticsContextType = {
		track: Track,
		trackPageView: TrackPageView,
		identify: Identify,
	};

	return (
		<AnalyticsContext.Provider value={Value}>
			{children}
		</AnalyticsContext.Provider>
	);
}

export function useAnalytics() {
	const Context = useContext(AnalyticsContext);
	if (!Context) {
		throw new Error(
			"useAnalytics must be used within an AnalyticsProvider",
		);
	}
	return Context;
}
