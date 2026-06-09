const error = {"title":"Verifizierung fehlgeschlagen","description":"Dieser Verifizierungslink ist ungültig oder abgelaufen.","instruction":"Bitte fordern Sie eine neue Verifizierungs-E-Mail an oder kontaktieren Sie den Support, wenn das Problem weiterhin besteht.","resendButton":"Neue Verifizierungs-E-Mail senden","contactSupport":"Support kontaktieren","backToSignInButton":"Zurück zur Anmeldung"};
const pending = {"description":"Ein Verifizierungslink wurde an Ihre E-Mail-Adresse gesendet.\nBitte prüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihr Konto zu aktivieren.\nDer Link ist 7 Tage gültig.\nFalls die E-Mail nicht innerhalb weniger Minuten eintrifft, prüfen Sie den Spam- oder Werbeordner.\nAus Sicherheitsgründen teilen Sie diese E-Mail bitte mit niemandem.","resendButton":"Verifizierungs-E-Mail erneut senden","title":"E-Mail-Adresse verifizieren"};
const success = {"title":"E-Mail verifiziert!","description":"Ihre E-Mail wurde erfolgreich verifiziert.","instruction":"Sie können sich jetzt bei Ihrem Konto anmelden und Code Editor Land nutzen.","continue":"Weiter zur Anmeldung","continueButton":"Weiter zur Startseite"};
const title$1 = "E-Mail verifizieren";
const description$1 = "Ein Verifizierungslink wurde gesendet an";
const instruction = "Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu verifizieren und Code Editor Land zu nutzen.";
const didntReceive = "E-Mail nicht erhalten?";
const checkSpam = "Prüfen Sie Ihren Spam-Ordner oder";
const resendLink = "Verifizierungs-E-Mail erneut senden";
const resendButton = "Verifizierungs-E-Mail erneut senden";
const backToSignIn = "Zurück zur Anmeldung";
const resending = "Wird gesendet...";
const resent = "Verifizierungs-E-Mail gesendet!";
const verifying = {"title":"E-Mail wird verifiziert","description":"Bitte warten Sie, während wir Ihre E-Mail-Adresse verifizieren..."};
const errorGeneric = "Bei der Verifizierung ist ein Fehler aufgetreten.\nBitte versuchen Sie es erneut.";
const resendFailed = "E-Mail konnte nicht erneut gesendet werden.\nBitte versuchen Sie es erneut.";
const emailLabel = "E-Mail";
const emailPlaceholder = "Geben Sie Ihre E-Mail-Adresse ein, um die Verifizierung erneut zu senden";
const resendSuccess = "Verifizierungs-E-Mail erneut gesendet!";
const resendCooldown = "Erneut senden in {{seconds}}s";
const resend = {"success":"Verifizierungs-E-Mail erfolgreich gesendet."};
const token = {"invalid":"Dieser Verifizierungslink ist ungültig.","expired":"Dieser Verifizierungslink ist abgelaufen. Bitte fordern Sie einen neuen an."};
const Verify = {
  error,
  pending,
  success,
  title: title$1,
  description: description$1,
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

const Verify$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	backToSignIn,
	checkSpam,
	default: Verify,
	description: description$1,
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

const account = {"forgotPassword":"Mot de passe oublié - Code Editor Land","resetPassword":"Réinitialiser le mot de passe - Code Editor Land","signIn":"Connexion - Code Editor Land","signUp":"Inscription - Code Editor Land"};
const description = "L'éditeur de code de nouvelle génération";
const downloads = {"description":"Téléchargez Code Editor Land pour macOS, Windows et Linux.\nToutes les versions sont signées et vérifiées pour votre sécurité.","title":"Télécharger Code Editor Land | L'éditeur de code de nouvelle génération"};
const home = {"description":"Code Editor Land est un éditeur de code haute performance et économe en ressources, construit avec Rust et Tauri.\nDécouvrez VS Code","title":"Code Editor Land | L'éditeur de code de nouvelle génération"};
const legal = {"privacy":{"description":"Politique de confidentialité de Code Editor Land - Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD et au CCPA.","title":"Politique de confidentialité | Code Editor Land"},"terms":{"description":"Conditions d'utilisation de Code Editor Land - Régissant votre utilisation de notre éditeur de code open source et services associés.","title":"Conditions d'utilisation | Code Editor Land"}};
const license = {"description":"Code Editor Land est open source sous la licence Creative Commons CC0 1.0 Universal.","title":"Licence | Code Editor Land"};
const title = "Code Editor Land";
const verify = {"title":"Vérification de l'e-mail - Code Editor Land"};
const docs = {"title":"Documentation | Code Editor Land","description":"Parcourez la documentation de Code Editor Land, les guides d'architecture et les ressources pour développeurs."};
const blog = {"title":"Blog | Code Editor Land","description":"Actualités, mises à jour et articles de l'équipe Code Editor Land."};
const contributing = {"title":"Contribuer | Code Editor Land","description":"Un éditeur de code open source construit avec Rust et Tauri.\nDécouvrez comment contribuer à Code Editor Land."};
const dashboard = {"title":"Tableau de bord | Code Editor Land","description":"Gérez votre compte, vos téléchargements et vos paramètres.\nVotre tableau de bord Code Editor Land."};
const contact = {"sales":{"title":"Demandes entreprise | Code Editor Land","description":"Contactez l'équipe Code Editor Land pour les licences entreprise, le support et les options de déploiement."}};
const portal = {"title":"Portail de l'éditeur | Code Editor Land","description":"Cloud, fournisseur ou local.\nChoisissez votre méthode d'authentification pour Code Editor Land."};
const oauth = {"success":"Authentification réussie - Code Editor Land","successDescription":"Vous avez été authentifié avec succès."};
const Meta = {
  account,
  description,
  downloads,
  home,
  legal,
  license,
  title,
  verify,
  docs,
  blog,
  contributing,
  dashboard,
  contact,
  portal,
  oauth,
};

const Meta$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	account,
	blog,
	contact,
	contributing,
	dashboard,
	default: Meta,
	description,
	docs,
	downloads,
	home,
	legal,
	license,
	oauth,
	portal,
	title,
	verify
}, Symbol.toStringTag, { value: 'Module' }));

export { Meta$1 as M, Verify$1 as V };
//# sourceMappingURL=Meta.gaUI57FL.js.map
