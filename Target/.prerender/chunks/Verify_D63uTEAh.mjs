const account = {"forgotPassword":"Passwort vergessen - Code Editor Land","resetPassword":"Passwort zurücksetzen - Code Editor Land","signIn":"Anmelden - Code Editor Land","signUp":"Registrieren - Code Editor Land"};
const description$1 = "Der Code-Editor der nächsten Generation";
const downloads = {"description":"Laden Sie Code Editor Land für macOS, Windows und Linux herunter.\nAlle Versionen sind signiert und für Ihre Sicherheit verifiziert.","title":"Code Editor Land herunterladen | Der Code-Editor der nächsten Generation"};
const home = {"description":"Code Editor Land ist ein leistungsstarker, ressourcenschonender Code-Editor, gebaut mit Rust und Tauri.\nErleben Sie VS Code","title":"Code Editor Land | Der Code-Editor der nächsten Generation"};
const legal = {"privacy":{"description":"Datenschutzrichtlinie für Code Editor Land - Erfahren Sie, wie wir Ihre personenbezogenen Daten in Übereinstimmung mit DSGVO und CCPA erheben, verwenden und schützen.","title":"Datenschutzrichtlinie | Code Editor Land"},"terms":{"description":"Nutzungsbedingungen für Code Editor Land - Regelung Ihrer Nutzung unseres Open-Source-Code-Editors und verwandter Dienste.","title":"Nutzungsbedingungen | Code Editor Land"}};
const license = {"description":"Code Editor Land ist Open Source unter der Creative Commons CC0 1.0 Universal Lizenz.","title":"Lizenz | Code Editor Land"};
const title$1 = "Code Editor Land";
const verify = {"title":"E-Mail verifizieren - Code Editor Land"};
const docs = {"title":"Dokumentation | Code Editor Land","description":"Durchsuchen Sie die Dokumentation von Code Editor Land, Architekturleitfäden und Entwicklerressourcen."};
const blog = {"title":"Blog | Code Editor Land","description":"Neuigkeiten, Updates und Artikel vom Code Editor Land Team."};
const contributing = {"title":"Mitwirken | Code Editor Land","description":"Ein Open-Source-Code-Editor, gebaut mit Rust und Tauri.\nErfahren Sie, wie Sie zu Code Editor Land beitragen können."};
const dashboard = {"title":"Dashboard | Code Editor Land","description":"Verwalten Sie Ihr Konto, Downloads und Einstellungen.\nIhr Code Editor Land Dashboard."};
const contact = {"sales":{"title":"Unternehmensanfragen | Code Editor Land","description":"Kontaktieren Sie das Code Editor Land Team für Unternehmenslizenzierung, Support und Bereitstellungsoptionen."}};
const portal = {"title":"Editor-Portal | Code Editor Land","description":"Cloud, Anbieter oder Local-First.\nWählen Sie Ihre Authentifizierungsmethode für Code Editor Land."};
const oauth = {"success":"Authentifizierung erfolgreich - Code Editor Land","successDescription":"Sie wurden erfolgreich authentifiziert."};
const DeMeta = {
  account,
  description: description$1,
  downloads,
  home,
  legal,
  license,
  title: title$1,
  verify,
  docs,
  blog,
  contributing,
  dashboard,
  contact,
  portal,
  oauth,
};

const Meta = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	account,
	blog,
	contact,
	contributing,
	dashboard,
	default: DeMeta,
	description: description$1,
	docs,
	downloads,
	home,
	legal,
	license,
	oauth,
	portal,
	title: title$1,
	verify
}, Symbol.toStringTag, { value: 'Module' }));

const error = {"title":"Echec de la verification","description":"Ce lien de verification est invalide ou a expire.","instruction":"Veuillez demander un nouvel e-mail de verification ou contacter le support si le probleme persiste.","resendButton":"Envoyer un nouvel e-mail de verification","contactSupport":"Contacter le support","backToSignInButton":"Retour a la connexion"};
const pending = {"description":"Un lien de verification a ete envoye a votre adresse e-mail.\nVeuillez verifier votre boite de reception et cliquer sur le lien pour activer votre compte.\nLe lien est valide pendant 7 jours.\nSi l'e-mail n'est pas recu dans les prochaines minutes, verifiez le dossier spam ou promotions.\nPour des raisons de securite, ne partagez pas cet e-mail avec quiconque.","resendButton":"Renvoyer l'e-mail de verification","title":"Verifiez votre adresse e-mail"};
const success = {"title":"E-mail verifie !","description":"Votre e-mail a ete verifie avec succes.","instruction":"Vous pouvez maintenant vous connecter a votre compte et commencer a utiliser Code Editor Land.","continue":"Continuer vers la connexion","continueButton":"Continuer vers la page d'accueil"};
const title = "Verifiez votre e-mail";
const description = "Un lien de verification a ete envoye a";
const instruction = "Cliquez sur le lien dans l'e-mail pour verifier votre compte et commencer a utiliser Code Editor Land.";
const didntReceive = "Vous n'avez pas recu l'e-mail ?";
const checkSpam = "Verifiez votre dossier spam ou";
const resendLink = "renvoyer l'e-mail de verification";
const resendButton = "Renvoyer l'e-mail de verification";
const backToSignIn = "Retour a la connexion";
const resending = "Envoi en cours...";
const resent = "E-mail de verification envoye !";
const verifying = {"title":"Verification de votre e-mail","description":"Veuillez patienter pendant que nous verifions votre adresse e-mail..."};
const errorGeneric = "Une erreur est survenue lors de la verification.\nVeuillez reessayer.";
const resendFailed = "Echec du renvoi de l'e-mail.\nVeuillez reessayer.";
const emailLabel = "E-mail";
const emailPlaceholder = "Entrez votre e-mail pour renvoyer la verification";
const resendSuccess = "E-mail de verification renvoye !";
const resendCooldown = "Renvoyer dans {{seconds}}s";
const resend = {"success":"E-mail de verification envoye avec succes."};
const token = {"invalid":"Ce lien de verification est invalide.","expired":"Ce lien de verification a expire. Veuillez en demander un nouveau."};
const FrVerify = {
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
	default: FrVerify,
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

export { DeMeta as D, FrVerify as F, Meta as M, Verify as V };
