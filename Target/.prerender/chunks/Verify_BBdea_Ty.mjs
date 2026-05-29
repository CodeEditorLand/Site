const forgotPassword = {"emailPlaceholder":"name@example.com","submit":"Send Reset Link","subtitle":"Enter your email and we'll send a secure reset link to your inbox.","success":{"title":"Check your inbox","subtitle":"A password reset link has been sent to","instruction":"Click the link in the email to set a new password.\n\nThe link expires in 24 hours.","resend":"Resend Email"},"title":"Reset Your Password","emailLabel":"Email","loading":"Sending...","backToSignIn":"Back to Sign In","successToast":"Reset email sent","errorToast":"Could not send reset email. Please try again.","emailRequired":"Email is required","resendSuccess":"Reset email sent again","resendError":"Could not resend email. Please try again.","emailSent":"Reset email sent to your inbox"};
const resetPassword = {"checkingMessage":"Validating your reset link, please wait...","confirmLabel":"Confirm New Password","confirmPlaceholder":"Re-enter your new password exactly as above","invalidToken":{"title":"Link Expired or Invalid","description":"This password reset link has expired or was already used.","instruction":"Request a new reset email to continue.","button":"Request New Reset Email"},"passwordLabel":"New Password","passwordPlaceholder":"Enter a strong new password","submit":"Set New Password","subtitle":"Enter your new password below","success":{"title":"Password updated","description":"Your password has been reset.\n\nYou can now sign in with your new credentials.","button":"Sign In"},"title":"Set a New Password","passwordHint":"Minimum 8 characters","loading":"Updating password...","mismatch":"Passwords do not match","signInLink":"Sign in","checking":"Checking link...","error":{"tooShort":"Password must be at least 8 characters"},"successToast":"Password updated successfully","errorToast":"Could not reset password. Please try again."};
const signIn = {"emailPlaceholder":"name@example.com","forgotPassword":"Forgot your password? Reset it securely.","githubButton":"Continue with GitHub","passwordPlaceholder":"Enter your password","signUpLink":"Create an account","subtitle":"Sign in to your Land workspace.","title":"Sign In","emailLabel":"Email","passwordLabel":"Password","submit":"Sign In","loading":"Signing in...","or":"Or","noAccount":"No account yet?","successToast":"Signed in","errorToast":"Incorrect email or password","showPassword":"Show password","hidePassword":"Hide password"};
const signUp = {"confirmPasswordLabel":"Confirm Password","confirmPasswordPlaceholder":"Re-enter your password to confirm","emailPlaceholder":"name@example.com","passwordHint":"Minimum 8 characters","passwordPlaceholder":"Create a strong password","signInLink":"Sign in","social":{"github":"Continue with GitHub","google":"Continue with Google","gitlab":"Continue with GitLab"},"subtitle":"Create your free Land account.","termsLabel":"I agree to the Terms of Service and Privacy Policy","title":"Create Account","validation":{"emailRequired":"Email is required","emailInvalid":"Enter a valid email address","passwordRequired":"Password is required","passwordTooShort":"Password must be at least 8 characters","confirmPasswordRequired":"Please confirm your password","termsRequired":"You must accept the terms and privacy policy to continue"},"emailLabel":"Email","passwordLabel":"Password","submit":"Create Free Account","loading":"Creating account...","or":"Or","hasAccount":"Already have an account?","termsLink":"Terms of Service","privacyLink":"Privacy Policy","and":"and","successToast":"Account created","errorToast":"Could not create account. Please try again.","confirmPasswordMismatch":"Passwords do not match","passwordStrength":{"weak":"Weak password","medium":"Medium strength","strong":"Strong password"}};
const common = {"and":"and"};
const portal = {"title":"Sign In to CodeEditorLand","subtitle":"Pick the tier that matches how you work. Cloud sync, OAuth identity, local-first daemon, or enterprise SSO.","cloud":{"title":"Cloud","subtitle":"Sign in once and every device is in sync.\n\nWorkspace state encrypted end to end, never readable in transit.","signIn":"Secure Sign In","emailLabel":"Email","emailPlaceholder":"name@example.com","passwordLabel":"Password","passwordPlaceholder":"Enter your password","feature":{"sync":"Workspace stays in sync across every device","backup":"Encrypted cloud backup of all configurations","team":"Shared team workspaces included","extension":"Install extensions from the marketplace in one click","remote":"Remote development server integration"},"capability":{"jwt":"JWT RS256 tokens 15-min access, 30-day refresh","okta":"Okta SSO integration available","mfa":"Multi-factor authentication supported","rbac":"Role-based access control at the gateway layer","audit":"Full audit log every action recorded","cert":"Developer certificates provisioned automatically"}},"provider":{"title":"Provider","subtitle":"Use the developer identity you already have.\n\nWe request only your email - no repository access, no org data, ever.","continueGitHub":"Continue with GitHub","continueGoogle":"Continue with Google","continueGitLab":"Continue with GitLab","oauthNote":"OAuth 2.0 Email scope only Linked to your preferences","feature":{"github":"No new password Your GitHub identity is enough","sso":"Single sign-on across all Land services","repo":"Theme and keybindings follow your provider identity","team":"Organization and team membership synced automatically","ci":"CI/CD pipeline integration with build triggers"},"capability":{"oauth":"OAuth 2.0 with PKCE S256 on every flow","scope":"Email and profile scope only nothing else requested","token":"Refresh token rotation on every sign-in","webhook":"Webhook event subscriptions","org":"Organization-level access policies","cert":"Developer certificates provisioned automatically"}},"localfirst":{"title":"Local-First","subtitle":"No internet? No problem. The Air Daemon runs entirely on your machine.\n\nYour code and credentials never leave it.","daemonLabel":"Air Daemon","daemonStatus":"Scanning...","connect":"Connect to Air Daemon","note":"Zero cloud dependency JWT certificates mTLS","feature":{"daemon":"Browser connects to Air Daemon over encrypted loopback","build":"Launch builds directly from the website console","deploy":"Deploy changes directly to the running editor","configure":"Full editor configuration and settings management","parity":"Every VS Code extension runs unchanged nothing missing","offline":"Complete offline operation No cloud login required","bake":"Embed the portal directly into the editor as built-in SaaS"},"capability":{"jwt":"JWT ES384 certificates 5 min expiry, rotated on reconnect","mtls":"mTLS mutual authentication daemon and browser both verified","crdt":"CRDT state synchronization for conflict-free offline editing","team":"Team management runs fully local no cloud dependency","cert":"Local certificate authority no external CA calls","ws":"WebSocket live connection over loopback only","rbac":"Local RBAC policies enforced at the daemon layer","backup":"Encrypted local backup of all workspace state"}},"enterprise":{"title":"Enterprise","subtitle":"Your IT team controls every seat.\n\nOIDC, SAML 2.0, and SCIM mean zero manual provisioning and full directory governance.","ariaLabel":"Enterprise SSO","domainLabel":"Work Email or Domain","domainPlaceholder":"name@company.com","continueSSO":"Continue with SSO","continueOkta":"Continue with Okta","continueAzure":"Continue with Azure AD","continueSAML":"Continue with SAML","oktaDomainLabel":"Okta Domain","oktaDomainPlaceholder":"your-org.okta.com","azureTenantLabel":"Azure AD Tenant ID","azureTenantPlaceholder":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","samlMetadataLabel":"SAML Metadata URL","samlMetadataPlaceholder":"https://your-idp.com/metadata.xml","note":"OpenID Connect Discovery SAML 2.0 Assertion SCIM 2.0 User Provisioning","feature":{"okta":"Okta SSO one login unlocks everything","azure":"Azure AD / Entra ID your Microsoft identity works","saml":"SAML 2.0 for any legacy enterprise IdP","scim":"SCIM provisioning new devs ready in minutes","group":"IdP group to CEL role mapping least privilege automatic","audit":"SOC 2 logs exported to your SIEM in CEF or JSON"},"capability":{"oidc":"OIDC Discovery auto-configured from your IdP metadata URL","jit":"Just-in-time provisioning on first sign-in","mfa":"MFA enforced via IdP authentication context class","session":"Session duration controlled by IdP policy","ca":"Organization CA certificates managed by IT","compliance":"SOC 2 Type II / GDPR compliance documentation"}},"labels":{"included":"Included","capabilities":"Capabilities","protocol":"Protocol:","settingsManaged":"Settings Managed","allTiers":"Included in all tiers"}};
const loading = "Loading...";
const error$1 = "Authentication error";
const tryAgain = "Try again";
const dashboard = "Go to Dashboard";
const logout = "Sign Out";
const emailNotVerified = "Email not verified. Check your inbox.";
const redirecting = "Redirecting to sign in...";
const dashboardPage = {"title":"Dashboard","welcome":"Welcome back","downloadsHeading":"Downloads","signOut":"Sign Out","loading":"Loading account…","error":"Could not load your account. Please refresh."};
const EnAccount = {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
  common,
  portal,
  loading,
  error: error$1,
  tryAgain,
  dashboard,
  logout,
  emailNotVerified,
  redirecting,
  dashboardPage,
};

const Account = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	common,
	dashboard,
	dashboardPage,
	default: EnAccount,
	emailNotVerified,
	error: error$1,
	forgotPassword,
	loading,
	logout,
	portal,
	redirecting,
	resetPassword,
	signIn,
	signUp,
	tryAgain
}, Symbol.toStringTag, { value: 'Module' }));

