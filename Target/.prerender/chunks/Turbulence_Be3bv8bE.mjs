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

const EnDoc = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Elements",
  "sidebar.gettingStarted": "Getting Started",
};

const Doc = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: EnDoc
}, Symbol.toStringTag, { value: 'Module' }));

const GET = async () => {
  const GenerateOpenGraphSvg = (await import('./OpenGraph_BFuJwxJX.mjs').then(n => n.O)).default;
  const PageMetadata = (await Promise.resolve().then(() => PageMetadata$1)).default;
  const Meta = PageMetadata[""];
  const Svg = GenerateOpenGraphSvg(
    Meta.Title,
    Meta.Description,
    Meta.Section
  );
  return new Response(Svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const OpenGraph = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	page
}, Symbol.toStringTag, { value: 'Module' }));

const server = {};

const noopEntrypoint = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	server
}, Symbol.toStringTag, { value: 'Module' }));

const onRequest = (_, next) => next();

const _noopMiddleware = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	onRequest
}, Symbol.toStringTag, { value: 'Module' }));

const _virtual_astro_sessionDriver = null;

const _virtual_astro_sessionDriver$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _virtual_astro_sessionDriver
}, Symbol.toStringTag, { value: 'Module' }));

const serverIslandMap = new Map([

]);

const serverIslandNameMap = new Map([]);

const _virtual_astro_serverIslandManifest = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	serverIslandMap,
	serverIslandNameMap
}, Symbol.toStringTag, { value: 'Module' }));

const contentAssets = new Map();

const contentAssets$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: contentAssets
}, Symbol.toStringTag, { value: 'Module' }));

const PageMetadata = {
  "": {
    Title: "Land | The Next-Generation Code Editor",
    Description: "A high-performance, resource-efficient code editor built with Rust and Tauri. Experience VS Code compatibility without the Electron bloat.",
    Section: "Home"
  },
  "Download": {
    Title: "Download Land",
    Description: "Download Land for Windows, macOS, and Linux. Free and open-source.",
    Section: "Download"
  },
  "Blog": {
    Title: "Blog | Code Editor Land",
    Description: "Updates, tutorials, and insights from the Code Editor Land team.",
    Section: "Blog"
  },
  "Doc": {
    Title: "Documentation | Code Editor Land",
    Description: "Guides, API references, and tutorials for Code Editor Land.",
    Section: "Doc"
  },
  "Portal": {
    Title: "Portal | Code Editor Land",
    Description: "Sign in to your Code Editor Land account. Manage settings, sync, and cloud features.",
    Section: "Portal"
  },
  "Contributing": {
    Title: "Contributing | Code Editor Land",
    Description: "Learn how to contribute to Code Editor Land. Guidelines, setup, and community resources.",
    Section: "Contributing"
  },
  "License": {
    Title: "License | Code Editor Land",
    Description: "Code Editor Land licensing information. CC0 1.0 Universal public domain dedication.",
    Section: "License"
  },
  "Dashboard": {
    Title: "Dashboard | Code Editor Land",
    Description: "Your Code Editor Land dashboard. Manage your account and settings.",
    Section: "Dashboard"
  },
  "Contact/Sale": {
    Title: "Contact Sales | Code Editor Land",
    Description: "Get in touch with our sales team for enterprise licensing and support.",
    Section: "Contact"
  },
  "Account/SignIn": {
    Title: "Sign In | Code Editor Land",
    Description: "Sign in to your Code Editor Land account.",
    Section: "Account"
  },
  "Account/SignUp": {
    Title: "Sign Up | Code Editor Land",
    Description: "Create a new Code Editor Land account.",
    Section: "Account"
  },
  "Account/ForgotPassword": {
    Title: "Forgot Password | Code Editor Land",
    Description: "Reset your Code Editor Land account password.",
    Section: "Account"
  },
  "Account/ResetPassword": {
    Title: "Reset Password | Code Editor Land",
    Description: "Set a new password for your Code Editor Land account.",
    Section: "Account"
  },
  "Legal/Term": {
    Title: "Terms of Service | Code Editor Land",
    Description: "Code Editor Land terms of service and usage agreement.",
    Section: "Legal"
  },
  "Legal/Privacy": {
    Title: "Privacy Policy | Code Editor Land",
    Description: "Code Editor Land privacy policy. How we handle your data.",
    Section: "Legal"
  },
  "Verify": {
    Title: "Verify Email | Code Editor Land",
    Description: "Verify your Code Editor Land email address.",
    Section: "Account"
  },
  "Visit": {
    Title: "Visit | Code Editor Land",
    Description: "Explore Code Editor Land features and capabilities.",
    Section: "Visit"
  }
};

const PageMetadata$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: PageMetadata
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

export { Doc as D, EsFooter as E, Footer as F, OpenGraph as O, PageMetadata$1 as P, Turbulence$1 as T, _noopMiddleware as _, EnDoc as a, _virtual_astro_sessionDriver$1 as b, _virtual_astro_serverIslandManifest as c, contentAssets$1 as d, noopEntrypoint as n };
