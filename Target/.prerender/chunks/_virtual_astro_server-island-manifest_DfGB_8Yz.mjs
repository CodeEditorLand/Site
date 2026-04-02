const error = {"title":"Verification failed","description":"This verification link is invalid or has expired.","instruction":"Please request a new verification email or contact support if the problem persists.","resendButton":"Send New Verification Email","contactSupport":"Contact Support","backToSignInButton":"Back to Sign In"};
const pending = {"description":"A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 7 days.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share this email with anyone.","resendButton":"Resend Verification Email","title":"Verify Your Email Address"};
const success = {"title":"Email verified!","description":"Your email has been successfully verified.","instruction":"You can now sign in to your account and start using Code Editor Land.","continue":"Continue to Sign In","continueButton":"Continue to Homepage"};
const title$1 = "Verify your email";
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
  title: title$1,
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
	title: title$1,
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

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Binaire universel"},"windows":{"description":"64 bits (x64)","title":"Windows"}}};
const page = {"subtitle":"Disponible pour macOS, Windows et Linux.\nRapide, natif et gratuit.","title":"Telecharger Land"};
const previousReleases = {"description":"Telechargez des versions anterieures si necessaire.","title":"Versions precedentes"};
const subtitle = "Disponible pour macOS, Windows et Linux.\nConstruit avec Tauri, propulse par Rust.";
const systemRequirements = {"minimum":"Configuration minimale","recommended":"Recommande","subtitle":"Assurez-vous que votre systeme repond a ces exigences avant de telecharger.","supportedOS":"Systemes d'exploitation pris en charge","title":"Configuration requise"};
const title = "Telecharger Land";
const verification = {"description":"Les versions de Land sont signees avec PGP.\nVerifiez votre telechargement pour garantir l'integrite.","downloadButton":"Telecharger la cle publique PGP","title":"Verifiez votre telechargement","verifyButton":"Verifier le telechargement"};
const labels = {"version":"Version :","size":"Taille :","requirements":"Configuration requise :","loading":"Chargement des telechargements...","errorTitle":"Impossible de charger les telechargements","downloadFailed":"Echec du telechargement.\nVeuillez reessayer.","downloadFor":"Telecharger pour {{platform}}","copiedToClipboard":"{{label}} copie dans le presse-papiers !","failedToCopy":"Echec de la copie de {{label}}"};
const transparency = {"title":"Transparence de compilation","subtitle":"Divulgation complete sur la telemetrie, les variantes de compilation et le deploiement.\nVerifiez tout dans le code source."};
const FrDownload = {
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
	default: FrDownload,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	transparency,
	verification
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

export { DeHeader as D, EsHeader as E, FrDownload as F, Header$1 as H, Verify as V, _noopMiddleware as _, EnVerify as a, Download as b, Header as c, _virtual_astro_sessionDriver$1 as d, _virtual_astro_serverIslandManifest as e, noopEntrypoint as n };
