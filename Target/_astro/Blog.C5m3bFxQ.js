import { b2 as reactExports, b1 as jsxDevRuntimeExports } from './Vendor/React.D_hnTAe2.js';

function ThemeIcon({
  src,
  alt = "",
  width,
  height,
  className,
  ...props
}) {
  const [isDark, setIsDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    const initial = root.classList.contains("dark");
    setIsDark(initial);
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const themeSrc = isDark ? src.replace(/^\/Image\//, "/Dark/Image/") : src;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "img",
    {
      src: themeSrc,
      alt,
      width,
      height,
      className,
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Library/Theme/ThemeIcon.tsx",
      lineNumber: 57,
      columnNumber: 3
    },
    this
  );
}

const Blog$2 = {
  "meta.title": "Блог | Code Editor Land",
  "meta.description": "Задълбочени архитектурни анализи, бележки за версии и актуализации.",
  "page.title": "Блог",
  "page.subtitle": "Архитектура, версии и пътят напред.",
  "card.readMore": "Прочетете повече",
  "card.minRead": "мин. четене",
  "empty.title": "Няма публикации все още",
  "empty.subtitle": "Проверете отново скоро за актуализации.",
};

const Blog$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Blog$2
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Универсален бинарен файл: Apple Silicon и Intel"},"windows":{"description":"64-битов (x64)","title":"Windows"}}};
const page = {"subtitle":"Нативен на macOS, Windows и Linux.\n\nБез разходи, без проследяване, пълна поддръжка на VS Code разширения.","title":"Изтеглете Land"};
const previousReleases = {"description":"Изтеглете по-стара версия, ако трябва да се закачите за конкретно издание.","title":"Предишни версии"};
const subtitle = "Нативен на macOS, Windows и Linux.\n\nИзграден с Tauri. Задвижван от Rust. Верифициран с PGP.";
const systemRequirements = {"minimum":"Минимални изисквания","recommended":"Препоръчителни за най-добро изживяване","subtitle":"Бърза проверка преди изтеглянето спестява преинсталация по-късно.","supportedOS":"Поддържани операционни системи","title":"Системни изисквания"};
const title = "Изтеглете Land";
const verification = {"description":"Всяко издание на Land е PGP-подписано преди да бъде публикувано.\n\nПроверете изтеглянето си и се уверете, че сте получили точно това, което е компилирано.","downloadButton":"Изтеглете публичния PGP ключ","title":"Всяко издание е подписано. Проверете вашето.","verifyButton":"Проверете изтеглянето"};
const labels = {"version":"Версия:","size":"Размер:","requirements":"Изисквания:","loading":"Зареждане на наличните изтегляния...","errorTitle":"Неуспешно зареждане на изтегляния","downloadFailed":"Изтеглянето неуспешно. Моля, опитайте отново.","downloadFor":"Изтеглете за {{platform}}","copiedToClipboard":"{{label}} е копирано в клипборда.","failedToCopy":"Неуспешно копиране на {{label}}","sha256Checksum":"SHA-256 контролна сума","pgpSignature":"PGP подпис","verificationInstructions":"Инструкции за проверка","downloadVerification":"Проверка на изтеглянето","integrityCheck":"Проверка на целостта","copy":"Копиране","signedWithKeyId":"Подписано с ключ ID: {{keyId}}"};
const transparency = {"title":"Нищо скрито. Пълно разкриване на билда.","subtitle":"Нулева телеметрия по подразбиране. Варианти на билда, цели за внедряване и ключове за подписване са публични.\n\nПроверете всичко в изходния код."};
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

const Blog = {
  "meta.title": "Blog | Code Editor Land",
  "meta.description": "Análisis de arquitectura, notas de versión y actualizaciones.",
  "page.title": "Blog",
  "page.subtitle": "Arquitectura, versiones y el camino por delante.",
  "card.readMore": "Leer más",
  "card.minRead": "min de lectura",
  "empty.title": "Sin publicaciones aún",
  "empty.subtitle": "Vuelva pronto para ver actualizaciones.",
};

const Blog$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Blog
}, Symbol.toStringTag, { value: 'Module' }));

export { Blog$3 as B, Download$1 as D, ThemeIcon as T, Blog$1 as a };
//# sourceMappingURL=Blog.C5m3bFxQ.js.map