const error = {"title":"Verificacion fallida","description":"Este enlace de verificacion es invalido o ha caducado.","instruction":"Por favor, solicite un nuevo correo electronico de verificacion o contacte al soporte si el problema persiste.","resendButton":"Enviar nuevo correo de verificacion","contactSupport":"Contactar soporte","backToSignInButton":"Volver a iniciar sesion"};
const pending = {"description":"Se ha enviado un enlace de verificacion a su direccion de correo electronico.\nPor favor, revise su bandeja de entrada y haga clic en el enlace para activar su cuenta.\nEl enlace es valido durante 7 dias.\nSi no recibe el correo en unos minutos, revise la carpeta de spam o promociones.\nPor seguridad, no comparta este correo con nadie.","resendButton":"Reenviar correo de verificacion","title":"Verifique su direccion de correo electronico"};
const success = {"title":"Correo verificado!","description":"Su correo electronico ha sido verificado exitosamente.","instruction":"Ahora puede iniciar sesion en su cuenta y comenzar a usar Code Editor Land.","continue":"Continuar a iniciar sesion","continueButton":"Continuar a la pagina de inicio"};
const title = "Verifique su correo electronico";
const description = "Se envio un enlace de verificacion a";
const instruction = "Haga clic en el enlace del correo electronico para verificar su cuenta y comenzar a usar Code Editor Land.";
const didntReceive = "No recibio el correo electronico?";
const checkSpam = "Revise su carpeta de spam o";
const resendLink = "reenviar correo de verificacion";
const resendButton = "Reenviar correo de verificacion";
const backToSignIn = "Volver a iniciar sesion";
const resending = "Enviando...";
const resent = "Correo de verificacion enviado!";
const verifying = {"title":"Verificando su correo electronico","description":"Por favor espere mientras verificamos su direccion de correo electronico..."};
const errorGeneric = "Ocurrio un error durante la verificacion.\nPor favor, intentelo de nuevo.";
const resendFailed = "No se pudo reenviar el correo electronico.\nPor favor, intentelo de nuevo.";
const emailLabel = "Correo electronico";
const emailPlaceholder = "Ingrese su correo electronico para reenviar la verificacion";
const resendSuccess = "Correo de verificacion reenviado!";
const resendCooldown = "Reenviar en {{seconds}}s";
const resend = {"success":"Correo de verificacion enviado exitosamente."};
const token = {"invalid":"Este enlace de verificacion es invalido.","expired":"Este enlace de verificacion ha caducado. Por favor solicite uno nuevo."};
const EsVerify = {
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
  resendCooldown,
  resend,
  token,
};

const Verify = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	backToSignIn,
	checkSpam,
	default: EsVerify,
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
	title,
	token,
	verifying
}, Symbol.toStringTag, { value: 'Module' }));

export { Account as A, EnAccount as E, Verify as V, EsVerify as a };
