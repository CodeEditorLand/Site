const brand$1 = {"name":"Code Editor Land","description":"The next-generation code editor.\nOpen source and free forever."};
const columns$1 = {"product":{"title":"Product","features":"Features","downloads":"Download","docs":"Docs"},"company":{"title":"Community","issues":"Issues","contributing":"Contributing","github":"GitHub"},"legal":{"title":"Legal","privacy":"Privacy","terms":"Terms","license":"License"}};
const social = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar$1 = {"copyright":"© {{year}} Code Editor Land.\nAll rights reserved.","builtBy":"Built by the Code Editor Land team","madeWith":"Made with"};
const funding$1 = {"prefix":"This project has been funded through the ","ngiFund":"NGI0 Commons Fund","nlnetIntro":", a fund established by ","nlnet":"NLnet","euSupport":" with financial support from the European Commission's Next Generation Internet programme, under grant agreement No. 101135429. ","projectPage":"View project page"};
const EnFooter = {
  brand: brand$1,
  columns: columns$1,
  social,
  bottomBar: bottomBar$1,
  funding: funding$1,
};

const Footer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar: bottomBar$1,
	brand: brand$1,
	columns: columns$1,
	default: EnFooter,
	funding: funding$1,
	social
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Универсален двоичен файл"},"windows":{"description":"64-битов (x64)","title":"Windows"}}};
const page = {"subtitle":"Наличен за macOS, Windows и Linux. Бърз, нативен и безплатен.","title":"Изтеглете Land"};
const previousReleases = {"description":"Изтеглете по-стари версии при необходимост.","title":"Предишни версии"};
const subtitle = "Наличен за macOS, Windows и Linux. Създаден с Tauri, задвижван от Rust.";
const systemRequirements = {"minimum":"Минимални изисквания","recommended":"Препоръчителни","subtitle":"Уверете се, че системата ви отговаря на тези изисквания, преди да изтеглите.","supportedOS":"Поддържани операционни системи","title":"Системни изисквания"};
const title = "Изтеглете Land";
const verification = {"description":"Версиите на Land са подписани с PGP.\nПроверете изтеглянето си, за да гарантирате целостта.","downloadButton":"Изтеглете публичния PGP ключ","title":"Проверете изтеглянето си","verifyButton":"Проверете изтеглянето"};
const labels = {"version":"Версия:","size":"Размер:","requirements":"Изисквания:","loading":"Зареждане на изтегляния...","errorTitle":"Неуспешно зареждане на изтегляния","downloadFailed":"Изтеглянето неуспешно. Моля, опитайте отново.","downloadFor":"Изтегляне за {{platform}}","copiedToClipboard":"{{label}} копирано в клипборда!","failedToCopy":"Неуспешно копиране на {{label}}"};
const transparency = {"title":"Прозрачност на компилацията","subtitle":"Пълно разкриване относно телеметрия, варианти на компилация и внедряване. Проверете всичко в изходния код."};
const BgDownload = {
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

const Download = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	card,
	default: BgDownload,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	transparency,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

const brand = {"name":"Code Editor Land","description":"El editor de codigo de nueva generacion.\nCodigo abierto y gratuito para siempre."};
const columns = {"product":{"title":"Producto","features":"Funciones","downloads":"Descargar","docs":"Documentacion"},"company":{"title":"Comunidad","issues":"Discusiones","contributing":"Contribuir","github":"GitHub"},"legal":{"title":"Legal","privacy":"Privacidad","terms":"Terminos","license":"Licencia"}};
const bottomBar = {"copyright":"© {{year}} Code Editor Land.\nTodos los derechos reservados.","builtBy":"Creado por el equipo de Code Editor Land","madeWith":"Hecho con"};
const funding = {"prefix":"Este proyecto ha sido financiado a través del ","ngiFund":"Fondo NGI0 Commons","nlnetIntro":", un fondo establecido por ","nlnet":"NLnet","euSupport":" con el apoyo financiero del programa de Internet de próxima generación de la Comisión Europea, en virtud del acuerdo de subvención n.º 101135429. ","projectPage":"Ver página del proyecto"};
const EsFooter = {
  brand,
  columns,
  bottomBar,
  funding,
};

const Footer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar,
	brand,
	columns,
	default: EsFooter,
	funding
}, Symbol.toStringTag, { value: 'Module' }));

const GetScrollProgress = () => {
  const ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const ScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (ScrollHeight <= 0) return 0;
  return Math.min(1, Math.max(0, ScrollTop / ScrollHeight));
};
const UpdateScrollProgress = (Root) => {
  Root.setProperty("--ScrollProgress", String(GetScrollProgress()));
};
const Parallax = { UpdateScrollProgress };

const Parallax$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Parallax
}, Symbol.toStringTag, { value: 'Module' }));

export { BgDownload as B, Download as D, EsFooter as E, Footer$1 as F, Parallax$1 as P, EnFooter as a, Footer as b };
