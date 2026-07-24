//#region Source/Library/I18n/Locale/Fr/Verify.json
var error = {
	"title": "Echec de la verification",
	"description": "Ce lien de verification est invalide ou a expire.",
	"instruction": "Veuillez demander un nouvel e-mail de verification ou contacter le support si le probleme persiste.",
	"resendButton": "Envoyer un nouvel e-mail de verification",
	"contactSupport": "Contacter le support",
	"backToSignInButton": "Retour a la connexion"
};
var pending = {
	"description": "Un lien de verification a ete envoye a votre adresse e-mail.\nVeuillez verifier votre boite de reception et cliquer sur le lien pour activer votre compte.\nLe lien est valide pendant 7 jours.\nSi l'e-mail n'est pas recu dans les prochaines minutes, verifiez le dossier spam ou promotions.\nPour des raisons de securite, ne partagez pas cet e-mail avec quiconque.",
	"resendButton": "Renvoyer l'e-mail de verification",
	"title": "Verifiez votre adresse e-mail"
};
var success = {
	"title": "E-mail verifie !",
	"description": "Votre e-mail a ete verifie avec succes.",
	"instruction": "Vous pouvez maintenant vous connecter a votre compte et commencer a utiliser Code Editor Land.",
	"continue": "Continuer vers la connexion",
	"continueButton": "Continuer vers la page d'accueil"
};
var title = "Verifiez votre e-mail";
var description = "Un lien de verification a ete envoye a";
var instruction = "Cliquez sur le lien dans l'e-mail pour verifier votre compte et commencer a utiliser Code Editor Land.";
var didntReceive = "Vous n'avez pas recu l'e-mail ?";
var checkSpam = "Verifiez votre dossier spam ou";
var resendLink = "renvoyer l'e-mail de verification";
var resendButton = "Renvoyer l'e-mail de verification";
var backToSignIn = "Retour a la connexion";
var resending = "Envoi en cours...";
var resent = "E-mail de verification envoye !";
var verifying = {
	"title": "Verification de votre e-mail",
	"description": "Veuillez patienter pendant que nous verifions votre adresse e-mail..."
};
var errorGeneric = "Une erreur est survenue lors de la verification.\nVeuillez reessayer.";
var resendFailed = "Echec du renvoi de l'e-mail.\nVeuillez reessayer.";
var emailLabel = "E-mail";
var emailPlaceholder = "Entrez votre e-mail pour renvoyer la verification";
var resendSuccess = "E-mail de verification renvoye !";
var resendCooldown = "Renvoyer dans {{seconds}}s";
var resend = { "success": "E-mail de verification envoye avec succes." };
var token = {
	"invalid": "Ce lien de verification est invalide.",
	"expired": "Ce lien de verification a expire. Veuillez en demander un nouveau."
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
