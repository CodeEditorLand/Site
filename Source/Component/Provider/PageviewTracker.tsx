"use client";

import { useEffect, useRef, useState } from "react";

import { useAnalytics } from "./AnalyticsProvider";

const PageviewTracker = () => {
	const [IsMounted, SetIsMounted] = useState(false);
	const HasTrackedReference = useRef(false);
	const TrackPageViewReference = useRef<
		((Path: string, Title?: string) => Promise<void>) | null
	>(null);

	useEffect(() => {
		SetIsMounted(true);
	}, []);

	useEffect(() => {
		if (!IsMounted) return;

		const { trackPageView: TrackPageView } = useAnalytics();
		TrackPageViewReference.current = TrackPageView;

		const HandleRouteChange = () => {
			if (HasTrackedReference.current) return;
			HasTrackedReference.current = true;

			try {
				const CurrentPath = window.location.pathname;
				const CurrentTitle = document.title;
				TrackPageViewReference.current?.(
					CurrentPath,
					CurrentTitle,
				).catch((TrackError: Error) => {
					if (process.env["NODE_ENV"] !== "production") {
						console.error("Failed to track page view:", TrackError);
					}
				});
			} catch (TrackError) {
				if (process.env["NODE_ENV"] !== "production") {
					console.error("Failed to track page view:", TrackError);
				}
			}
		};

		HandleRouteChange();

		const HandlePopState = () => {
			HasTrackedReference.current = false;
			HandleRouteChange();
		};

		window.addEventListener("popstate", HandlePopState);

		const OriginalPushState = history.pushState;
		const OriginalReplaceState = history.replaceState;

		history.pushState = function (...Arguments) {
			OriginalPushState.apply(this, Arguments);
			HasTrackedReference.current = false;
			HandleRouteChange();
		};

		history.replaceState = function (...Arguments) {
			OriginalReplaceState.apply(this, Arguments);
			HasTrackedReference.current = false;
			HandleRouteChange();
		};

		return () => {
			window.removeEventListener("popstate", HandlePopState);
			history.pushState = OriginalPushState;
			history.replaceState = OriginalReplaceState;
		};
	}, [IsMounted]);

	return null;
};

export { PageviewTracker };

export default PageviewTracker;
