"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

import { GetWorkersClient } from "../../Library/WorkerClient";

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

const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
	const [Client, SetClient] = useState<ReturnType<
		typeof GetWorkersClient
	> | null>(null);

	useEffect(() => {
		try {
			SetClient(GetWorkersClient());
		} catch (AnalyticsError) {
			console.error(
				"Failed to initialize analytics client:",
				AnalyticsError,
			);
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
			await Client.Analytics.Track(Event, Properties);
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
};

const UseAnalytics = () => {
	const Context = useContext(AnalyticsContext);
	if (!Context) {
		throw new Error(
			"UseAnalytics must be used within an AnalyticsProvider",
		);
	}
	return Context;
};

export { AnalyticsProvider, UseAnalytics };

export default AnalyticsProvider;
