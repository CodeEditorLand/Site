//#region Source/Library/I18n/Locale/De/Verify.json
var error = {
	"title": "Verifizierung fehlgeschlagen",
	"description": "Dieser Verifizierungslink ist ungültig oder abgelaufen.",
	"instruction": "Bitte fordern Sie eine neue Verifizierungs-E-Mail an oder kontaktieren Sie den Support, wenn das Problem weiterhin besteht.",
	"resendButton": "Neue Verifizierungs-E-Mail senden",
	"contactSupport": "Support kontaktieren",
	"backToSignInButton": "Zurück zur Anmeldung"
};
var pending = {
	"description": "Ein Verifizierungslink wurde an Ihre E-Mail-Adresse gesendet.\nBitte prüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihr Konto zu aktivieren.\nDer Link ist 7 Tage gültig.\nFalls die E-Mail nicht innerhalb weniger Minuten eintrifft, prüfen Sie den Spam- oder Werbeordner.\nAus Sicherheitsgründen teilen Sie diese E-Mail bitte mit niemandem.",
	"resendButton": "Verifizierungs-E-Mail erneut senden",
	"title": "E-Mail-Adresse verifizieren"
};
var success = {
	"title": "E-Mail verifiziert!",
	"description": "Ihre E-Mail wurde erfolgreich verifiziert.",
	"instruction": "Sie können sich jetzt bei Ihrem Konto anmelden und Code Editor Land nutzen.",
	"continue": "Weiter zur Anmeldung",
	"continueButton": "Weiter zur Startseite"
};
var title = "E-Mail verifizieren";
var description = "Ein Verifizierungslink wurde gesendet an";
var instruction = "Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu verifizieren und Code Editor Land zu nutzen.";
var didntReceive = "E-Mail nicht erhalten?";
var checkSpam = "Prüfen Sie Ihren Spam-Ordner oder";
var resendLink = "Verifizierungs-E-Mail erneut senden";
var resendButton = "Verifizierungs-E-Mail erneut senden";
var backToSignIn = "Zurück zur Anmeldung";
var resending = "Wird gesendet...";
var resent = "Verifizierungs-E-Mail gesendet!";
var verifying = {
	"title": "E-Mail wird verifiziert",
	"description": "Bitte warten Sie, während wir Ihre E-Mail-Adresse verifizieren..."
};
var errorGeneric = "Bei der Verifizierung ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.";
var resendFailed = "E-Mail konnte nicht erneut gesendet werden.\nBitte versuchen Sie es erneut.";
var emailLabel = "E-Mail";
var emailPlaceholder = "Geben Sie Ihre E-Mail-Adresse ein, um die Verifizierung erneut zu senden";
var resendSuccess = "Verifizierungs-E-Mail erneut gesendet!";
var resendCooldown = "Erneut senden in {{seconds}}s";
var resend = { "success": "Verifizierungs-E-Mail erfolgreich gesendet." };
var token = {
	"invalid": "Dieser Verifizierungslink ist ungültig.",
	"expired": "Dieser Verifizierungslink ist abgelaufen. Bitte fordern Sie einen neuen an."
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
