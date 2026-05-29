const brand = {"name":"Code Editor Land","description":"El editor de codigo de nueva generacion.\nCodigo abierto y gratuito para siempre."};
const columns = {"product":{"title":"Producto","features":"Funciones","downloads":"Descargar","docs":"Documentacion","blog":"Blog"},"company":{"title":"Comunidad","issues":"Discusiones","contributing":"Contribuir","github":"GitHub","enterprise":"Empresarial"},"legal":{"title":"Legal","privacy":"Privacidad","terms":"Terminos","license":"Licencia"}};
const social = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar = {"copyright":"© {{year}} Code Editor Land.\nTodos los derechos reservados.","builtBy":"Creado por el equipo de Code Editor Land","madeWith":"Hecho con"};
const funding = {"prefix":"Este proyecto ha sido financiado a través del ","ngiFund":"Fondo NGI0 Commons","nlnetIntro":", un fondo establecido por ","nlnet":"NLnet","euSupport":" con el apoyo financiero del programa de Internet de próxima generación de la Comisión Europea, en virtud del acuerdo de subvención n.º 101135429. ","projectPage":"Ver página del proyecto"};
const EsFooter = {
  brand,
  columns,
  social,
  bottomBar,
  funding,
};

const Footer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar,
	brand,
	columns,
	default: EsFooter,
	funding,
	social
}, Symbol.toStringTag, { value: 'Module' }));

