const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/Footer.J6XKs53r.js","_astro/Vendor/React.D_hnTAe2.js","_astro/Blog.C5m3bFxQ.js","_astro/Verify.D2u08mPO.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './Footer.xysLliKW.js';
import { b0 as instance, a$ as initReactI18next } from './Vendor/React.D_hnTAe2.js';

const SupportedLocaleList = ["en", "bg", "de", "fr", "es"];
const LocaleLabel = {
  en: "English",
  bg: "Bulgarian",
  de: "Deutsch",
  fr: "Français",
  es: "Español"
};
const NamespaceList = [
  "blog",
  "common",
  "doc",
  "home",
  "download",
  "account",
  "verify",
  "header",
  "footer",
  "meta"
];
const CoreNamespaceList = [
  "common",
  "header",
  "footer",
  "meta"
];
function DetectLocale() {
  if (typeof window === "undefined") return "en";
  const Parameter = new URL(window.location.href).searchParams.get("lng");
  if (Parameter && SupportedLocaleList.includes(Parameter))
    return Parameter;
  const Cookie = document.cookie.match(/LOCALE=([^;]+)/);
  if (Cookie?.[1] && SupportedLocaleList.includes(Cookie[1]))
    return Cookie[1];
  return "en";
}
const LoadEnglishCore = async () => {
  const [common, header, footer, meta] = await Promise.all([
    __vitePreload(() => import('./Common.uqp6zVfr.js'),true              ?[]:void 0),
    __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.H),true              ?[]:void 0),
    __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.F),true              ?[]:void 0),
    __vitePreload(() => import('./Verify.BO4Kf6C-.js').then(n => n.M),true              ?[]:void 0)
  ]);
  return {
    common: common.default,
    header: header.default,
    footer: footer.default,
    meta: meta.default
  };
};
const FullLocaleLoader = {
  en: async () => {
    const [
      blog,
      common,
      doc,
      home,
      download,
      account,
      verify,
      header,
      footer,
      meta
    ] = await Promise.all([
      __vitePreload(() => import('./Footer.J6XKs53r.js').then(n => n.B),true              ?__vite__mapDeps([0,1]):void 0),
      __vitePreload(() => import('./Common.uqp6zVfr.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.J6XKs53r.js').then(n => n.D),true              ?__vite__mapDeps([0,1]):void 0),
      __vitePreload(() => import('./Home.CONBvKKl.js'),true              ?[]:void 0),
      __vitePreload(() => Promise.resolve().then(() => Download$1),true              ?void 0:void 0),
      __vitePreload(() => import('./Account.ZzbKBeHF.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Header.DdiCoAwe.js').then(n => n.V),true              ?[]:void 0),
      __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.H),true              ?[]:void 0),
      __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.F),true              ?[]:void 0),
      __vitePreload(() => import('./Verify.BO4Kf6C-.js').then(n => n.M),true              ?[]:void 0)
    ]);
    return {
      blog: blog.default,
      common: common.default,
      doc: doc.default,
      home: home.default,
      download: download.default,
      account: account.default,
      verify: verify.default,
      header: header.default,
      footer: footer.default,
      meta: meta.default
    };
  },
  bg: async () => {
    const [
      blog,
      common,
      doc,
      home,
      download,
      account,
      verify,
      header,
      footer,
      meta
    ] = await Promise.all([
      __vitePreload(() => import('./Blog.C5m3bFxQ.js').then(n => n.B),true              ?__vite__mapDeps([2,1]):void 0),
      __vitePreload(() => import('./Common.x2Pb7Nnb.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.D),true              ?[]:void 0),
      __vitePreload(() => import('./Home.Cz8tqleV.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Blog.C5m3bFxQ.js').then(n => n.D),true              ?__vite__mapDeps([2,1]):void 0),
      __vitePreload(() => import('./Account.DORmo9O0.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Verify.BO4Kf6C-.js').then(n => n.V),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.CtLvbtvI.js').then(n => n.H),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.F),true              ?[]:void 0),
      __vitePreload(() => import('./Meta.CdNceQdM.js').then(n => n.M),true              ?[]:void 0)
    ]);
    return {
      blog: blog.default,
      common: common.default,
      doc: doc.default,
      home: home.default,
      download: download.default,
      account: account.default,
      verify: verify.default,
      header: header.default,
      footer: footer.default,
      meta: meta.default
    };
  },
  de: async () => {
    const [
      blog,
      common,
      doc,
      home,
      download,
      account,
      verify,
      header,
      footer,
      meta
    ] = await Promise.all([
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.B),true              ?[]:void 0),
      __vitePreload(() => import('./Common.tQJUb4fE.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.J6XKs53r.js').then(n => n.b),true              ?__vite__mapDeps([0,1]):void 0),
      __vitePreload(() => import('./Home.CsEHCEt6.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.D),true              ?[]:void 0),
      __vitePreload(() => import('./Account.PrGBk2To.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Meta.gaUI57FL.js').then(n => n.V),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.CtLvbtvI.js').then(n => n.a),true              ?[]:void 0),
      __vitePreload(() => import('./Header.DdiCoAwe.js').then(n => n.F),true              ?[]:void 0),
      __vitePreload(() => import('./Meta.CNzdzwuG.js').then(n => n.M),true              ?[]:void 0)
    ]);
    return {
      blog: blog.default,
      common: common.default,
      doc: doc.default,
      home: home.default,
      download: download.default,
      account: account.default,
      verify: verify.default,
      header: header.default,
      footer: footer.default,
      meta: meta.default
    };
  },
  fr: async () => {
    const [
      blog,
      common,
      doc,
      home,
      download,
      account,
      verify,
      header,
      footer,
      meta
    ] = await Promise.all([
      __vitePreload(() => import('./Blog.sE4GWs2E.js').then(n => n.B),true              ?[]:void 0),
      __vitePreload(() => import('./Common.dSNSOTVG.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.a),true              ?[]:void 0),
      __vitePreload(() => import('./Home.sn1wD6EA.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.CtLvbtvI.js').then(n => n.D),true              ?[]:void 0),
      __vitePreload(() => import('./Account.65SpJ2rW.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Meta.CNzdzwuG.js').then(n => n.V),true              ?[]:void 0),
      __vitePreload(() => import('./Header.DdiCoAwe.js').then(n => n.H),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.J6XKs53r.js').then(n => n.F),true              ?__vite__mapDeps([0,1]):void 0),
      __vitePreload(() => import('./Meta.gaUI57FL.js').then(n => n.M),true              ?[]:void 0)
    ]);
    return {
      blog: blog.default,
      common: common.default,
      doc: doc.default,
      home: home.default,
      download: download.default,
      account: account.default,
      verify: verify.default,
      header: header.default,
      footer: footer.default,
      meta: meta.default
    };
  },
  es: async () => {
    const [
      blog,
      common,
      doc,
      home,
      download,
      account,
      verify,
      header,
      footer,
      meta
    ] = await Promise.all([
      __vitePreload(() => import('./Blog.C5m3bFxQ.js').then(n => n.a),true              ?__vite__mapDeps([2,1]):void 0),
      __vitePreload(() => import('./Common.DqbFBdeh.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.b),true              ?[]:void 0),
      __vitePreload(() => import('./Home.DL20Iggp.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.xysLliKW.js').then(n => n.c),true              ?[]:void 0),
      __vitePreload(() => import('./Account.Cj_ZDEUa.js'),true              ?[]:void 0),
      __vitePreload(() => import('./Verify.D2u08mPO.js').then(n => n.V),true              ?__vite__mapDeps([3,1]):void 0),
      __vitePreload(() => import('./Header.DdiCoAwe.js').then(n => n.a),true              ?[]:void 0),
      __vitePreload(() => import('./Footer.CtLvbtvI.js').then(n => n.F),true              ?[]:void 0),
      __vitePreload(() => import('./Meta.CdNceQdM.js').then(n => n.a),true              ?[]:void 0)
    ]);
    return {
      blog: blog.default,
      common: common.default,
      doc: doc.default,
      home: home.default,
      download: download.default,
      account: account.default,
      verify: verify.default,
      header: header.default,
      footer: footer.default,
      meta: meta.default
    };
  }
};
function AddResources(Locale, Bundles) {
  for (const NS of NamespaceList) {
    if (Bundles[NS]) {
      instance.addResourceBundle(Locale, NS, Bundles[NS], true, true);
    }
  }
}
const DetectedLocale = DetectLocale();
instance.use(initReactI18next).init({
  resources: {},
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  ns: [...CoreNamespaceList],
  partialBundledLanguages: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});
const InitI18n = async () => {
  const EnglishCoreBundle = await LoadEnglishCore();
  AddResources("en", EnglishCoreBundle);
  if (DetectedLocale !== "en") {
    const SwitchAfterHydration = async () => {
      try {
        const FullBundle = await FullLocaleLoader[DetectedLocale]();
        AddResources(DetectedLocale, FullBundle);
        await instance.changeLanguage(DetectedLocale);
      } catch {
      }
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        SwitchAfterHydration();
      });
    } else {
      setTimeout(() => {
        SwitchAfterHydration();
      }, 0);
    }
  }
};
InitI18n();
const SwitchLocale = async (Locale) => {
  const AllLoaded = NamespaceList.every(
    (NS) => instance.hasResourceBundle(Locale, NS)
  );
  if (!AllLoaded) {
    const Bundle = await FullLocaleLoader[Locale]();
    AddResources(Locale, Bundle);
  }
  await instance.changeLanguage(Locale);
  document.cookie = `LOCALE=${Locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Universal Binary: Apple Silicon and Intel"},"windows":{"description":"64-bit (x64)","title":"Windows"}}};
const page = {"subtitle":"Native on macOS, Windows, and Linux.\n\nZero cost, zero tracking, full VS Code extension support.","title":"Download Land"};
const previousReleases = {"description":"Download an older version if you need to pin to a specific release.","title":"Previous Releases"};
const subtitle = "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.";
const systemRequirements = {"minimum":"Minimum Requirements","recommended":"Recommended for the Best Experience","subtitle":"A quick check before you download saves a reinstall later.","supportedOS":"Supported Operating Systems","title":"System Requirements"};
const title = "Download Land";
const verification = {"description":"Every Land release is PGP-signed before it ships.\n\nVerify your download to confirm you got exactly what was built.","downloadButton":"Download PGP Public Key","title":"Every Release is Signed. Verify Yours.","verifyButton":"Verify Download"};
const labels = {"version":"Version:","size":"Size:","requirements":"Requirements:","loading":"Loading available downloads...","errorTitle":"Could not load downloads","downloadFailed":"Download failed. Please try again.","downloadFor":"Download for {{platform}}","copiedToClipboard":"{{label}} copied to clipboard.","failedToCopy":"Could not copy {{label}}","sha256Checksum":"SHA-256 Checksum","pgpSignature":"PGP Signature","verificationInstructions":"Verification Instructions","downloadVerification":"Download Verification","integrityCheck":"Integrity Check","copy":"Copy","signedWithKeyId":"Signed with key ID {{keyId}}"};
const transparency = {"title":"VS Code Phones Home. Land Does Not.","subtitle":"VS Code (not VSCodium) embeds Microsoft telemetry at the network call level. Disabling it via settings reduces what is sent - it does not remove the code paths.\n\nThe Telemetry feature is not in Land's default build. When it is not compiled in, the code does not exist. Nothing to disable."};
const Download = {
  card,
  page,
  previousReleases,
  subtitle,
  systemRequirements,
  title,
  verification,
  labels,
  transparency,
};

const Download$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	card,
	default: Download,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	transparency,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

export { LocaleLabel as L, SupportedLocaleList as S, SwitchLocale as a };
//# sourceMappingURL=Base.astro_astro_type_script_index_1_lang.CInZXfel.js.map
