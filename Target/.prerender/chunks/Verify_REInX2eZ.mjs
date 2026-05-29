const brand$1 = {"name":"Code Editor Land","description":"Der Code-Editor der nächsten Generation.\nOpen Source und für immer kostenlos."};
const columns$1 = {"product":{"title":"Produkt","features":"Funktionen","downloads":"Herunterladen","docs":"Dokumentation","blog":"Blog"},"company":{"title":"Gemeinschaft","issues":"Diskussionen","contributing":"Mitwirken","github":"GitHub","enterprise":"Enterprise"},"legal":{"title":"Rechtliches","privacy":"Datenschutz","terms":"Nutzungsbedingungen","license":"Lizenz"}};
const social$1 = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar$1 = {"copyright":"© {{year}} Code Editor Land. Alle Rechte vorbehalten.","builtBy":"Erstellt vom Code Editor Land Team","madeWith":"Erstellt mit"};
const funding$1 = {"prefix":"Dieses Projekt wurde finanziert durch den ","ngiFund":"NGI0 Commons Fund","nlnetIntro":", einen Fonds der ","nlnet":"NLnet","euSupport":" mit finanzieller Unterstützung des Programms der Europäischen Kommission für das Internet der nächsten Generation, unter Fördervereinbarung Nr. 101135429. ","projectPage":"Projektseite anzeigen"};
const DeFooter = {
  brand: brand$1,
  columns: columns$1,
  social: social$1,
  bottomBar: bottomBar$1,
  funding: funding$1,
};

const Footer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar: bottomBar$1,
	brand: brand$1,
	columns: columns$1,
	default: DeFooter,
	funding: funding$1,
	social: social$1
}, Symbol.toStringTag, { value: 'Module' }));

const brand = {"name":"Code Editor Land","description":"L'éditeur de code de nouvelle génération.\nOpen source et gratuit pour toujours."};
const columns = {"product":{"title":"Produit","features":"Fonctionnalités","downloads":"Télécharger","docs":"Documentation","blog":"Blog"},"company":{"title":"Communauté","issues":"Issues","contributing":"Contribuer","github":"GitHub","enterprise":"Entreprise"},"legal":{"title":"Mentions légales","privacy":"Confidentialité","terms":"Conditions d'utilisation","license":"Licence"}};
const social = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar = {"copyright":"© {{year}} Code Editor Land. Tous droits réservés.","builtBy":"Créé par l'équipe Code Editor Land","madeWith":"Fait avec"};
const funding = {"prefix":"Ce projet a été financé par le ","ngiFund":"Fonds NGI0 Commons","nlnetIntro":", un fonds établi par ","nlnet":"NLnet","euSupport":" avec le soutien financier du programme Internet de prochaine génération de la Commission européenne, dans le cadre de la convention de subvention n° 101135429. ","projectPage":"Voir la page du projet"};
const FrFooter = {
  brand,
  columns,
  social,
  bottomBar,
  funding,
};

const Footer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar,
	brand,
	columns,
	default: FrFooter,
	funding,
	social
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

export { DeFooter as D, EsVerify as E, Footer$1 as F, Verify as V, Footer as a, FrFooter as b };
