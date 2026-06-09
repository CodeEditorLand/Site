import { _ as __vitePreload } from './Footer.xysLliKW.js';

const RedirectFromRouteMap$1 = async () => {
  const CurrentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  if (CurrentPath === "/") {
    return;
  }
  try {
    const Response = await fetch("/RouteMap.json");
    if (!Response.ok) {
      return;
    }
    const RouteMap = await Response.json();
    if (RouteMap.Canonical.includes(CurrentPath)) {
      return;
    }
    let CanonicalPath = RouteMap.Variant[CurrentPath];
    if (!CanonicalPath) {
      CanonicalPath = RouteMap.Variant[CurrentPath.toLowerCase()];
    }
    if (!CanonicalPath) {
      const Stripped = CurrentPath.toLowerCase().replace(/[-_]/g, "");
      CanonicalPath = RouteMap.Variant[Stripped];
    }
    if (!CanonicalPath) {
      const Singular = CurrentPath.toLowerCase().replace(/s$/, "");
      CanonicalPath = RouteMap.Variant[Singular];
    }
    if (CanonicalPath && CanonicalPath !== CurrentPath) {
      const Target = new URL(CanonicalPath, window.location.origin);
      Target.search = window.location.search;
      Target.hash = window.location.hash;
      window.location.replace(Target.href);
      return;
    }
  } catch {
  }
};

const Redirect = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: RedirectFromRouteMap$1
}, Symbol.toStringTag, { value: 'Module' }));

const Notice = document.getElementById("RouteRedirectNotice");
if (Notice) {
  Notice.classList.remove("hidden");
}
const RedirectFromRouteMap = (await __vitePreload(async () => { const {default: __vite_default__} = await Promise.resolve().then(() => Redirect);return { default: __vite_default__ }},true              ?void 0:void 0)).default;
await RedirectFromRouteMap();
if (Notice) {
  Notice.classList.add("hidden");
}
//# sourceMappingURL=404.astro_astro_type_script_index_0_lang.BEHAEnx8.js.map
