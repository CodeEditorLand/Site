//#region Source/Library/I18n/Locale/Es/Verify.json
var error = {
	"title": "Verificacion fallida",
	"description": "Este enlace de verificacion es invalido o ha caducado.",
	"instruction": "Por favor, solicite un nuevo correo electronico de verificacion o contacte al soporte si el problema persiste.",
	"resendButton": "Enviar nuevo correo de verificacion",
	"contactSupport": "Contactar soporte",
	"backToSignInButton": "Volver a iniciar sesion"
};
var pending = {
	"description": "Se ha enviado un enlace de verificacion a su direccion de correo electronico.\nPor favor, revise su bandeja de entrada y haga clic en el enlace para activar su cuenta.\nEl enlace es valido durante 7 dias.\nSi no recibe el correo en unos minutos, revise la carpeta de spam o promociones.\nPor seguridad, no comparta este correo con nadie.",
	"resendButton": "Reenviar correo de verificacion",
	"title": "Verifique su direccion de correo electronico"
};
var success = {
	"title": "Correo verificado!",
	"description": "Su correo electronico ha sido verificado exitosamente.",
	"instruction": "Ahora puede iniciar sesion en su cuenta y comenzar a usar Code Editor Land.",
	"continue": "Continuar a iniciar sesion",
	"continueButton": "Continuar a la pagina de inicio"
};
var title = "Verifique su correo electronico";
var description = "Se envio un enlace de verificacion a";
var instruction = "Haga clic en el enlace del correo electronico para verificar su cuenta y comenzar a usar Code Editor Land.";
var didntReceive = "No recibio el correo electronico?";
var checkSpam = "Revise su carpeta de spam o";
var resendLink = "reenviar correo de verificacion";
var resendButton = "Reenviar correo de verificacion";
var backToSignIn = "Volver a iniciar sesion";
var resending = "Enviando...";
var resent = "Correo de verificacion enviado!";
var verifying = {
	"title": "Verificando su correo electronico",
	"description": "Por favor espere mientras verificamos su direccion de correo electronico..."
};
var errorGeneric = "Ocurrio un error durante la verificacion.\nPor favor, intentelo de nuevo.";
var resendFailed = "No se pudo reenviar el correo electronico.\nPor favor, intentelo de nuevo.";
var emailLabel = "Correo electronico";
var emailPlaceholder = "Ingrese su correo electronico para reenviar la verificacion";
var resendSuccess = "Correo de verificacion reenviado!";
var resendCooldown = "Reenviar en {{seconds}}s";
var resend = { "success": "Correo de verificacion enviado exitosamente." };
var token = {
	"invalid": "Este enlace de verificacion es invalido.",
	"expired": "Este enlace de verificacion ha caducado. Por favor solicite uno nuevo."
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
