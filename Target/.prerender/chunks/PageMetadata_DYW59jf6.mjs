const logo = "Land";
const nav = {"features":"Features","download":"Download","docs":"Docs","blog":"Blog","contributing":"Contributing","dashboard":"Dashboard","github":"GitHub"};
const actions = {"signIn":"Sign In","signUp":"Sign Up","editorPortal":"Editor Portal","getStarted":"Get Land","logout":"Logout","loading":"Loading…"};
const user = {"avatarAlt":"User menu","menu":{"dashboard":"Dashboard","account":"Account","signOut":"Sign Out"}};
const EnHeader = {
  logo,
  nav,
  actions,
  user,
};

const Header = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	actions,
	default: EnHeader,
	logo,
	nav,
	user
}, Symbol.toStringTag, { value: 'Module' }));

const EnDoc = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Elements",
  "sidebar.gettingStarted": "Getting Started",
};

const Doc$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: EnDoc
}, Symbol.toStringTag, { value: 'Module' }));

const Doc$2 = {
  "sidebar.title": "Документация",
  "sidebar.elements": "Елементи",
  "sidebar.gettingStarted": "Начало",
};

const Doc$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc$2
}, Symbol.toStringTag, { value: 'Module' }));

const Doc = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Éléments",
  "sidebar.gettingStarted": "Premiers pas",
};

const Doc$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc
}, Symbol.toStringTag, { value: 'Module' }));

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];

const Auth0ClientIdentifier = "sTv8kJI2TQPpCJjCbSvbRWKc3Lrx1TeF";

const Auth0Domain = "dev-o5qwc17ra258xn81.eu.auth0.com";

const GET = async () => {
  const GenerateOpenGraphSvg = (await import('./OpenGraph_BjPLYAEW.mjs').then(n => n.O)).default;
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

const Auth = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Auth0ClientIdentifier,
	Auth0Domain
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

export { Auth as A, DEFAULT_HASH_PROPS as D, EnDoc as E, Header as H, OpenGraph as O, PageMetadata$1 as P, VALID_INPUT_FORMATS as V, Auth0ClientIdentifier as a, Auth0Domain as b, DEFAULT_OUTPUT_FORMAT as c, Doc$4 as d, Doc$3 as e, Doc$1 as f, EnHeader as g, VALID_SUPPORTED_FORMATS as h, contentAssets$1 as i };
