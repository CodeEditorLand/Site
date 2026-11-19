"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

import { GetWorkersClient } from "../../Library/WorkerClient";

/**
 * The runtime's own state, as the context reports it.
 *
 * `LIVE` is a client that arrived; `PENDING` is the frame before the effect ran;
 * `BLOCKED` is a client that never arrived because `GetWorkersClient()` threw -
 * an ad-blocker, a dead network, a refused request.
 */
export type AnalyticsAvailability = "PENDING" | "LIVE" | "BLOCKED";

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

	/**
	 * Whether a call will reach the client.
	 *
	 * The three calls are no-ops when no client arrived, and they always were -
	 * what was missing was the fact. A consumer could not tell a delivered event
	 * from a dropped one, because the provider that exists to make the runtime's
	 * state legible was the one part of the runtime with no state to read. A
	 * surface that wants to state its own telemetry status now prints this
	 * instead of guessing.
	 */
	available: boolean;

	/** Why not, when `available` is false. `LIVE` when it is true. */
	reason: AnalyticsAvailability;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
	const [Client, SetClient] = useState<ReturnType<
		typeof GetWorkersClient
	> | null>(null);

	const [Availability, SetAvailability] =
		useState<AnalyticsAvailability>("PENDING");

	useEffect(() => {
		try {
			SetClient(GetWorkersClient());

			SetAvailability("LIVE");
		} catch {
			SetAvailability("BLOCKED");

			if (import.meta.env.DEV) {
				console.warn(
					"Analytics: initialization blocked (ad-blocker or network unavailable)",
				);
			}
		}
	}, []);

	const Track = async (
		Event: string,

		Properties: Record<string, unknown> = {},
	) => {
		if (!Client) return;

		try {
			await Client.Analytics.Track(Event, Properties);
		} catch {
			if (import.meta.env.DEV) {
				console.warn("Analytics: failed to track event");
			}
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

		available: Availability === "LIVE",

		reason: Availability,
	};

	return (
		<AnalyticsContext.Provider value={Value}>
			{children}
		</AnalyticsContext.Provider>
	);
};

const UseAnalytics = () => useContext(AnalyticsContext);

export { AnalyticsProvider, UseAnalytics };

export default AnalyticsProvider;
