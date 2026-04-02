const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Universal Binary"},"windows":{"description":"64-bit (x64)","title":"Windows"}}};
const page = {"subtitle":"Available for macOS, Windows, and Linux.\nFast, native, and free.","title":"Download Land"};
const previousReleases = {"description":"Download older versions if needed.","title":"Previous Releases"};
const subtitle = "Available for macOS, Windows, and Linux.\nBuilt with Tauri, powered by Rust.";
const systemRequirements = {"minimum":"Minimum Requirements","recommended":"Recommended","subtitle":"Ensure your system meets these requirements before downloading.","supportedOS":"Supported Operating Systems","title":"System Requirements"};
const title$1 = "Download Land";
const verification = {"description":"Land releases are signed with PGP.\nVerify your download to ensure integrity.","downloadButton":"Download PGP Public Key","title":"Verify Your Download","verifyButton":"Verify Download"};
const labels = {"version":"Version:","size":"Size:","requirements":"Requirements:","loading":"Loading downloads...","errorTitle":"Unable to load downloads","downloadFailed":"Download failed.\nPlease try again.","downloadFor":"Download for {{platform}}","copiedToClipboard":"{{label}} copied to clipboard!","failedToCopy":"Failed to copy {{label}}","sha256Checksum":"SHA-256 Checksum","pgpSignature":"PGP Signature","verificationInstructions":"Verification Instructions","downloadVerification":"Download Verification","integrityCheck":"Integrity Check","copy":"Copy","signedWithKeyId":"Signed with key ID: {{keyId}}"};
const transparency = {"title":"Build Transparency","subtitle":"Full disclosure on telemetry, build variants, and deployment.\nVerify everything in source."};
const EnDownload = {
  card,
  page,
  previousReleases,
  subtitle,
  systemRequirements,
  title: title$1,
  verification,
  labels,
  transparency,
};

const Download = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	card,
	default: EnDownload,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title: title$1,
	transparency,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

const error = {"title":"Verification failed","description":"This verification link is invalid or has expired.","instruction":"Please request a new verification email or contact support if the problem persists.","resendButton":"Send New Verification Email","contactSupport":"Contact Support","backToSignInButton":"Back to Sign In"};
const pending = {"description":"A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 7 days.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share this email with anyone.","resendButton":"Resend Verification Email","title":"Verify Your Email Address"};
const success = {"title":"Email verified!","description":"Your email has been successfully verified.","instruction":"You can now sign in to your account and start using Code Editor Land.","continue":"Continue to Sign In","continueButton":"Continue to Homepage"};
const title = "Verify your email";
const description = "A verification link was sent to";
const instruction = "Click the link in the email to verify your account and start using Code Editor Land.";
const didntReceive = "Didn't receive the email?";
const checkSpam = "Check your spam folder or";
const resendLink = "resend verification email";
const resendButton = "Resend Verification Email";
const backToSignIn = "Back to Sign In";
const resending = "Sending...";
const resent = "Verification email sent!";
const verifying = {"title":"Verifying your email","description":"Please wait while we verify your email address..."};
const errorGeneric = "An error occurred during verification.\nPlease try again.";
const resendFailed = "Failed to resend email.\nPlease try again.";
const emailLabel = "Email";
const emailPlaceholder = "Enter your email to resend verification";
const resendSuccess = "Verification email resent!";
const EnVerify = {
  error,
  pending,
  success,
  title,
  description,
  instruction,
  didntReceive,
  checkSpam,
  resendLink,
  resendButton,
  backToSignIn,
  resending,
  resent,
  verifying,
  errorGeneric,
  resendFailed,
  emailLabel,
  emailPlaceholder,
  resendSuccess,
};

const Verify = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	backToSignIn,
	checkSpam,
	default: EnVerify,
	description,
	didntReceive,
	emailLabel,
	emailPlaceholder,
	error,
	errorGeneric,
	instruction,
	pending,
	resendButton,
	resendFailed,
	resendLink,
	resendSuccess,
	resending,
	resent,
	success,
	title,
	verifying
}, Symbol.toStringTag, { value: 'Module' }));

const logo$1 = "Land";
const nav$1 = {"features":"Funktionen","download":"Herunterladen","docs":"Dokumentation","blog":"Blog","contributing":"Mitwirken","dashboard":"Dashboard","github":"GitHub"};
const actions$1 = {"signIn":"Anmelden","editorPortal":"Editor-Portal","getStarted":"Land holen","logout":"Abmelden"};
const DeHeader = {
  logo: logo$1,
  nav: nav$1,
  actions: actions$1,
};

const Header$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	actions: actions$1,
	default: DeHeader,
	logo: logo$1,
	nav: nav$1
}, Symbol.toStringTag, { value: 'Module' }));

const logo = "Land";
const nav = {"features":"Funciones","download":"Descargar","docs":"Documentacion","blog":"Blog","contributing":"Contribuir","dashboard":"Panel","github":"GitHub"};
const actions = {"signIn":"Iniciar sesion","editorPortal":"Portal del editor","getStarted":"Obtener Land","logout":"Cerrar sesion"};
const EsHeader = {
  logo,
  nav,
  actions,
};

const Header = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	actions,
	default: EsHeader,
	logo,
	nav
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

export { DeHeader as D, EsHeader as E, Header$1 as H, Verify as V, _noopMiddleware as _, EnVerify as a, EnDownload as b, Download as c, Header as d, _virtual_astro_sessionDriver$1 as e, _virtual_astro_serverIslandManifest as f, noopEntrypoint as n };
