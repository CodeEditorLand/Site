// Source/Library/I18n/Locale/Es/Verify.json
var error = {
	"title": "Verificación fallida",
	"description": "Este enlace de verificación es inválido o ha caducado.",
	"instruction": "Por favor, solicite un nuevo correo electrónico de verificación o contacte al soporte si el problema persiste.",
	"resendButton": "Enviar nuevo correo de verificación",
	"contactSupport": "Contactar soporte",
	"backToSignInButton": "Volver a iniciar sesión"
};
var pending = {
	"description": "Se ha enviado un enlace de verificación a su dirección de correo electrónico.\nPor favor, revise su bandeja de entrada y haga clic en el enlace para activar su cuenta.\nEl enlace es válido durante 24 horas.\nSi no recibe el correo en unos minutos, revise la carpeta de spam o promociones.\nPor seguridad, no comparta el enlace de verificación con nadie.",
	"resendButton": "Reenviar correo de verificación",
	"title": "Verifique su dirección de correo electrónico"
};
var success = {
	"title": "Correo verificado!",
	"description": "Su correo electrónico ha sido verificado exitosamente.",
	"instruction": "Ahora puede iniciar sesión en su cuenta y comenzar a usar Code Editor Land.",
	"continue": "Continuar a iniciar sesión",
	"continueButton": "Continuar a la página de inicio"
};
var title = "Verifique su correo electrónico";
var description = "Se envió un enlace de verificación a";
var instruction = "Haga clic en el enlace del correo electrónico para verificar su cuenta y comenzar a usar Code Editor Land.";
var didntReceive = "No recibió el correo electrónico?";
var checkSpam = "Revise su carpeta de spam o";
var resendLink = "reenviar correo de verificación";
var resendButton = "Reenviar correo de verificación";
var backToSignIn = "Volver a iniciar sesión";
var resending = "Enviando...";
var resent = "Correo de verificación enviado!";
var verifying = {
	"title": "Verificando su correo electrónico",
	"description": "Por favor espere mientras verificamos su dirección de correo electrónico..."
};
var errorGeneric = "Ocurrió un error durante la verificación.\nPor favor, inténtelo de nuevo.";
var resendFailed = "No se pudo reenviar el correo electrónico.\nPor favor, inténtelo de nuevo.";
var emailLabel = "Correo electrónico";
var emailPlaceholder = "Ingrese su correo electrónico";
var resendSuccess = "Correo de verificación reenviado!";
var resendCooldown = "Reenviar en {{seconds}}s";
var resend = { "success": "Correo de verificación enviado exitosamente." };
var token = {
	"invalid": "Este enlace de verificación es inválido.",
	"expired": "Este enlace de verificación ha caducado. Por favor solicite uno nuevo."
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
export { verifying as C, token as S, resendSuccess as _, didntReceive as a, success as b, error as c, pending as d, resend as f, resendLink as g, resendFailed as h, description as i, errorGeneric as l, resendCooldown as m, backToSignIn as n, emailLabel as o, resendButton as p, checkSpam as r, emailPlaceholder as s, Verify_default as t, instruction as u, resending as v, title as x, resent as y };
