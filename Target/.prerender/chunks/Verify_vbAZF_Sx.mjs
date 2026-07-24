//#region Source/Library/I18n/Locale/Bg/Verify.json
var error = {
	"title": "Верификацията неуспешна",
	"description": "Този линк за верификация е невалиден или изтекъл.",
	"instruction": "Заявете нов имейл за верификация или се свържете с поддръжката, ако проблемът продължава.",
	"resendButton": "Изпратете нов имейл за верификация",
	"contactSupport": "Свържете се с поддръжката",
	"backToSignInButton": "Обратно към вход"
};
var pending = {
	"description": "Линк за верификация е изпратен до имейл адреса ви.\n\nМоля, проверете входящата си поща и кликнете линка, за да активирате профила.\n\nЛинкът е валиден 7 дни.\n\nАко имейлът не пристигне за няколко минути, проверете папката за нежелана поща.\n\nОт съображения за сигурност не споделяйте този имейл с никого.",
	"resendButton": "Изпратете отново имейл за верификация",
	"title": "Потвърдете имейл адреса си"
};
var success = {
	"title": "Имейлът е потвърден.",
	"description": "Имейл адресът ви е успешно потвърден.",
	"instruction": "Вече можете да влезете и да започнете да използвате Land.",
	"continue": "Продължете към вход",
	"continueButton": "Продължете към началната страница"
};
var title = "Потвърдете имейла си";
var description = "Линк за верификация е изпратен до";
var instruction = "Кликнете линка в имейла, за да потвърдите профила и да започнете да използвате Land.";
var didntReceive = "Не получихте имейла?";
var checkSpam = "Проверете папката за нежелана поща или";
var resendLink = "изпратете отново имейл за верификация";
var resendButton = "Изпратете отново";
var backToSignIn = "Обратно към вход";
var resending = "Изпращане...";
var resent = "Имейлът за верификация е изпратен.";
var verifying = {
	"title": "Верифициране на имейла ви",
	"description": "Моля, изчакайте докато верифицираме имейл адреса ви..."
};
var errorGeneric = "Грешка по време на верификацията. Моля, опитайте отново.";
var resendFailed = "Неуспешно повторно изпращане. Моля, опитайте отново.";
var emailLabel = "Имейл";
var emailPlaceholder = "Въведете имейла за повторна верификация";
var resendSuccess = "Имейлът за верификация е изпратен отново.";
var resendCooldown = "Изпращане отново след {{seconds}}с";
var resend = { "success": "Имейлът за верификация е изпратен успешно." };
var token = {
	"invalid": "Този линк за верификация е невалиден.",
	"expired": "Този линк за верификация е изтекъл. Моля, заявете нов."
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