const features = {"badge":"Функции","item":{"designTokens":{"description":"Спрете да давате на VS Code гигабайт RAM само за да отворите файл.\n\nRust ядрото на Land с gRPC IPC отговаря за микросекунди. Дори с отворени стотици файлове.","title":"Без закъснение. Никога."},"componentLibrary":{"description":"Цялата ви библиотека от VS Code разширения работи от кутията.\n\nCocoon хостът огледва пълната VS Code API повърхност. Нищо не трябва да се пренаписва.","title":"Разширенията ви, непроменени"},"documentation":{"description":"Effect-TS ви дава типизирани услуги, структурирана конкурентност и проследими грешки.\n\nГрешките се улавят по време на компилация, не в 3 часа сутринта.","title":"Типова безопасност от край до край"},"versionControl":{"description":"Един код се компилира до напълно нативни приложения на macOS, Windows и Linux чрез Tauri.\n\nПубликувайте за трите платформи с една команда.","title":"Един билд, всяка платформа"},"collaboration":{"description":"CC0 публично достояние. Използвайте го, форкнете го, разпространявайте го, дори го продавайте.\n\nФинансиран от NLnet и разработван изцяло публично.","title":"Безплатен завинаги. Без условия."},"cicdIntegration":{"description":"Rust, Tauri, Effect-TS и Biome формират стек, избран за коректност и продуктивност на разработчика.\n\nПознати инструменти, без компромиси.","title":"Инструменти от най-висок клас"}},"subtitle":"Шест функции, обясняващи защо Land е по-бърз, по-сигурен и по-отворен от всеки редактор базиран на Electron.","title":"Различен по дизайн. По-добър по измерване."};
const hero = {"badge":"Нативна скорост   Без Electron   CC0","subtitle":"Спрете да давате на VS Code гигабайт RAM.\n\nLand е изграден на Rust, Tauri и Effect-TS. Достатъчно бърз, за да го усетите веднага.","title":"Бъдещето на редактирането на код","titleHighlight":"Land","atScale":"започва тук","cta":{"primary":"Изтегляне","secondary":"Научете повече"},"scene":{"description":"Анимирана визуализация на архитектурата","hub":"Основна архитектура","components":{"button":"Rust ядро","colors":"Tauri UI","typography":"Effect-TS услуги","components":"gRPC IPC","spacing":"Extension Host","icons":"Крос-платформен","docs":"VS Code API","versions":"Отворен код CC0"},"cards":{"1":{"title":"Rust ядро","tooltip":["Mountain implements Common traits in Rust via Tauri.","Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.","The ActionEffect system treats every operation as declarative data dispatched across layers."]},"2":{"title":"Tauri UI","tooltip":["Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.","Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron."]},"3":{"title":"Effect-TS услуги","tooltip":["Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.","Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target."]},"4":{"title":"gRPC IPC","tooltip":["Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.","Proto definitions currently live in Mountain and Cocoon while Vine consolidates.","Every gRPC call is a typed contract - the wire format is the interface."]},"5":{"title":"Extension Host","tooltip":["Cocoon runs VS Code extensions via dual-track architecture:","Track A loads unmodified extHost sources for maximum compatibility,","Track B routes I/O-heavy operations to Mountain through gRPC.","Effect-TS services implement the vscode API shim across both tracks."]},"6":{"title":"Крос-платформен","tooltip":["Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.","Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts."]},"7":{"title":"VS Code API","tooltip":["Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.","The dual-track architecture preserves compatibility with published extension APIs while routing through native services."]},"8":{"title":"Отворен код CC0","tooltip":["All 15 element repos are under CC0 1.0 Universal public domain.","No attribution required, no compliance restrictions.","Funded by NLnet NGI0 Commons Fund."]}}}};
const nav = {"docs":"Документация","downloads":"Изтегляне","features":"Функции","github":"GitHub"};
const pricing = {"subtitle":"Code Editor Land е напълно безплатен.\n\nБез нива, без абонаменти, без ограничения.","labels":{"monthly":"Месечно","yearly":"Годишно","savings":"(Спестете до 20%)","popular":"Най-популярен","perMonth":"/месец","perYear":"/година","free":"Безплатно"},"toggle":{"toMonthly":"Превключване към {{label}} фактуриране","toYearly":"Превключване към {{label}} фактуриране"},"tiers":{"free":{"name":"Общност","description":"За всички. Пълни функции на редактора, напълно безплатно.","features":{"1":"Пълна VS Code съвместимост","2":"Всички разширения поддържани","3":"Нативна Rust производителност","4":"Крос-платформен (macOS, Windows, Linux)","5":"Effect-TS типово безопасен UI","6":"gRPC-базирана архитектура","7":"Отворен код (CC0 лиценз)"},"button":"Изтеглете сега"}},"title":"Безплатен завинаги, отворен код","badge":"Ценообразуване"};
const testimonials = {"quote":{"1":"Фокусирана върху производителността, отворена алтернатива.\n\nLand е точно това, от което VS Code се нуждаеше.\n\nНевероятно бърз е.","2":"Effect-TS архитектурата е красива за работа.\n\nТиповата безопасност улавя грешки преди да се случат.","3":"Стартирането на съществуващите ми разширения без промени е революционно.\n\nСъвместимостта е впечатляваща.","4":"Най-накрая редактор, който уважава системните ми ресурси.\n\nКрай на натоварването от Electron.","5":"Ангажиментът към отворения код означава, че мога да допринасям и персонализирам.\n\nТова е редакторът, който чаках.","6":"gRPC-базираната архитектура е майсторски клас по системен дизайн.\n\nLand е бъдещето на десктоп редакторите."},"subtitle":"Гласове от общността за бъдещето на редактирането на код.","title":"Какво казват разработчиците","badge":"Отзиви","attribution":"Отзив от общността","attributionNote":"Представителен член на общността"};
const roadmap = {"title":"Пътна карта и какво да очаквате","subtitle":"Финансиран от NLnet NGI0 Commons Fund.\n\nРазработван публично, безплатен завинаги. Без изненади по пътната карта.","tiers":{"current":{"name":"Активно сега","description":"Шестте основни елемента са в активна разработка. Всеки е самостоятелно хранилище, което можете да инспектирате и към което можете да допринасяте днес.","features":{"mountain":"Mountain ⛰️\nНативен Rust/Tauri бекенд, замества главния процес на Electron","cocoon":"Cocoon 🦋\nХост за разширения - пълен VS Code API чрез Effect-TS shims","wind":"Wind 🍃\nVS Code Workbench преосмислен в TypeScript + Effect-TS","sky":"Sky 🌌\nAstro UI слой - всеки панел е компонент, мигновено горещо презареждане","air":"Air 🪁\nФонов демон, безшумни актуализации, криптографски подписани","echo":"Echo 📣\nПланировчик без заключване, насища всяко CPU ядро","vine":"Vine 🌿\ngRPC гръбнак, contract-first .proto дефиниции","mist":"Mist 🌫️\nDNS пясъчник, целият трафик *.land.playform.cloud се разрешава локално","rest":"Rest ⛱️\nTypeScript компилатор в Rust + OXC, 2-3× по-бърз от esbuild","grove":"Grove 🌳\nWASMtime пясъчник, изолация на разширения с capabilities","common":"Common 👨🏻‍🏭\nАбстрактна Rust основа, типизирани ефекти, нула конкретни имплементации","output":"Output ⚫\nПровод за компилиране, детерминирани подписани пакети","sidecar":"SideCar ⚙️\nМеждуплатформен разпределител на Node.js бинарни файлове","worker":"Worker 🍩\nService Worker, офлайн поддръжка, AES-GCM криптирано удостоверяване","maintain":"Maintain 💪🏻\nОркестратор на изграждане, Rhai скриптиране, TOML/JSON5 конфигурация"},"button":"Вижте в GitHub"},"next":{"name":"Предстои","description":"Полировка на екосистемата от разширения и първото стабилно издание за трите платформи.","features":{"1":"Пас за висококачествена съвместимост с VS Code разширения","2":"Крос-платформен инсталатор с безшумно автоматично обновяване","3":"Финализиран и документиран gRPC IPC протокол","4":"Синхронизация на настройки с портал без задължителен облак"},"button":"Проследяване на напредъка"},"future":{"name":"Дългосрочна визия","description":"Пълнофункционален редактор без Electron, обработващ всеки работен поток на съвременния разработчик.","features":{"1":"Нативно мобилно редактиране: iOS и Android","2":"Съвместно редактиране в реално време вградено","3":"AI помощ за разработката, ориентирана към поверителността","4":"Отворен магазин за плъгини и екосистема от разширения"},"button":"Научете повече"}}};
const architecture = {"title":"Под капака","subtitle":"Land замества Electron стека на VS Code елемент по елемент.\n\nВсеки компонент е самостоятелно хранилище с отворен код, което можете да четете, форкнете или към което да допринасяте.","mountain":{"description":"Замества главния процес на Electron с нативен Rust/Tauri бекенд.\n\nПрозорци, файлова система и жизнен цикъл на процеси работят с нативна скорост без JavaScript натоварване.","subtitle":"Нативна скорост без натоварването на Electron"},"cocoon":{"description":"Изпълнява съществуващите ви VS Code разширения чрез Effect-TS с висококачествена API съвместимост.\n\nИнсталирайте ги и те просто работят. Без пренаписване, без пачове.","subtitle":"Разширенията ви, напълно непроменени"},"wind":{"description":"Чиста преимплементация на VS Code Workbench в TypeScript.\n\nПанели, странични ленти и лентата за активност. Познато оформление, без зависимост от Electron.","subtitle":"Пълна обвивка на работното пространство, изградена наново"},"sky":{"description":"Рендира UI на редактора с Astro компоненти.\n\nТемите, оформленията и визуалният слой се зареждат бързо и остават последователни на всички платформи.","subtitle":"Теми и оформления, бързи по подразбиране"},"air":{"description":"Фонов демон, поддържащ Land актуален без да ви прекъсва.\n\nВсяко обновяване е криптографски подписано преди да се приложи.","subtitle":"Безшумни обновявания, винаги подписани"},"echo":{"description":"Изпълнител с кражба на работа, насищащ всяко CPU ядро.\n\nТежкото индексиране и анализите се случват на заден план. Редакторът остава отзивчив.","subtitle":"Използва всяко CPU ядро, което имате"}};
const BgHome = {
  features,
  hero,
  nav,
  pricing,
  testimonials,
  roadmap,
  architecture,
};

