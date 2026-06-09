let CachedScrollProgress = 0;
const UpdateScrollCache = () => {
  const ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const ScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  CachedScrollProgress = ScrollHeight <= 0 ? 0 : Math.min(1, Math.max(0, ScrollTop / ScrollHeight));
};
if (typeof window !== "undefined") {
  window.addEventListener("scroll", UpdateScrollCache, { passive: true });
  UpdateScrollCache();
}
const UpdateScrollProgress = (Root) => {
  Root.setProperty("--ScrollProgress", String(CachedScrollProgress));
};
const Parallax = { UpdateScrollProgress };

export { Parallax as default };
//# sourceMappingURL=Parallax.BTqxBt7K.js.map
