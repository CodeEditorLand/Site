const scriptRel = /* @__PURE__ */ (function detectScriptRel() {
	const relList = typeof document !== "undefined" && document.createElement("link").relList;
	return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
})();const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (true               && deps && deps.length > 0) {
		document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises$2) {
			return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
				status: "fulfilled",
				value: value$1
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
			if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err$2) {
		const e$1 = new Event("vite:preloadError", { cancelable: true });
		e$1.payload = err$2;
		window.dispatchEvent(e$1);
		if (!e$1.defaultPrevented) throw err$2;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};

const Doc$4 = {
  "sidebar.title": "Документация",
  "sidebar.elements": "Елементи",
  "sidebar.gettingStarted": "Начало",
};

const Doc$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc$4
}, Symbol.toStringTag, { value: 'Module' }));

const Blog = {
  "meta.title": "Blog | Code Editor Land",
  "meta.description": "Architektur-Einblicke, Release-Notizen und Neuigkeiten.",
  "page.title": "Blog",
  "page.subtitle": "Architektur, Releases und der Weg nach vorne.",
  "card.readMore": "Mehr lesen",
  "card.minRead": "Min. Lesezeit",
  "empty.title": "Noch keine Beiträge",
  "empty.subtitle": "Schauen Sie bald wieder vorbei für Updates.",
};

const Blog$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Blog
}, Symbol.toStringTag, { value: 'Module' }));

const Doc$2 = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Éléments",
  "sidebar.gettingStarted": "Premiers pas",
};

const Doc$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc$2
}, Symbol.toStringTag, { value: 'Module' }));

const Doc = {
  "sidebar.title": "Documentación",
  "sidebar.elements": "Elementos",
  "sidebar.gettingStarted": "Primeros pasos",
};

const Doc$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Binario universal"},"windows":{"description":"64 bits (x64)","title":"Windows"}}};
const page = {"subtitle":"Nativo en macOS, Windows y Linux.\n\nGratuito, sin rastreo, compatibilidad total con extensiones de VS Code.","title":"Descargar Land"};
const previousReleases = {"description":"Descargue una versión anterior si necesita fijar a una versión específica.","title":"Versiones anteriores"};
const subtitle = "Nativo en macOS, Windows y Linux.\n\nConstruido con Tauri. Impulsado por Rust. Verificado con PGP.";
const systemRequirements = {"minimum":"Requisitos mínimos","recommended":"Recomendado para la mejor experiencia","subtitle":"Una verificación rápida antes de descargar evita una reinstalación.","supportedOS":"Sistemas operativos compatibles","title":"Requisitos del sistema"};
const title = "Descargar Land";
const verification = {"description":"Cada versión de Land está firmada con PGP antes de su distribución.\n\nVerifique su descarga para confirmar que obtuvo exactamente lo que fue compilado.","downloadButton":"Descargar clave PGP pública","title":"Cada versión está firmada. Verifique la suya.","verifyButton":"Verificar descarga"};
const labels = {"version":"Versión:","size":"Tamaño:","requirements":"Requisitos:","loading":"Cargando descargas disponibles...","errorTitle":"No se pudieron cargar las descargas","downloadFailed":"Descarga fallida. Por favor, inténtelo de nuevo.","downloadFor":"Descargar para {{platform}}","copiedToClipboard":"{{label}} copiado al portapapeles!","failedToCopy":"Error al copiar {{label}}","sha256Checksum":"Suma de verificación SHA-256","pgpSignature":"Firma PGP","verificationInstructions":"Instrucciones de verificación","downloadVerification":"Verificación de descarga","integrityCheck":"Comprobación de integridad","copy":"Copiar","signedWithKeyId":"Firmado con ID de clave: {{keyId}}"};
const transparency = {"title":"Nada oculto. Divulgación completa de la compilación.","subtitle":"Sin telemetría por defecto. Las variantes de compilación, destinos de implementación y claves de firma son públicos.\n\nVerifique todo en el código fuente."};
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

const brand = {"name":"Code Editor Land","description":"По-бърз от VS Code. По-лек от Electron. Безплатен завинаги."};
const columns = {"product":{"title":"Продукт","features":"Функции","downloads":"Изтегляне","docs":"Документация","blog":"Блог"},"company":{"title":"Общност","issues":"Дискусии","contributing":"Принос","github":"GitHub","enterprise":"Корпоративен"},"legal":{"title":"Правни","privacy":"Поверителност","terms":"Условия","license":"Лиценз"}};
const social = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar = {"copyright":"© {{year}} Code Editor Land. Всички права запазени.","builtBy":"Създаден от екипа на Code Editor Land","madeWith":"Направено с"};
const funding = {"prefix":"Този проект е финансиран чрез ","ngiFund":"NGI0 Commons Fund","nlnetIntro":", фонд създаден от ","nlnet":"NLnet","euSupport":" с финансова подкрепа от Програмата за Интернет от ново поколение на Европейската комисия, споразумение No. 101135429. ","projectPage":"Вижте страницата на проекта"};
const Footer = {
  brand,
  columns,
  social,
  bottomBar,
  funding,
};

const Footer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar,
	brand,
	columns,
	default: Footer,
	funding,
	social
}, Symbol.toStringTag, { value: 'Module' }));

export { Blog$1 as B, Doc$5 as D, Footer$1 as F, __vitePreload as _, Doc$3 as a, Doc$1 as b, Download$1 as c };
//# sourceMappingURL=Footer.xysLliKW.js.map
