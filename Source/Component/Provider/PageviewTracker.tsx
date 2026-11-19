"use client";

import { useEffect, useRef, useState } from "react";

import { UseAnalytics } from "./AnalyticsProvider";

/**
 * The router's listeners, installed once.
 *
 * ─── WHY THIS IS MODULE-LEVEL AND NOT PER-INSTANCE ────────────────────────
 * The tracker used to patch `history.pushState` and `history.replaceState` from
 * inside its own effect and restore them on cleanup. With one tracker that is
 * correct. With two - a second island, a preview, a surface that mounts its own
 * - the second tracker captured the FIRST one's patched functions as the
 * "originals", and whichever unmounted first restored a function the other had
 * already replaced. The result was a pageview per route change becoming a
 * pageview per tracker, and a restored router that was not the browser's.
 *
 * The listeners now belong to the module: the first tracker installs them, the
 * last one removes them, and a second tracker joins the set. One route change is
 * one event however many trackers are mounted.
 */
type Publish = (Path: string, Title: string) => void;

const Subscribers = new Set<Publish>();

let Installed = false;

let OriginalPushState: typeof history.pushState | null = null;

let OriginalReplaceState: typeof history.replaceState | null = null;

/** The location the last event was published for, so a mount cannot repeat it. */
let LastPublished: string | null = null;

const KeyOf = (): string =>
	`${window.location.pathname}\u2001${document.title}`;

/** One event for the location the reader is on now. */
const Publish = () => {
	const Path = window.location.pathname;

	const Title = document.title;

	LastPublished = `${Path}\u2001${Title}`;

	for (const Send of Subscribers) Send(Path, Title);
};

/**
 * One event for the location, unless it has already been published.
 *
 * A tracker that mounts after a route change would otherwise send the same
 * pageview twice - and a tracker whose effect re-runs (the analytics context's
 * value is rebuilt on every provider render) would send it again on every pass.
 */
const PublishOnce = () => {
	if (LastPublished === KeyOf()) return;

	Publish();
};

const Install = () => {
	if (Installed) return;

	Installed = true;

	OriginalPushState = history.pushState;

	OriginalReplaceState = history.replaceState;

	history.pushState = function (...Arguments) {
		OriginalPushState?.apply(this, Arguments);

		Publish();
	};

	history.replaceState = function (...Arguments) {
		OriginalReplaceState?.apply(this, Arguments);

		Publish();
	};

	window.addEventListener("popstate", Publish);
};

const Remove = () => {
	if (!Installed || Subscribers.size > 0) return;

	Installed = false;

	if (OriginalPushState) history.pushState = OriginalPushState;

	if (OriginalReplaceState) history.replaceState = OriginalReplaceState;

	window.removeEventListener("popstate", Publish);

	OriginalPushState = null;

	OriginalReplaceState = null;
};

const PageviewTracker = () => {
	const Analytics = UseAnalytics();

	const [IsMounted, SetIsMounted] = useState(false);

	/** Whether this tracker has already sent the page it mounted on. */
	const HasTrackedReference = useRef(false);

	useEffect(() => {
		SetIsMounted(true);
	}, []);

	useEffect(() => {
		if (!Analytics || !IsMounted) return;

		const Send: Publish = (Path, Title) => {
			Analytics.trackPageView(Path, Title).catch((TrackError: Error) => {
				if (process.env["NODE_ENV"] !== "production") {
					console.error("Failed to track page view:", TrackError);
				}
			});
		};

		Subscribers.add(Send);

		Install();

		if (!HasTrackedReference.current) {
			HasTrackedReference.current = true;

			PublishOnce();
		}

		return () => {
			Subscribers.delete(Send);

			Remove();
		};
	}, [IsMounted, Analytics]);

	return null;
};

export { PageviewTracker };

export default PageviewTracker;
