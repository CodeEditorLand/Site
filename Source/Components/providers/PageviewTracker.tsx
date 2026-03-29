"use client";

import { useEffect, useRef, useState } from "react";

import { useAnalytics } from "./AnalyticsProvider";

export function PageviewTracker() {
	const [isMounted, setIsMounted] = useState(false);
	const hasTrackedRef = useRef(false);
	const trackPageViewRef = useRef<
		((path: string, title?: string) => Promise<void>) | null
	>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;

		// Get the trackPageView function after mount
		const { trackPageView } = useAnalytics();
		trackPageViewRef.current = trackPageView;

		const handleRouteChange = () => {
			if (hasTrackedRef.current) return;
			hasTrackedRef.current = true;

			try {
				const path = window.location.pathname;
				const title = document.title;
				trackPageViewRef.current?.(path, title).catch((err: Error) => {
					if (process.env.NODE_ENV !== "production") {
						console.error("Failed to track page view:", err);
					}
				});
			} catch (err) {
				if (process.env.NODE_ENV !== "production") {
					console.error("Failed to track page view:", err);
				}
			}
		};

		// Track initial page load
		handleRouteChange();

		// Listen for route changes (SPA navigation)
		const handlePopState = () => {
			hasTrackedRef.current = false;
			handleRouteChange();
		};

		window.addEventListener("popstate", handlePopState);

		// For Astro's client-side routing
		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		history.pushState = function (...args) {
			originalPushState.apply(this, args);
			hasTrackedRef.current = false;
			handleRouteChange();
		};

		history.replaceState = function (...args) {
			originalReplaceState.apply(this, args);
			hasTrackedRef.current = false;
			handleRouteChange();
		};

		return () => {
			window.removeEventListener("popstate", handlePopState);
			history.pushState = originalPushState;
			history.replaceState = originalReplaceState;
		};
	}, [isMounted]);

	return null;
}
