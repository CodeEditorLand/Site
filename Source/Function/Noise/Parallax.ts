// ─── Scroll progress cache ────────────────────────────────────────────────────
//
// Reading scrollTop / scrollHeight / clientHeight inside rAF after setProperty
// calls (which invalidate style) triggers a forced synchronous layout on every
// frame — measured at 2,467 ms total reflow cost in production traces.
//
// Fix: maintain a passive scroll listener that caches the value between frames.
// The rAF callback never reads layout properties; it only writes the cached one.
// ─────────────────────────────────────────────────────────────────────────────

let CachedScrollProgress = 0;

const UpdateScrollCache = (): void => {
	const ScrollTop =
		document.documentElement.scrollTop || document.body.scrollTop;
	const ScrollHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	CachedScrollProgress =
		ScrollHeight <= 0
			? 0
			: Math.min(1, Math.max(0, ScrollTop / ScrollHeight));
};

if (typeof window !== "undefined") {
	window.addEventListener("scroll", UpdateScrollCache, { passive: true });
	UpdateScrollCache();
}

const UpdateScrollProgress = (Root: CSSStyleDeclaration): void => {
	Root.setProperty("--ScrollProgress", String(CachedScrollProgress));
};

export default { UpdateScrollProgress };
