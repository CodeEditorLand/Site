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
const resendCooldown = "Resend in {{seconds}}s";
const resend = {"success":"Verification email sent successfully."};
const token = {"invalid":"This verification link is invalid.","expired":"This verification link has expired. Please request a new one."};
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
  resendCooldown,
  resend,
  token,
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
	resend,
	resendButton,
	resendCooldown,
	resendFailed,
	resendLink,
	resendSuccess,
	resending,
	resent,
	success,
	title: title$1,
	token,
	verifying
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Binaire universel"},"windows":{"description":"64 bits (x64)","title":"Windows"}}};
const page = {"subtitle":"Natif sur macOS, Windows et Linux.\n\nGratuit, sans suivi, prise en charge complète des extensions VS Code.","title":"Télécharger Land"};
const previousReleases = {"description":"Téléchargez une version antérieure si vous devez vous fixer à une version spécifique.","title":"Versions précédentes"};
const subtitle = "Natif sur macOS, Windows et Linux.\n\nConstruit avec Tauri. Propulsé par Rust. Vérifié avec PGP.";
const systemRequirements = {"minimum":"Configuration minimale","recommended":"Recommandé pour la meilleure expérience","subtitle":"Une vérification rapide avant de télécharger évite une réinstallation.","supportedOS":"Systèmes d'exploitation pris en charge","title":"Configuration requise"};
const title = "Télécharger Land";
const verification = {"description":"Chaque version de Land est signée PGP avant d'être distribuée.\n\nVérifiez votre téléchargement pour confirmer que vous avez obtenu exactement ce qui a été compilé.","downloadButton":"Télécharger la clé publique PGP","title":"Chaque version est signée. Vérifiez la vôtre.","verifyButton":"Vérifier le téléchargement"};
const labels = {"version":"Version :","size":"Taille :","requirements":"Configuration requise :","loading":"Chargement des téléchargements disponibles...","errorTitle":"Impossible de charger les téléchargements","downloadFailed":"Échec du téléchargement. Veuillez réessayer.","downloadFor":"Télécharger pour {{platform}}","copiedToClipboard":"{{label}} copie dans le presse-papiers !","failedToCopy":"Echec de la copie de {{label}}","sha256Checksum":"Somme de contrôle SHA-256","pgpSignature":"Signature PGP","verificationInstructions":"Instructions de vérification","downloadVerification":"Vérification du téléchargement","integrityCheck":"Vérification de l'intégrité","copy":"Copier","signedWithKeyId":"Signé avec l'ID de clé : {{keyId}}"};
const transparency = {"title":"Rien de caché. Divulgation complète de la compilation.","subtitle":"Aucune télémétrie par défaut. Les variantes de compilation, les cibles de déploiement et les clés de signature sont publiques.\n\nVérifiez tout dans le code source."};
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

export { Download as D, EnVerify as E, FrDownload as F, Verify as V };
