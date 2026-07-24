//#region Source/Function/Noise/Parallax.ts
var CachedScrollProgress = 0;
var UpdateScrollCache = () => {
	const ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const ScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	CachedScrollProgress = ScrollHeight <= 0 ? 0 : Math.min(1, Math.max(0, ScrollTop / ScrollHeight));
};
if (typeof window !== "undefined") {
	window.addEventListener("scroll", UpdateScrollCache, { passive: true });
	UpdateScrollCache();
}
var UpdateScrollProgress = (Root) => {
	Root.setProperty("--ScrollProgress", String(CachedScrollProgress));
};
var Parallax_default = { UpdateScrollProgress };
//#endregion
export { Parallax_default as default };