const Home = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	architecture,
	default: BgHome,
	features,
	hero,
	nav,
	pricing,
	roadmap,
	testimonials
}, Symbol.toStringTag, { value: 'Module' }));

let FilterElement = null;
let Injected = false;
const FILTER_IDENTIFIER = "StaccatoTurbulence";
const InjectFilter = () => {
  if (Injected) return;
  Injected = true;
  const Svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  Svg.setAttribute("width", "0");
  Svg.setAttribute("height", "0");
  Svg.setAttribute("aria-hidden", "true");
  Svg.style.position = "absolute";
  Svg.style.pointerEvents = "none";
  Svg.innerHTML = `<defs>
		<filter id="${FILTER_IDENTIFIER}" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence
				type="turbulence"
				baseFrequency="0.02"
				numOctaves="3"
				seed="0"
				result="Noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="Noise"
				scale="4"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>
	</defs>`;
  document.body.appendChild(Svg);
  FilterElement = Svg.querySelector("feTurbulence");
};
const AnimateFilter = (RawValue) => {
  if (!FilterElement) return;
  const Seed = Math.abs(Math.floor(RawValue * 1e3)) % 9999;
  FilterElement.setAttribute("seed", String(Seed));
};
const Turbulence = { InjectFilter, AnimateFilter };

const Turbulence$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Turbulence
}, Symbol.toStringTag, { value: 'Module' }));

export { BgHome as B, EsFooter as E, Footer as F, Home as H, Turbulence$1 as T };
