const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/Staccato.C01-Mbs-.js","_astro/Footer.xysLliKW.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './Footer.xysLliKW.js';

const ReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
if (!ReducedMotion) {
  const Staccato = await __vitePreload(() => import('./Staccato.C01-Mbs-.js'),true              ?__vite__mapDeps([0,1]):void 0);
  const Engine = await Staccato.default;
  Engine.Start();
  const Seed = () => Engine.SeedSelector('[class*="Staccato"]');
  const SeedAfterLoad = () => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(Seed);
    } else {
      setTimeout(Seed, 0);
    }
  };
  if (document.readyState === "complete") {
    SeedAfterLoad();
  } else {
    window.addEventListener("load", SeedAfterLoad, {
      once: true
    });
  }
}
//# sourceMappingURL=Base.astro_astro_type_script_index_4_lang.Bn9jy2La.js.map
