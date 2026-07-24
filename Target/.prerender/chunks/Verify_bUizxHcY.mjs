//#region Source/Library/I18n/Locale/En/Verify.json
var error = {
	"title": "Verification failed",
	"description": "This verification link is invalid or has expired.",
	"instruction": "Please request a new verification email or contact support if the problem persists.",
	"resendButton": "Send New Verification Email",
	"contactSupport": "Contact Support",
	"backToSignInButton": "Back to Sign In"
};
var pending = {
	"description": "A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 7 days.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share this email with anyone.",
	"resendButton": "Resend Verification Email",
	"title": "Verify Your Email Address"
};
var success = {
	"title": "Email verified!",
	"description": "Your email has been successfully verified.",
	"instruction": "You can now sign in to your account and start using Code Editor Land.",
	"continue": "Continue to Sign In",
	"continueButton": "Continue to Homepage"
};
var title = "Verify your email";
var description = "A verification link was sent to";
var instruction = "Click the link in the email to verify your account and start using Code Editor Land.";
var didntReceive = "Didn't receive the email?";
var checkSpam = "Check your spam folder or";
var resendLink = "resend verification email";
var resendButton = "Resend Verification Email";
var backToSignIn = "Back to Sign In";
var resending = "Sending...";
var resent = "Verification email sent!";
var verifying = {
	"title": "Verifying your email",
	"description": "Please wait while we verify your email address..."
};
var errorGeneric = "An error occurred during verification.\nPlease try again.";
var resendFailed = "Failed to resend email.\nPlease try again.";
var emailLabel = "Email";
var emailPlaceholder = "Enter your email to resend verification";
var resendSuccess = "Verification email resent!";
var resendCooldown = "Resend in {{seconds}}s";
var resend = { "success": "Verification email sent successfully." };
var token = {
	"invalid": "This verification link is invalid.",
	"expired": "This verification link has expired. Please request a new one."
};
var Verify_default = {
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
	token
};
//#endregion
export { verifying as C, token as S, resendSuccess as _, didntReceive as a, success as b, error as c, pending as d, resend as f, resendLink as g, resendFailed as h, description as i, errorGeneric as l, resendCooldown as m, backToSignIn as n, emailLabel as o, resendButton as p, checkSpam as r, emailPlaceholder as s, Verify_default as t, instruction as u, resending as v, title as x, resent as y };
