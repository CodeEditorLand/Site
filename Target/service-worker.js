


















const INCREMENT = "1775075093487" ?? "Initial";

const CACHE_ROUTE = `Route-${INCREMENT}`;

const CACHE_ASSET = `Asset-${INCREMENT}`;

const CACHE = [CACHE_ROUTE, CACHE_ASSET];

let CurrentClientVersion = null;

const BASE_REMOTE =
	new URLSearchParams(self.location.search).get("BASE_REMOTE") ||
	self.location.origin;



const Log = false
	? (..._Message) => {
			console.log(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const ErrorLog = false
	? (..._Message) => {
			console.error(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};

const WarnLog = false
	? (..._Message) => {
			console.warn(
				`[Route ${INCREMENT}]`,
				`(Remote: ${BASE_REMOTE})`,
				..._Message,
			);
		}
	: () => {};



const CanonicalSet = new Set(["/","/Account/ForgotPassword","/Account/ResetPassword","/Account/SignIn","/Account/SignUp","/Blog","/Contact/Sale","/Contributing","/Dashboard","/Doc","/Download","/Legal/Privacy","/Legal/Term","/License","/OAuth/Success","/Portal","/Verify"]);

const VariantMap = {"/account/forgotpassword":"/Account/ForgotPassword","/ACCOUNT/forgotpassword":"/Account/ForgotPassword","/Account/forgotpassword":"/Account/ForgotPassword","/ACcount/forgotpassword":"/Account/ForgotPassword","/ACCount/forgotpassword":"/Account/ForgotPassword","/ACCOunt/forgotpassword":"/Account/ForgotPassword","/ACCOUnt/forgotpassword":"/Account/ForgotPassword","/ACCOUNt/forgotpassword":"/Account/ForgotPassword","/aCCOUNT/forgotpassword":"/Account/ForgotPassword","/acCOUNT/forgotpassword":"/Account/ForgotPassword","/accOUNT/forgotpassword":"/Account/ForgotPassword","/accoUNT/forgotpassword":"/Account/ForgotPassword","/accouNT/forgotpassword":"/Account/ForgotPassword","/accounT/forgotpassword":"/Account/ForgotPassword","/accounts/forgotpassword":"/Account/ForgotPassword","/ACCOUNTS/forgotpassword":"/Account/ForgotPassword","/Accounts/forgotpassword":"/Account/ForgotPassword","/ac/forgotpassword":"/Account/ForgotPassword","/AC/forgotpassword":"/Account/ForgotPassword","/Ac/forgotpassword":"/Account/ForgotPassword","/acc/forgotpassword":"/Account/ForgotPassword","/ACC/forgotpassword":"/Account/ForgotPassword","/Acc/forgotpassword":"/Account/ForgotPassword","/acco/forgotpassword":"/Account/ForgotPassword","/ACCO/forgotpassword":"/Account/ForgotPassword","/Acco/forgotpassword":"/Account/ForgotPassword","/account/FORGOTPASSWORD":"/Account/ForgotPassword","/account/ForgotPassword":"/Account/ForgotPassword","/account/Forgotpassword":"/Account/ForgotPassword","/account/FOrgotpassword":"/Account/ForgotPassword","/account/FORgotpassword":"/Account/ForgotPassword","/account/FORGotpassword":"/Account/ForgotPassword","/account/FORGOtpassword":"/Account/ForgotPassword","/account/FORGOTpassword":"/Account/ForgotPassword","/account/FORGOTPassword":"/Account/ForgotPassword","/account/FORGOTPAssword":"/Account/ForgotPassword","/account/FORGOTPASsword":"/Account/ForgotPassword","/account/FORGOTPASSword":"/Account/ForgotPassword","/account/FORGOTPASSWord":"/Account/ForgotPassword","/account/FORGOTPASSWOrd":"/Account/ForgotPassword","/account/FORGOTPASSWORd":"/Account/ForgotPassword","/account/fORGOTPASSWORD":"/Account/ForgotPassword","/account/foRGOTPASSWORD":"/Account/ForgotPassword","/account/forGOTPASSWORD":"/Account/ForgotPassword","/account/forgOTPASSWORD":"/Account/ForgotPassword","/account/forgoTPASSWORD":"/Account/ForgotPassword","/account/forgotPASSWORD":"/Account/ForgotPassword","/account/forgotpASSWORD":"/Account/ForgotPassword","/account/forgotpaSSWORD":"/Account/ForgotPassword","/account/forgotpasSWORD":"/Account/ForgotPassword","/account/forgotpassWORD":"/Account/ForgotPassword","/account/forgotpasswORD":"/Account/ForgotPassword","/account/forgotpasswoRD":"/Account/ForgotPassword","/account/forgotpassworD":"/Account/ForgotPassword","/account/forgotpasswords":"/Account/ForgotPassword","/account/FORGOTPASSWORDS":"/Account/ForgotPassword","/account/Forgotpasswords":"/Account/ForgotPassword","/account/fo":"/Account/ForgotPassword","/account/FO":"/Account/ForgotPassword","/account/Fo":"/Account/ForgotPassword","/account/for":"/Account/ForgotPassword","/account/FOR":"/Account/ForgotPassword","/account/For":"/Account/ForgotPassword","/account/forg":"/Account/ForgotPassword","/account/FORG":"/Account/ForgotPassword","/account/Forg":"/Account/ForgotPassword","/account/forgot-password":"/Account/ForgotPassword","/account/FORGOT-PASSWORD":"/Account/ForgotPassword","/account/Forgot-password":"/Account/ForgotPassword","/account/forgot_password":"/Account/ForgotPassword","/account/FORGOT_PASSWORD":"/Account/ForgotPassword","/account/Forgot_password":"/Account/ForgotPassword","/account/forgot.password":"/Account/ForgotPassword","/account/FORGOT.PASSWORD":"/Account/ForgotPassword","/account/Forgot.password":"/Account/ForgotPassword","/account/password-forgot":"/Account/ForgotPassword","/account/PASSWORD-FORGOT":"/Account/ForgotPassword","/account/Password-forgot":"/Account/ForgotPassword","/ACCOUNT/FORGOTPASSWORD":"/Account/ForgotPassword","/accountforgotpassword":"/Account/ForgotPassword","/account-forgotpassword":"/Account/ForgotPassword","/account_forgotpassword":"/Account/ForgotPassword","/account/forgotpassword/":"/Account/ForgotPassword","/ACCOUNT/forgotpassword/":"/Account/ForgotPassword","/Account/forgotpassword/":"/Account/ForgotPassword","/ACcount/forgotpassword/":"/Account/ForgotPassword","/ACCount/forgotpassword/":"/Account/ForgotPassword","/ACCOunt/forgotpassword/":"/Account/ForgotPassword","/ACCOUnt/forgotpassword/":"/Account/ForgotPassword","/ACCOUNt/forgotpassword/":"/Account/ForgotPassword","/aCCOUNT/forgotpassword/":"/Account/ForgotPassword","/acCOUNT/forgotpassword/":"/Account/ForgotPassword","/accOUNT/forgotpassword/":"/Account/ForgotPassword","/accoUNT/forgotpassword/":"/Account/ForgotPassword","/accouNT/forgotpassword/":"/Account/ForgotPassword","/accounT/forgotpassword/":"/Account/ForgotPassword","/accounts/forgotpassword/":"/Account/ForgotPassword","/ACCOUNTS/forgotpassword/":"/Account/ForgotPassword","/Accounts/forgotpassword/":"/Account/ForgotPassword","/ac/forgotpassword/":"/Account/ForgotPassword","/AC/forgotpassword/":"/Account/ForgotPassword","/Ac/forgotpassword/":"/Account/ForgotPassword","/acc/forgotpassword/":"/Account/ForgotPassword","/ACC/forgotpassword/":"/Account/ForgotPassword","/Acc/forgotpassword/":"/Account/ForgotPassword","/acco/forgotpassword/":"/Account/ForgotPassword","/ACCO/forgotpassword/":"/Account/ForgotPassword","/Acco/forgotpassword/":"/Account/ForgotPassword","/account/FORGOTPASSWORD/":"/Account/ForgotPassword","/account/ForgotPassword/":"/Account/ForgotPassword","/account/Forgotpassword/":"/Account/ForgotPassword","/account/FOrgotpassword/":"/Account/ForgotPassword","/account/FORgotpassword/":"/Account/ForgotPassword","/account/FORGotpassword/":"/Account/ForgotPassword","/account/FORGOtpassword/":"/Account/ForgotPassword","/account/FORGOTpassword/":"/Account/ForgotPassword","/account/FORGOTPassword/":"/Account/ForgotPassword","/account/FORGOTPAssword/":"/Account/ForgotPassword","/account/FORGOTPASsword/":"/Account/ForgotPassword","/account/FORGOTPASSword/":"/Account/ForgotPassword","/account/FORGOTPASSWord/":"/Account/ForgotPassword","/account/FORGOTPASSWOrd/":"/Account/ForgotPassword","/account/FORGOTPASSWORd/":"/Account/ForgotPassword","/account/fORGOTPASSWORD/":"/Account/ForgotPassword","/account/foRGOTPASSWORD/":"/Account/ForgotPassword","/account/forGOTPASSWORD/":"/Account/ForgotPassword","/account/forgOTPASSWORD/":"/Account/ForgotPassword","/account/forgoTPASSWORD/":"/Account/ForgotPassword","/account/forgotPASSWORD/":"/Account/ForgotPassword","/account/forgotpASSWORD/":"/Account/ForgotPassword","/account/forgotpaSSWORD/":"/Account/ForgotPassword","/account/forgotpasSWORD/":"/Account/ForgotPassword","/account/forgotpassWORD/":"/Account/ForgotPassword","/account/forgotpasswORD/":"/Account/ForgotPassword","/account/forgotpasswoRD/":"/Account/ForgotPassword","/account/forgotpassworD/":"/Account/ForgotPassword","/account/forgotpasswords/":"/Account/ForgotPassword","/account/FORGOTPASSWORDS/":"/Account/ForgotPassword","/account/Forgotpasswords/":"/Account/ForgotPassword","/account/fo/":"/Account/ForgotPassword","/account/FO/":"/Account/ForgotPassword","/account/Fo/":"/Account/ForgotPassword","/account/for/":"/Account/ForgotPassword","/account/FOR/":"/Account/ForgotPassword","/account/For/":"/Account/ForgotPassword","/account/forg/":"/Account/ForgotPassword","/account/FORG/":"/Account/ForgotPassword","/account/Forg/":"/Account/ForgotPassword","/account/forgot-password/":"/Account/ForgotPassword","/account/FORGOT-PASSWORD/":"/Account/ForgotPassword","/account/Forgot-password/":"/Account/ForgotPassword","/account/forgot_password/":"/Account/ForgotPassword","/account/FORGOT_PASSWORD/":"/Account/ForgotPassword","/account/Forgot_password/":"/Account/ForgotPassword","/account/forgot.password/":"/Account/ForgotPassword","/account/FORGOT.PASSWORD/":"/Account/ForgotPassword","/account/Forgot.password/":"/Account/ForgotPassword","/account/password-forgot/":"/Account/ForgotPassword","/account/PASSWORD-FORGOT/":"/Account/ForgotPassword","/account/Password-forgot/":"/Account/ForgotPassword","/ACCOUNT/FORGOTPASSWORD/":"/Account/ForgotPassword","/Account/ForgotPassword/":"/Account/ForgotPassword","/accountforgotpassword/":"/Account/ForgotPassword","/account-forgotpassword/":"/Account/ForgotPassword","/account_forgotpassword/":"/Account/ForgotPassword","/account/resetpassword":"/Account/ResetPassword","/ACCOUNT/resetpassword":"/Account/ResetPassword","/Account/resetpassword":"/Account/ResetPassword","/ACcount/resetpassword":"/Account/ResetPassword","/ACCount/resetpassword":"/Account/ResetPassword","/ACCOunt/resetpassword":"/Account/ResetPassword","/ACCOUnt/resetpassword":"/Account/ResetPassword","/ACCOUNt/resetpassword":"/Account/ResetPassword","/aCCOUNT/resetpassword":"/Account/ResetPassword","/acCOUNT/resetpassword":"/Account/ResetPassword","/accOUNT/resetpassword":"/Account/ResetPassword","/accoUNT/resetpassword":"/Account/ResetPassword","/accouNT/resetpassword":"/Account/ResetPassword","/accounT/resetpassword":"/Account/ResetPassword","/accounts/resetpassword":"/Account/ResetPassword","/ACCOUNTS/resetpassword":"/Account/ResetPassword","/Accounts/resetpassword":"/Account/ResetPassword","/ac/resetpassword":"/Account/ResetPassword","/AC/resetpassword":"/Account/ResetPassword","/Ac/resetpassword":"/Account/ResetPassword","/acc/resetpassword":"/Account/ResetPassword","/ACC/resetpassword":"/Account/ResetPassword","/Acc/resetpassword":"/Account/ResetPassword","/acco/resetpassword":"/Account/ResetPassword","/ACCO/resetpassword":"/Account/ResetPassword","/Acco/resetpassword":"/Account/ResetPassword","/account/RESETPASSWORD":"/Account/ResetPassword","/account/ResetPassword":"/Account/ResetPassword","/account/Resetpassword":"/Account/ResetPassword","/account/REsetpassword":"/Account/ResetPassword","/account/RESetpassword":"/Account/ResetPassword","/account/RESEtpassword":"/Account/ResetPassword","/account/RESETpassword":"/Account/ResetPassword","/account/RESETPassword":"/Account/ResetPassword","/account/RESETPAssword":"/Account/ResetPassword","/account/RESETPASsword":"/Account/ResetPassword","/account/RESETPASSword":"/Account/ResetPassword","/account/RESETPASSWord":"/Account/ResetPassword","/account/RESETPASSWOrd":"/Account/ResetPassword","/account/RESETPASSWORd":"/Account/ResetPassword","/account/rESETPASSWORD":"/Account/ResetPassword","/account/reSETPASSWORD":"/Account/ResetPassword","/account/resETPASSWORD":"/Account/ResetPassword","/account/reseTPASSWORD":"/Account/ResetPassword","/account/resetPASSWORD":"/Account/ResetPassword","/account/resetpASSWORD":"/Account/ResetPassword","/account/resetpaSSWORD":"/Account/ResetPassword","/account/resetpasSWORD":"/Account/ResetPassword","/account/resetpassWORD":"/Account/ResetPassword","/account/resetpasswORD":"/Account/ResetPassword","/account/resetpasswoRD":"/Account/ResetPassword","/account/resetpassworD":"/Account/ResetPassword","/account/resetpasswords":"/Account/ResetPassword","/account/RESETPASSWORDS":"/Account/ResetPassword","/account/Resetpasswords":"/Account/ResetPassword","/account/re":"/Account/ResetPassword","/account/RE":"/Account/ResetPassword","/account/Re":"/Account/ResetPassword","/account/res":"/Account/ResetPassword","/account/RES":"/Account/ResetPassword","/account/Res":"/Account/ResetPassword","/account/rese":"/Account/ResetPassword","/account/RESE":"/Account/ResetPassword","/account/Rese":"/Account/ResetPassword","/account/reset-password":"/Account/ResetPassword","/account/RESET-PASSWORD":"/Account/ResetPassword","/account/Reset-password":"/Account/ResetPassword","/account/reset_password":"/Account/ResetPassword","/account/RESET_PASSWORD":"/Account/ResetPassword","/account/Reset_password":"/Account/ResetPassword","/account/reset.password":"/Account/ResetPassword","/account/RESET.PASSWORD":"/Account/ResetPassword","/account/Reset.password":"/Account/ResetPassword","/account/password-reset":"/Account/ResetPassword","/account/PASSWORD-RESET":"/Account/ResetPassword","/account/Password-reset":"/Account/ResetPassword","/ACCOUNT/RESETPASSWORD":"/Account/ResetPassword","/accountresetpassword":"/Account/ResetPassword","/account-resetpassword":"/Account/ResetPassword","/account_resetpassword":"/Account/ResetPassword","/account/resetpassword/":"/Account/ResetPassword","/ACCOUNT/resetpassword/":"/Account/ResetPassword","/Account/resetpassword/":"/Account/ResetPassword","/ACcount/resetpassword/":"/Account/ResetPassword","/ACCount/resetpassword/":"/Account/ResetPassword","/ACCOunt/resetpassword/":"/Account/ResetPassword","/ACCOUnt/resetpassword/":"/Account/ResetPassword","/ACCOUNt/resetpassword/":"/Account/ResetPassword","/aCCOUNT/resetpassword/":"/Account/ResetPassword","/acCOUNT/resetpassword/":"/Account/ResetPassword","/accOUNT/resetpassword/":"/Account/ResetPassword","/accoUNT/resetpassword/":"/Account/ResetPassword","/accouNT/resetpassword/":"/Account/ResetPassword","/accounT/resetpassword/":"/Account/ResetPassword","/accounts/resetpassword/":"/Account/ResetPassword","/ACCOUNTS/resetpassword/":"/Account/ResetPassword","/Accounts/resetpassword/":"/Account/ResetPassword","/ac/resetpassword/":"/Account/ResetPassword","/AC/resetpassword/":"/Account/ResetPassword","/Ac/resetpassword/":"/Account/ResetPassword","/acc/resetpassword/":"/Account/ResetPassword","/ACC/resetpassword/":"/Account/ResetPassword","/Acc/resetpassword/":"/Account/ResetPassword","/acco/resetpassword/":"/Account/ResetPassword","/ACCO/resetpassword/":"/Account/ResetPassword","/Acco/resetpassword/":"/Account/ResetPassword","/account/RESETPASSWORD/":"/Account/ResetPassword","/account/ResetPassword/":"/Account/ResetPassword","/account/Resetpassword/":"/Account/ResetPassword","/account/REsetpassword/":"/Account/ResetPassword","/account/RESetpassword/":"/Account/ResetPassword","/account/RESEtpassword/":"/Account/ResetPassword","/account/RESETpassword/":"/Account/ResetPassword","/account/RESETPassword/":"/Account/ResetPassword","/account/RESETPAssword/":"/Account/ResetPassword","/account/RESETPASsword/":"/Account/ResetPassword","/account/RESETPASSword/":"/Account/ResetPassword","/account/RESETPASSWord/":"/Account/ResetPassword","/account/RESETPASSWOrd/":"/Account/ResetPassword","/account/RESETPASSWORd/":"/Account/ResetPassword","/account/rESETPASSWORD/":"/Account/ResetPassword","/account/reSETPASSWORD/":"/Account/ResetPassword","/account/resETPASSWORD/":"/Account/ResetPassword","/account/reseTPASSWORD/":"/Account/ResetPassword","/account/resetPASSWORD/":"/Account/ResetPassword","/account/resetpASSWORD/":"/Account/ResetPassword","/account/resetpaSSWORD/":"/Account/ResetPassword","/account/resetpasSWORD/":"/Account/ResetPassword","/account/resetpassWORD/":"/Account/ResetPassword","/account/resetpasswORD/":"/Account/ResetPassword","/account/resetpasswoRD/":"/Account/ResetPassword","/account/resetpassworD/":"/Account/ResetPassword","/account/resetpasswords/":"/Account/ResetPassword","/account/RESETPASSWORDS/":"/Account/ResetPassword","/account/Resetpasswords/":"/Account/ResetPassword","/account/re/":"/Account/ResetPassword","/account/RE/":"/Account/ResetPassword","/account/Re/":"/Account/ResetPassword","/account/res/":"/Account/ResetPassword","/account/RES/":"/Account/ResetPassword","/account/Res/":"/Account/ResetPassword","/account/rese/":"/Account/ResetPassword","/account/RESE/":"/Account/ResetPassword","/account/Rese/":"/Account/ResetPassword","/account/reset-password/":"/Account/ResetPassword","/account/RESET-PASSWORD/":"/Account/ResetPassword","/account/Reset-password/":"/Account/ResetPassword","/account/reset_password/":"/Account/ResetPassword","/account/RESET_PASSWORD/":"/Account/ResetPassword","/account/Reset_password/":"/Account/ResetPassword","/account/reset.password/":"/Account/ResetPassword","/account/RESET.PASSWORD/":"/Account/ResetPassword","/account/Reset.password/":"/Account/ResetPassword","/account/password-reset/":"/Account/ResetPassword","/account/PASSWORD-RESET/":"/Account/ResetPassword","/account/Password-reset/":"/Account/ResetPassword","/ACCOUNT/RESETPASSWORD/":"/Account/ResetPassword","/Account/ResetPassword/":"/Account/ResetPassword","/accountresetpassword/":"/Account/ResetPassword","/account-resetpassword/":"/Account/ResetPassword","/account_resetpassword/":"/Account/ResetPassword","/account/signin":"/Account/SignIn","/ACCOUNT/signin":"/Account/SignIn","/Account/signin":"/Account/SignIn","/ACcount/signin":"/Account/SignIn","/ACCount/signin":"/Account/SignIn","/ACCOunt/signin":"/Account/SignIn","/ACCOUnt/signin":"/Account/SignIn","/ACCOUNt/signin":"/Account/SignIn","/aCCOUNT/signin":"/Account/SignIn","/acCOUNT/signin":"/Account/SignIn","/accOUNT/signin":"/Account/SignIn","/accoUNT/signin":"/Account/SignIn","/accouNT/signin":"/Account/SignIn","/accounT/signin":"/Account/SignIn","/accounts/signin":"/Account/SignIn","/ACCOUNTS/signin":"/Account/SignIn","/Accounts/signin":"/Account/SignIn","/ac/signin":"/Account/SignIn","/AC/signin":"/Account/SignIn","/Ac/signin":"/Account/SignIn","/acc/signin":"/Account/SignIn","/ACC/signin":"/Account/SignIn","/Acc/signin":"/Account/SignIn","/acco/signin":"/Account/SignIn","/ACCO/signin":"/Account/SignIn","/Acco/signin":"/Account/SignIn","/account/SIGNIN":"/Account/SignIn","/account/SignIn":"/Account/SignIn","/account/Signin":"/Account/SignIn","/account/SIgnin":"/Account/SignIn","/account/SIGnin":"/Account/SignIn","/account/SIGNin":"/Account/SignIn","/account/SIGNIn":"/Account/SignIn","/account/sIGNIN":"/Account/SignIn","/account/siGNIN":"/Account/SignIn","/account/sigNIN":"/Account/SignIn","/account/signIN":"/Account/SignIn","/account/signiN":"/Account/SignIn","/account/signins":"/Account/SignIn","/account/SIGNINS":"/Account/SignIn","/account/Signins":"/Account/SignIn","/account/si":"/Account/SignIn","/account/SI":"/Account/SignIn","/account/Si":"/Account/SignIn","/account/sig":"/Account/SignIn","/account/SIG":"/Account/SignIn","/account/Sig":"/Account/SignIn","/account/sign":"/Account/SignIn","/account/SIGN":"/Account/SignIn","/account/Sign":"/Account/SignIn","/account/sign-in":"/Account/SignIn","/account/SIGN-IN":"/Account/SignIn","/account/Sign-in":"/Account/SignIn","/account/sign_in":"/Account/SignIn","/account/SIGN_IN":"/Account/SignIn","/account/Sign_in":"/Account/SignIn","/account/sign.in":"/Account/SignIn","/account/SIGN.IN":"/Account/SignIn","/account/Sign.in":"/Account/SignIn","/account/in-sign":"/Account/SignIn","/account/IN-SIGN":"/Account/SignIn","/account/In-sign":"/Account/SignIn","/ACCOUNT/SIGNIN":"/Account/SignIn","/accountsignin":"/Account/SignIn","/account-signin":"/Account/SignIn","/account_signin":"/Account/SignIn","/account/signin/":"/Account/SignIn","/ACCOUNT/signin/":"/Account/SignIn","/Account/signin/":"/Account/SignIn","/ACcount/signin/":"/Account/SignIn","/ACCount/signin/":"/Account/SignIn","/ACCOunt/signin/":"/Account/SignIn","/ACCOUnt/signin/":"/Account/SignIn","/ACCOUNt/signin/":"/Account/SignIn","/aCCOUNT/signin/":"/Account/SignIn","/acCOUNT/signin/":"/Account/SignIn","/accOUNT/signin/":"/Account/SignIn","/accoUNT/signin/":"/Account/SignIn","/accouNT/signin/":"/Account/SignIn","/accounT/signin/":"/Account/SignIn","/accounts/signin/":"/Account/SignIn","/ACCOUNTS/signin/":"/Account/SignIn","/Accounts/signin/":"/Account/SignIn","/ac/signin/":"/Account/SignIn","/AC/signin/":"/Account/SignIn","/Ac/signin/":"/Account/SignIn","/acc/signin/":"/Account/SignIn","/ACC/signin/":"/Account/SignIn","/Acc/signin/":"/Account/SignIn","/acco/signin/":"/Account/SignIn","/ACCO/signin/":"/Account/SignIn","/Acco/signin/":"/Account/SignIn","/account/SIGNIN/":"/Account/SignIn","/account/SignIn/":"/Account/SignIn","/account/Signin/":"/Account/SignIn","/account/SIgnin/":"/Account/SignIn","/account/SIGnin/":"/Account/SignIn","/account/SIGNin/":"/Account/SignIn","/account/SIGNIn/":"/Account/SignIn","/account/sIGNIN/":"/Account/SignIn","/account/siGNIN/":"/Account/SignIn","/account/sigNIN/":"/Account/SignIn","/account/signIN/":"/Account/SignIn","/account/signiN/":"/Account/SignIn","/account/signins/":"/Account/SignIn","/account/SIGNINS/":"/Account/SignIn","/account/Signins/":"/Account/SignIn","/account/si/":"/Account/SignIn","/account/SI/":"/Account/SignIn","/account/Si/":"/Account/SignIn","/account/sig/":"/Account/SignIn","/account/SIG/":"/Account/SignIn","/account/Sig/":"/Account/SignIn","/account/sign/":"/Account/SignIn","/account/SIGN/":"/Account/SignIn","/account/Sign/":"/Account/SignIn","/account/sign-in/":"/Account/SignIn","/account/SIGN-IN/":"/Account/SignIn","/account/Sign-in/":"/Account/SignIn","/account/sign_in/":"/Account/SignIn","/account/SIGN_IN/":"/Account/SignIn","/account/Sign_in/":"/Account/SignIn","/account/sign.in/":"/Account/SignIn","/account/SIGN.IN/":"/Account/SignIn","/account/Sign.in/":"/Account/SignIn","/account/in-sign/":"/Account/SignIn","/account/IN-SIGN/":"/Account/SignIn","/account/In-sign/":"/Account/SignIn","/ACCOUNT/SIGNIN/":"/Account/SignIn","/Account/SignIn/":"/Account/SignIn","/accountsignin/":"/Account/SignIn","/account-signin/":"/Account/SignIn","/account_signin/":"/Account/SignIn","/account/signup":"/Account/SignUp","/ACCOUNT/signup":"/Account/SignUp","/Account/signup":"/Account/SignUp","/ACcount/signup":"/Account/SignUp","/ACCount/signup":"/Account/SignUp","/ACCOunt/signup":"/Account/SignUp","/ACCOUnt/signup":"/Account/SignUp","/ACCOUNt/signup":"/Account/SignUp","/aCCOUNT/signup":"/Account/SignUp","/acCOUNT/signup":"/Account/SignUp","/accOUNT/signup":"/Account/SignUp","/accoUNT/signup":"/Account/SignUp","/accouNT/signup":"/Account/SignUp","/accounT/signup":"/Account/SignUp","/accounts/signup":"/Account/SignUp","/ACCOUNTS/signup":"/Account/SignUp","/Accounts/signup":"/Account/SignUp","/ac/signup":"/Account/SignUp","/AC/signup":"/Account/SignUp","/Ac/signup":"/Account/SignUp","/acc/signup":"/Account/SignUp","/ACC/signup":"/Account/SignUp","/Acc/signup":"/Account/SignUp","/acco/signup":"/Account/SignUp","/ACCO/signup":"/Account/SignUp","/Acco/signup":"/Account/SignUp","/account/SIGNUP":"/Account/SignUp","/account/SignUp":"/Account/SignUp","/account/Signup":"/Account/SignUp","/account/SIgnup":"/Account/SignUp","/account/SIGnup":"/Account/SignUp","/account/SIGNup":"/Account/SignUp","/account/SIGNUp":"/Account/SignUp","/account/sIGNUP":"/Account/SignUp","/account/siGNUP":"/Account/SignUp","/account/sigNUP":"/Account/SignUp","/account/signUP":"/Account/SignUp","/account/signuP":"/Account/SignUp","/account/signups":"/Account/SignUp","/account/SIGNUPS":"/Account/SignUp","/account/Signups":"/Account/SignUp","/account/sign-up":"/Account/SignUp","/account/SIGN-UP":"/Account/SignUp","/account/Sign-up":"/Account/SignUp","/account/sign_up":"/Account/SignUp","/account/SIGN_UP":"/Account/SignUp","/account/Sign_up":"/Account/SignUp","/account/sign.up":"/Account/SignUp","/account/SIGN.UP":"/Account/SignUp","/account/Sign.up":"/Account/SignUp","/account/up-sign":"/Account/SignUp","/account/UP-SIGN":"/Account/SignUp","/account/Up-sign":"/Account/SignUp","/ACCOUNT/SIGNUP":"/Account/SignUp","/accountsignup":"/Account/SignUp","/account-signup":"/Account/SignUp","/account_signup":"/Account/SignUp","/account/signup/":"/Account/SignUp","/ACCOUNT/signup/":"/Account/SignUp","/Account/signup/":"/Account/SignUp","/ACcount/signup/":"/Account/SignUp","/ACCount/signup/":"/Account/SignUp","/ACCOunt/signup/":"/Account/SignUp","/ACCOUnt/signup/":"/Account/SignUp","/ACCOUNt/signup/":"/Account/SignUp","/aCCOUNT/signup/":"/Account/SignUp","/acCOUNT/signup/":"/Account/SignUp","/accOUNT/signup/":"/Account/SignUp","/accoUNT/signup/":"/Account/SignUp","/accouNT/signup/":"/Account/SignUp","/accounT/signup/":"/Account/SignUp","/accounts/signup/":"/Account/SignUp","/ACCOUNTS/signup/":"/Account/SignUp","/Accounts/signup/":"/Account/SignUp","/ac/signup/":"/Account/SignUp","/AC/signup/":"/Account/SignUp","/Ac/signup/":"/Account/SignUp","/acc/signup/":"/Account/SignUp","/ACC/signup/":"/Account/SignUp","/Acc/signup/":"/Account/SignUp","/acco/signup/":"/Account/SignUp","/ACCO/signup/":"/Account/SignUp","/Acco/signup/":"/Account/SignUp","/account/SIGNUP/":"/Account/SignUp","/account/SignUp/":"/Account/SignUp","/account/Signup/":"/Account/SignUp","/account/SIgnup/":"/Account/SignUp","/account/SIGnup/":"/Account/SignUp","/account/SIGNup/":"/Account/SignUp","/account/SIGNUp/":"/Account/SignUp","/account/sIGNUP/":"/Account/SignUp","/account/siGNUP/":"/Account/SignUp","/account/sigNUP/":"/Account/SignUp","/account/signUP/":"/Account/SignUp","/account/signuP/":"/Account/SignUp","/account/signups/":"/Account/SignUp","/account/SIGNUPS/":"/Account/SignUp","/account/Signups/":"/Account/SignUp","/account/sign-up/":"/Account/SignUp","/account/SIGN-UP/":"/Account/SignUp","/account/Sign-up/":"/Account/SignUp","/account/sign_up/":"/Account/SignUp","/account/SIGN_UP/":"/Account/SignUp","/account/Sign_up/":"/Account/SignUp","/account/sign.up/":"/Account/SignUp","/account/SIGN.UP/":"/Account/SignUp","/account/Sign.up/":"/Account/SignUp","/account/up-sign/":"/Account/SignUp","/account/UP-SIGN/":"/Account/SignUp","/account/Up-sign/":"/Account/SignUp","/ACCOUNT/SIGNUP/":"/Account/SignUp","/Account/SignUp/":"/Account/SignUp","/accountsignup/":"/Account/SignUp","/account-signup/":"/Account/SignUp","/account_signup/":"/Account/SignUp","/blog":"/Blog","/BLOG":"/Blog","/BLog":"/Blog","/BLOg":"/Blog","/bLOG":"/Blog","/blOG":"/Blog","/bloG":"/Blog","/blogs":"/Blog","/BLOGS":"/Blog","/Blogs":"/Blog","/blog/":"/Blog","/BLOG/":"/Blog","/Blog/":"/Blog","/BLog/":"/Blog","/BLOg/":"/Blog","/bLOG/":"/Blog","/blOG/":"/Blog","/bloG/":"/Blog","/blogs/":"/Blog","/BLOGS/":"/Blog","/Blogs/":"/Blog","/contact/sale":"/Contact/Sale","/CONTACT/sale":"/Contact/Sale","/Contact/sale":"/Contact/Sale","/COntact/sale":"/Contact/Sale","/CONtact/sale":"/Contact/Sale","/CONTact/sale":"/Contact/Sale","/CONTAct/sale":"/Contact/Sale","/CONTACt/sale":"/Contact/Sale","/cONTACT/sale":"/Contact/Sale","/coNTACT/sale":"/Contact/Sale","/conTACT/sale":"/Contact/Sale","/contACT/sale":"/Contact/Sale","/contaCT/sale":"/Contact/Sale","/contacT/sale":"/Contact/Sale","/contacts/sale":"/Contact/Sale","/CONTACTS/sale":"/Contact/Sale","/Contacts/sale":"/Contact/Sale","/co/sale":"/Contact/Sale","/CO/sale":"/Contact/Sale","/Co/sale":"/Contact/Sale","/con/sale":"/Contact/Sale","/CON/sale":"/Contact/Sale","/Con/sale":"/Contact/Sale","/cont/sale":"/Contact/Sale","/CONT/sale":"/Contact/Sale","/Cont/sale":"/Contact/Sale","/contact/SALE":"/Contact/Sale","/contact/Sale":"/Contact/Sale","/contact/SAle":"/Contact/Sale","/contact/SALe":"/Contact/Sale","/contact/sALE":"/Contact/Sale","/contact/saLE":"/Contact/Sale","/contact/salE":"/Contact/Sale","/contact/sales":"/Contact/Sale","/contact/SALES":"/Contact/Sale","/contact/Sales":"/Contact/Sale","/CONTACT/SALE":"/Contact/Sale","/contactsale":"/Contact/Sale","/contact-sale":"/Contact/Sale","/contact_sale":"/Contact/Sale","/contact/sale/":"/Contact/Sale","/CONTACT/sale/":"/Contact/Sale","/Contact/sale/":"/Contact/Sale","/COntact/sale/":"/Contact/Sale","/CONtact/sale/":"/Contact/Sale","/CONTact/sale/":"/Contact/Sale","/CONTAct/sale/":"/Contact/Sale","/CONTACt/sale/":"/Contact/Sale","/cONTACT/sale/":"/Contact/Sale","/coNTACT/sale/":"/Contact/Sale","/conTACT/sale/":"/Contact/Sale","/contACT/sale/":"/Contact/Sale","/contaCT/sale/":"/Contact/Sale","/contacT/sale/":"/Contact/Sale","/contacts/sale/":"/Contact/Sale","/CONTACTS/sale/":"/Contact/Sale","/Contacts/sale/":"/Contact/Sale","/co/sale/":"/Contact/Sale","/CO/sale/":"/Contact/Sale","/Co/sale/":"/Contact/Sale","/con/sale/":"/Contact/Sale","/CON/sale/":"/Contact/Sale","/Con/sale/":"/Contact/Sale","/cont/sale/":"/Contact/Sale","/CONT/sale/":"/Contact/Sale","/Cont/sale/":"/Contact/Sale","/contact/SALE/":"/Contact/Sale","/contact/Sale/":"/Contact/Sale","/contact/SAle/":"/Contact/Sale","/contact/SALe/":"/Contact/Sale","/contact/sALE/":"/Contact/Sale","/contact/saLE/":"/Contact/Sale","/contact/salE/":"/Contact/Sale","/contact/sales/":"/Contact/Sale","/contact/SALES/":"/Contact/Sale","/contact/Sales/":"/Contact/Sale","/CONTACT/SALE/":"/Contact/Sale","/Contact/Sale/":"/Contact/Sale","/contactsale/":"/Contact/Sale","/contact-sale/":"/Contact/Sale","/contact_sale/":"/Contact/Sale","/contributing":"/Contributing","/CONTRIBUTING":"/Contributing","/COntributing":"/Contributing","/CONtributing":"/Contributing","/CONTributing":"/Contributing","/CONTRibuting":"/Contributing","/CONTRIbuting":"/Contributing","/CONTRIButing":"/Contributing","/CONTRIBUting":"/Contributing","/CONTRIBUTing":"/Contributing","/CONTRIBUTIng":"/Contributing","/CONTRIBUTINg":"/Contributing","/cONTRIBUTING":"/Contributing","/coNTRIBUTING":"/Contributing","/conTRIBUTING":"/Contributing","/contRIBUTING":"/Contributing","/contrIBUTING":"/Contributing","/contriBUTING":"/Contributing","/contribUTING":"/Contributing","/contribuTING":"/Contributing","/contributING":"/Contributing","/contributiNG":"/Contributing","/contributinG":"/Contributing","/contributings":"/Contributing","/CONTRIBUTINGS":"/Contributing","/Contributings":"/Contributing","/co":"/Contributing","/CO":"/Contributing","/Co":"/Contributing","/con":"/Contributing","/CON":"/Contributing","/Con":"/Contributing","/cont":"/Contributing","/CONT":"/Contributing","/Cont":"/Contributing","/contributing/":"/Contributing","/CONTRIBUTING/":"/Contributing","/Contributing/":"/Contributing","/COntributing/":"/Contributing","/CONtributing/":"/Contributing","/CONTributing/":"/Contributing","/CONTRibuting/":"/Contributing","/CONTRIbuting/":"/Contributing","/CONTRIButing/":"/Contributing","/CONTRIBUting/":"/Contributing","/CONTRIBUTing/":"/Contributing","/CONTRIBUTIng/":"/Contributing","/CONTRIBUTINg/":"/Contributing","/cONTRIBUTING/":"/Contributing","/coNTRIBUTING/":"/Contributing","/conTRIBUTING/":"/Contributing","/contRIBUTING/":"/Contributing","/contrIBUTING/":"/Contributing","/contriBUTING/":"/Contributing","/contribUTING/":"/Contributing","/contribuTING/":"/Contributing","/contributING/":"/Contributing","/contributiNG/":"/Contributing","/contributinG/":"/Contributing","/contributings/":"/Contributing","/CONTRIBUTINGS/":"/Contributing","/Contributings/":"/Contributing","/co/":"/Contributing","/CO/":"/Contributing","/Co/":"/Contributing","/con/":"/Contributing","/CON/":"/Contributing","/Con/":"/Contributing","/cont/":"/Contributing","/CONT/":"/Contributing","/Cont/":"/Contributing","/dashboard":"/Dashboard","/DASHBOARD":"/Dashboard","/DAshboard":"/Dashboard","/DAShboard":"/Dashboard","/DASHboard":"/Dashboard","/DASHBoard":"/Dashboard","/DASHBOard":"/Dashboard","/DASHBOArd":"/Dashboard","/DASHBOARd":"/Dashboard","/dASHBOARD":"/Dashboard","/daSHBOARD":"/Dashboard","/dasHBOARD":"/Dashboard","/dashBOARD":"/Dashboard","/dashbOARD":"/Dashboard","/dashboARD":"/Dashboard","/dashboaRD":"/Dashboard","/dashboarD":"/Dashboard","/dashboards":"/Dashboard","/DASHBOARDS":"/Dashboard","/Dashboards":"/Dashboard","/da":"/Dashboard","/DA":"/Dashboard","/Da":"/Dashboard","/das":"/Dashboard","/DAS":"/Dashboard","/Das":"/Dashboard","/dash":"/Dashboard","/DASH":"/Dashboard","/Dash":"/Dashboard","/dashboard/":"/Dashboard","/DASHBOARD/":"/Dashboard","/Dashboard/":"/Dashboard","/DAshboard/":"/Dashboard","/DAShboard/":"/Dashboard","/DASHboard/":"/Dashboard","/DASHBoard/":"/Dashboard","/DASHBOard/":"/Dashboard","/DASHBOArd/":"/Dashboard","/DASHBOARd/":"/Dashboard","/dASHBOARD/":"/Dashboard","/daSHBOARD/":"/Dashboard","/dasHBOARD/":"/Dashboard","/dashBOARD/":"/Dashboard","/dashbOARD/":"/Dashboard","/dashboARD/":"/Dashboard","/dashboaRD/":"/Dashboard","/dashboarD/":"/Dashboard","/dashboards/":"/Dashboard","/DASHBOARDS/":"/Dashboard","/Dashboards/":"/Dashboard","/da/":"/Dashboard","/DA/":"/Dashboard","/Da/":"/Dashboard","/das/":"/Dashboard","/DAS/":"/Dashboard","/Das/":"/Dashboard","/dash/":"/Dashboard","/DASH/":"/Dashboard","/Dash/":"/Dashboard","/doc":"/Doc","/DOC":"/Doc","/DOc":"/Doc","/dOC":"/Doc","/doC":"/Doc","/docs":"/Doc","/DOCS":"/Doc","/Docs":"/Doc","/doc/":"/Doc","/DOC/":"/Doc","/Doc/":"/Doc","/DOc/":"/Doc","/dOC/":"/Doc","/doC/":"/Doc","/docs/":"/Doc","/DOCS/":"/Doc","/Docs/":"/Doc","/download":"/Download","/DOWNLOAD":"/Download","/DOwnload":"/Download","/DOWnload":"/Download","/DOWNload":"/Download","/DOWNLoad":"/Download","/DOWNLOad":"/Download","/DOWNLOAd":"/Download","/dOWNLOAD":"/Download","/doWNLOAD":"/Download","/dowNLOAD":"/Download","/downLOAD":"/Download","/downlOAD":"/Download","/downloAD":"/Download","/downloaD":"/Download","/downloads":"/Download","/DOWNLOADS":"/Download","/Downloads":"/Download","/do":"/Download","/DO":"/Download","/Do":"/Download","/dow":"/Download","/DOW":"/Download","/Dow":"/Download","/down":"/Download","/DOWN":"/Download","/Down":"/Download","/download/":"/Download","/DOWNLOAD/":"/Download","/Download/":"/Download","/DOwnload/":"/Download","/DOWnload/":"/Download","/DOWNload/":"/Download","/DOWNLoad/":"/Download","/DOWNLOad/":"/Download","/DOWNLOAd/":"/Download","/dOWNLOAD/":"/Download","/doWNLOAD/":"/Download","/dowNLOAD/":"/Download","/downLOAD/":"/Download","/downlOAD/":"/Download","/downloAD/":"/Download","/downloaD/":"/Download","/downloads/":"/Download","/DOWNLOADS/":"/Download","/Downloads/":"/Download","/do/":"/Download","/DO/":"/Download","/Do/":"/Download","/dow/":"/Download","/DOW/":"/Download","/Dow/":"/Download","/down/":"/Download","/DOWN/":"/Download","/Down/":"/Download","/legal/privacy":"/Legal/Privacy","/LEGAL/privacy":"/Legal/Privacy","/Legal/privacy":"/Legal/Privacy","/LEgal/privacy":"/Legal/Privacy","/LEGal/privacy":"/Legal/Privacy","/LEGAl/privacy":"/Legal/Privacy","/lEGAL/privacy":"/Legal/Privacy","/leGAL/privacy":"/Legal/Privacy","/legAL/privacy":"/Legal/Privacy","/legaL/privacy":"/Legal/Privacy","/legals/privacy":"/Legal/Privacy","/LEGALS/privacy":"/Legal/Privacy","/Legals/privacy":"/Legal/Privacy","/le/privacy":"/Legal/Privacy","/LE/privacy":"/Legal/Privacy","/Le/privacy":"/Legal/Privacy","/leg/privacy":"/Legal/Privacy","/LEG/privacy":"/Legal/Privacy","/Leg/privacy":"/Legal/Privacy","/lega/privacy":"/Legal/Privacy","/LEGA/privacy":"/Legal/Privacy","/Lega/privacy":"/Legal/Privacy","/legal/PRIVACY":"/Legal/Privacy","/legal/Privacy":"/Legal/Privacy","/legal/PRivacy":"/Legal/Privacy","/legal/PRIvacy":"/Legal/Privacy","/legal/PRIVacy":"/Legal/Privacy","/legal/PRIVAcy":"/Legal/Privacy","/legal/PRIVACy":"/Legal/Privacy","/legal/pRIVACY":"/Legal/Privacy","/legal/prIVACY":"/Legal/Privacy","/legal/priVACY":"/Legal/Privacy","/legal/privACY":"/Legal/Privacy","/legal/privaCY":"/Legal/Privacy","/legal/privacY":"/Legal/Privacy","/legal/privacys":"/Legal/Privacy","/legal/PRIVACYS":"/Legal/Privacy","/legal/Privacys":"/Legal/Privacy","/legal/pr":"/Legal/Privacy","/legal/PR":"/Legal/Privacy","/legal/Pr":"/Legal/Privacy","/legal/pri":"/Legal/Privacy","/legal/PRI":"/Legal/Privacy","/legal/Pri":"/Legal/Privacy","/legal/priv":"/Legal/Privacy","/legal/PRIV":"/Legal/Privacy","/legal/Priv":"/Legal/Privacy","/LEGAL/PRIVACY":"/Legal/Privacy","/legalprivacy":"/Legal/Privacy","/legal-privacy":"/Legal/Privacy","/legal_privacy":"/Legal/Privacy","/legal/privacy/":"/Legal/Privacy","/LEGAL/privacy/":"/Legal/Privacy","/Legal/privacy/":"/Legal/Privacy","/LEgal/privacy/":"/Legal/Privacy","/LEGal/privacy/":"/Legal/Privacy","/LEGAl/privacy/":"/Legal/Privacy","/lEGAL/privacy/":"/Legal/Privacy","/leGAL/privacy/":"/Legal/Privacy","/legAL/privacy/":"/Legal/Privacy","/legaL/privacy/":"/Legal/Privacy","/legals/privacy/":"/Legal/Privacy","/LEGALS/privacy/":"/Legal/Privacy","/Legals/privacy/":"/Legal/Privacy","/le/privacy/":"/Legal/Privacy","/LE/privacy/":"/Legal/Privacy","/Le/privacy/":"/Legal/Privacy","/leg/privacy/":"/Legal/Privacy","/LEG/privacy/":"/Legal/Privacy","/Leg/privacy/":"/Legal/Privacy","/lega/privacy/":"/Legal/Privacy","/LEGA/privacy/":"/Legal/Privacy","/Lega/privacy/":"/Legal/Privacy","/legal/PRIVACY/":"/Legal/Privacy","/legal/Privacy/":"/Legal/Privacy","/legal/PRivacy/":"/Legal/Privacy","/legal/PRIvacy/":"/Legal/Privacy","/legal/PRIVacy/":"/Legal/Privacy","/legal/PRIVAcy/":"/Legal/Privacy","/legal/PRIVACy/":"/Legal/Privacy","/legal/pRIVACY/":"/Legal/Privacy","/legal/prIVACY/":"/Legal/Privacy","/legal/priVACY/":"/Legal/Privacy","/legal/privACY/":"/Legal/Privacy","/legal/privaCY/":"/Legal/Privacy","/legal/privacY/":"/Legal/Privacy","/legal/privacys/":"/Legal/Privacy","/legal/PRIVACYS/":"/Legal/Privacy","/legal/Privacys/":"/Legal/Privacy","/legal/pr/":"/Legal/Privacy","/legal/PR/":"/Legal/Privacy","/legal/Pr/":"/Legal/Privacy","/legal/pri/":"/Legal/Privacy","/legal/PRI/":"/Legal/Privacy","/legal/Pri/":"/Legal/Privacy","/legal/priv/":"/Legal/Privacy","/legal/PRIV/":"/Legal/Privacy","/legal/Priv/":"/Legal/Privacy","/LEGAL/PRIVACY/":"/Legal/Privacy","/Legal/Privacy/":"/Legal/Privacy","/legalprivacy/":"/Legal/Privacy","/legal-privacy/":"/Legal/Privacy","/legal_privacy/":"/Legal/Privacy","/legal/term":"/Legal/Term","/LEGAL/term":"/Legal/Term","/Legal/term":"/Legal/Term","/LEgal/term":"/Legal/Term","/LEGal/term":"/Legal/Term","/LEGAl/term":"/Legal/Term","/lEGAL/term":"/Legal/Term","/leGAL/term":"/Legal/Term","/legAL/term":"/Legal/Term","/legaL/term":"/Legal/Term","/legals/term":"/Legal/Term","/LEGALS/term":"/Legal/Term","/Legals/term":"/Legal/Term","/le/term":"/Legal/Term","/LE/term":"/Legal/Term","/Le/term":"/Legal/Term","/leg/term":"/Legal/Term","/LEG/term":"/Legal/Term","/Leg/term":"/Legal/Term","/lega/term":"/Legal/Term","/LEGA/term":"/Legal/Term","/Lega/term":"/Legal/Term","/legal/TERM":"/Legal/Term","/legal/Term":"/Legal/Term","/legal/TErm":"/Legal/Term","/legal/TERm":"/Legal/Term","/legal/tERM":"/Legal/Term","/legal/teRM":"/Legal/Term","/legal/terM":"/Legal/Term","/legal/terms":"/Legal/Term","/legal/TERMS":"/Legal/Term","/legal/Terms":"/Legal/Term","/LEGAL/TERM":"/Legal/Term","/legalterm":"/Legal/Term","/legal-term":"/Legal/Term","/legal_term":"/Legal/Term","/legal/term/":"/Legal/Term","/LEGAL/term/":"/Legal/Term","/Legal/term/":"/Legal/Term","/LEgal/term/":"/Legal/Term","/LEGal/term/":"/Legal/Term","/LEGAl/term/":"/Legal/Term","/lEGAL/term/":"/Legal/Term","/leGAL/term/":"/Legal/Term","/legAL/term/":"/Legal/Term","/legaL/term/":"/Legal/Term","/legals/term/":"/Legal/Term","/LEGALS/term/":"/Legal/Term","/Legals/term/":"/Legal/Term","/le/term/":"/Legal/Term","/LE/term/":"/Legal/Term","/Le/term/":"/Legal/Term","/leg/term/":"/Legal/Term","/LEG/term/":"/Legal/Term","/Leg/term/":"/Legal/Term","/lega/term/":"/Legal/Term","/LEGA/term/":"/Legal/Term","/Lega/term/":"/Legal/Term","/legal/TERM/":"/Legal/Term","/legal/Term/":"/Legal/Term","/legal/TErm/":"/Legal/Term","/legal/TERm/":"/Legal/Term","/legal/tERM/":"/Legal/Term","/legal/teRM/":"/Legal/Term","/legal/terM/":"/Legal/Term","/legal/terms/":"/Legal/Term","/legal/TERMS/":"/Legal/Term","/legal/Terms/":"/Legal/Term","/LEGAL/TERM/":"/Legal/Term","/Legal/Term/":"/Legal/Term","/legalterm/":"/Legal/Term","/legal-term/":"/Legal/Term","/legal_term/":"/Legal/Term","/license":"/License","/LICENSE":"/License","/LIcense":"/License","/LICense":"/License","/LICEnse":"/License","/LICENse":"/License","/LICENSe":"/License","/lICENSE":"/License","/liCENSE":"/License","/licENSE":"/License","/liceNSE":"/License","/licenSE":"/License","/licensE":"/License","/licenses":"/License","/LICENSES":"/License","/Licenses":"/License","/li":"/License","/LI":"/License","/Li":"/License","/lic":"/License","/LIC":"/License","/Lic":"/License","/lice":"/License","/LICE":"/License","/Lice":"/License","/license/":"/License","/LICENSE/":"/License","/License/":"/License","/LIcense/":"/License","/LICense/":"/License","/LICEnse/":"/License","/LICENse/":"/License","/LICENSe/":"/License","/lICENSE/":"/License","/liCENSE/":"/License","/licENSE/":"/License","/liceNSE/":"/License","/licenSE/":"/License","/licensE/":"/License","/licenses/":"/License","/LICENSES/":"/License","/Licenses/":"/License","/li/":"/License","/LI/":"/License","/Li/":"/License","/lic/":"/License","/LIC/":"/License","/Lic/":"/License","/lice/":"/License","/LICE/":"/License","/Lice/":"/License","/oauth/success":"/OAuth/Success","/OAUTH/success":"/OAuth/Success","/OAuth/success":"/OAuth/Success","/Oauth/success":"/OAuth/Success","/OAUth/success":"/OAuth/Success","/OAUTh/success":"/OAuth/Success","/oAUTH/success":"/OAuth/Success","/oaUTH/success":"/OAuth/Success","/oauTH/success":"/OAuth/Success","/oautH/success":"/OAuth/Success","/oauths/success":"/OAuth/Success","/OAUTHS/success":"/OAuth/Success","/Oauths/success":"/OAuth/Success","/oa/success":"/OAuth/Success","/OA/success":"/OAuth/Success","/Oa/success":"/OAuth/Success","/oau/success":"/OAuth/Success","/OAU/success":"/OAuth/Success","/Oau/success":"/OAuth/Success","/oaut/success":"/OAuth/Success","/OAUT/success":"/OAuth/Success","/Oaut/success":"/OAuth/Success","/o-auth/success":"/OAuth/Success","/O-AUTH/success":"/OAuth/Success","/O-auth/success":"/OAuth/Success","/o_auth/success":"/OAuth/Success","/O_AUTH/success":"/OAuth/Success","/O_auth/success":"/OAuth/Success","/o.auth/success":"/OAuth/Success","/O.AUTH/success":"/OAuth/Success","/O.auth/success":"/OAuth/Success","/auth-o/success":"/OAuth/Success","/AUTH-O/success":"/OAuth/Success","/Auth-o/success":"/OAuth/Success","/oauth/SUCCESS":"/OAuth/Success","/oauth/Success":"/OAuth/Success","/oauth/SUccess":"/OAuth/Success","/oauth/SUCcess":"/OAuth/Success","/oauth/SUCCess":"/OAuth/Success","/oauth/SUCCEss":"/OAuth/Success","/oauth/SUCCESs":"/OAuth/Success","/oauth/sUCCESS":"/OAuth/Success","/oauth/suCCESS":"/OAuth/Success","/oauth/sucCESS":"/OAuth/Success","/oauth/succESS":"/OAuth/Success","/oauth/succeSS":"/OAuth/Success","/oauth/succesS":"/OAuth/Success","/oauth/su":"/OAuth/Success","/oauth/SU":"/OAuth/Success","/oauth/Su":"/OAuth/Success","/oauth/suc":"/OAuth/Success","/oauth/SUC":"/OAuth/Success","/oauth/Suc":"/OAuth/Success","/oauth/succ":"/OAuth/Success","/oauth/SUCC":"/OAuth/Success","/oauth/Succ":"/OAuth/Success","/OAUTH/SUCCESS":"/OAuth/Success","/oauthsuccess":"/OAuth/Success","/oauth-success":"/OAuth/Success","/oauth_success":"/OAuth/Success","/oauth/success/":"/OAuth/Success","/OAUTH/success/":"/OAuth/Success","/OAuth/success/":"/OAuth/Success","/Oauth/success/":"/OAuth/Success","/OAUth/success/":"/OAuth/Success","/OAUTh/success/":"/OAuth/Success","/oAUTH/success/":"/OAuth/Success","/oaUTH/success/":"/OAuth/Success","/oauTH/success/":"/OAuth/Success","/oautH/success/":"/OAuth/Success","/oauths/success/":"/OAuth/Success","/OAUTHS/success/":"/OAuth/Success","/Oauths/success/":"/OAuth/Success","/oa/success/":"/OAuth/Success","/OA/success/":"/OAuth/Success","/Oa/success/":"/OAuth/Success","/oau/success/":"/OAuth/Success","/OAU/success/":"/OAuth/Success","/Oau/success/":"/OAuth/Success","/oaut/success/":"/OAuth/Success","/OAUT/success/":"/OAuth/Success","/Oaut/success/":"/OAuth/Success","/o-auth/success/":"/OAuth/Success","/O-AUTH/success/":"/OAuth/Success","/O-auth/success/":"/OAuth/Success","/o_auth/success/":"/OAuth/Success","/O_AUTH/success/":"/OAuth/Success","/O_auth/success/":"/OAuth/Success","/o.auth/success/":"/OAuth/Success","/O.AUTH/success/":"/OAuth/Success","/O.auth/success/":"/OAuth/Success","/auth-o/success/":"/OAuth/Success","/AUTH-O/success/":"/OAuth/Success","/Auth-o/success/":"/OAuth/Success","/oauth/SUCCESS/":"/OAuth/Success","/oauth/Success/":"/OAuth/Success","/oauth/SUccess/":"/OAuth/Success","/oauth/SUCcess/":"/OAuth/Success","/oauth/SUCCess/":"/OAuth/Success","/oauth/SUCCEss/":"/OAuth/Success","/oauth/SUCCESs/":"/OAuth/Success","/oauth/sUCCESS/":"/OAuth/Success","/oauth/suCCESS/":"/OAuth/Success","/oauth/sucCESS/":"/OAuth/Success","/oauth/succESS/":"/OAuth/Success","/oauth/succeSS/":"/OAuth/Success","/oauth/succesS/":"/OAuth/Success","/oauth/su/":"/OAuth/Success","/oauth/SU/":"/OAuth/Success","/oauth/Su/":"/OAuth/Success","/oauth/suc/":"/OAuth/Success","/oauth/SUC/":"/OAuth/Success","/oauth/Suc/":"/OAuth/Success","/oauth/succ/":"/OAuth/Success","/oauth/SUCC/":"/OAuth/Success","/oauth/Succ/":"/OAuth/Success","/OAUTH/SUCCESS/":"/OAuth/Success","/OAuth/Success/":"/OAuth/Success","/oauthsuccess/":"/OAuth/Success","/oauth-success/":"/OAuth/Success","/oauth_success/":"/OAuth/Success","/portal":"/Portal","/PORTAL":"/Portal","/POrtal":"/Portal","/PORtal":"/Portal","/PORTal":"/Portal","/PORTAl":"/Portal","/pORTAL":"/Portal","/poRTAL":"/Portal","/porTAL":"/Portal","/portAL":"/Portal","/portaL":"/Portal","/portals":"/Portal","/PORTALS":"/Portal","/Portals":"/Portal","/po":"/Portal","/PO":"/Portal","/Po":"/Portal","/por":"/Portal","/POR":"/Portal","/Por":"/Portal","/port":"/Portal","/PORT":"/Portal","/Port":"/Portal","/portal/":"/Portal","/PORTAL/":"/Portal","/Portal/":"/Portal","/POrtal/":"/Portal","/PORtal/":"/Portal","/PORTal/":"/Portal","/PORTAl/":"/Portal","/pORTAL/":"/Portal","/poRTAL/":"/Portal","/porTAL/":"/Portal","/portAL/":"/Portal","/portaL/":"/Portal","/portals/":"/Portal","/PORTALS/":"/Portal","/Portals/":"/Portal","/po/":"/Portal","/PO/":"/Portal","/Po/":"/Portal","/por/":"/Portal","/POR/":"/Portal","/Por/":"/Portal","/port/":"/Portal","/PORT/":"/Portal","/Port/":"/Portal","/verify":"/Verify","/VERIFY":"/Verify","/VErify":"/Verify","/VERify":"/Verify","/VERIfy":"/Verify","/VERIFy":"/Verify","/vERIFY":"/Verify","/veRIFY":"/Verify","/verIFY":"/Verify","/veriFY":"/Verify","/verifY":"/Verify","/verifys":"/Verify","/VERIFYS":"/Verify","/Verifys":"/Verify","/ve":"/Verify","/VE":"/Verify","/Ve":"/Verify","/ver":"/Verify","/VER":"/Verify","/Ver":"/Verify","/veri":"/Verify","/VERI":"/Verify","/Veri":"/Verify","/verify/":"/Verify","/VERIFY/":"/Verify","/Verify/":"/Verify","/VErify/":"/Verify","/VERify/":"/Verify","/VERIfy/":"/Verify","/VERIFy/":"/Verify","/vERIFY/":"/Verify","/veRIFY/":"/Verify","/verIFY/":"/Verify","/veriFY/":"/Verify","/verifY/":"/Verify","/verifys/":"/Verify","/VERIFYS/":"/Verify","/Verifys/":"/Verify","/ve/":"/Verify","/VE/":"/Verify","/Ve/":"/Verify","/ver/":"/Verify","/VER/":"/Verify","/Ver/":"/Verify","/veri/":"/Verify","/VERI/":"/Verify","/Veri/":"/Verify","/get":"/Download","/GET":"/Download","/Get":"/Download","/get/":"/Download","/fetch":"/Download","/FETCH":"/Download","/Fetch":"/Download","/fetch/":"/Download","/install":"/Download","/INSTALL":"/Download","/Install":"/Download","/install/":"/Download","/setup":"/Download","/SETUP":"/Download","/Setup":"/Download","/setup/":"/Download","/documentation":"/Doc","/DOCUMENTATION":"/Doc","/Documentation":"/Doc","/documentation/":"/Doc","/reference":"/Doc","/REFERENCE":"/Doc","/Reference":"/Doc","/reference/":"/Doc","/help":"/Doc","/HELP":"/Doc","/Help":"/Doc","/help/":"/Doc","/guide":"/Doc","/GUIDE":"/Doc","/Guide":"/Doc","/guide/":"/Doc","/manual":"/Doc","/MANUAL":"/Doc","/Manual":"/Doc","/manual/":"/Doc","/api":"/Doc","/API":"/Doc","/Api":"/Doc","/api/":"/Doc","/login":"/Account/SignIn","/LOGIN":"/Account/SignIn","/Login":"/Account/SignIn","/login/":"/Account/SignIn","/log-in":"/Account/SignIn","/LOG-IN":"/Account/SignIn","/Log-in":"/Account/SignIn","/log-in/":"/Account/SignIn","/sign-in":"/Account/SignIn","/SIGN-IN":"/Account/SignIn","/Sign-in":"/Account/SignIn","/sign-in/":"/Account/SignIn","/authenticate":"/Account/SignIn","/AUTHENTICATE":"/Account/SignIn","/Authenticate":"/Account/SignIn","/authenticate/":"/Account/SignIn","/auth":"/Account/SignIn","/AUTH":"/Account/SignIn","/Auth":"/Account/SignIn","/auth/":"/Account/SignIn","/register":"/Account/SignUp","/REGISTER":"/Account/SignUp","/Register":"/Account/SignUp","/register/":"/Account/SignUp","/sign-up":"/Account/SignUp","/SIGN-UP":"/Account/SignUp","/Sign-up":"/Account/SignUp","/sign-up/":"/Account/SignUp","/join":"/Account/SignUp","/JOIN":"/Account/SignUp","/Join":"/Account/SignUp","/join/":"/Account/SignUp","/create-account":"/Account/SignUp","/CREATE-ACCOUNT":"/Account/SignUp","/Create-account":"/Account/SignUp","/create-account/":"/Account/SignUp","/forgot-password":"/Account/ForgotPassword","/FORGOT-PASSWORD":"/Account/ForgotPassword","/Forgot-password":"/Account/ForgotPassword","/forgot-password/":"/Account/ForgotPassword","/forgot":"/Account/ForgotPassword","/FORGOT":"/Account/ForgotPassword","/Forgot":"/Account/ForgotPassword","/forgot/":"/Account/ForgotPassword","/password-reset":"/Account/ForgotPassword","/PASSWORD-RESET":"/Account/ForgotPassword","/Password-reset":"/Account/ForgotPassword","/password-reset/":"/Account/ForgotPassword","/recover":"/Account/ForgotPassword","/RECOVER":"/Account/ForgotPassword","/Recover":"/Account/ForgotPassword","/recover/":"/Account/ForgotPassword","/recover-password":"/Account/ForgotPassword","/RECOVER-PASSWORD":"/Account/ForgotPassword","/Recover-password":"/Account/ForgotPassword","/recover-password/":"/Account/ForgotPassword","/reset-password":"/Account/ResetPassword","/RESET-PASSWORD":"/Account/ResetPassword","/Reset-password":"/Account/ResetPassword","/reset-password/":"/Account/ResetPassword","/reset":"/Account/ResetPassword","/RESET":"/Account/ResetPassword","/Reset":"/Account/ResetPassword","/reset/":"/Account/ResetPassword","/new-password":"/Account/ResetPassword","/NEW-PASSWORD":"/Account/ResetPassword","/New-password":"/Account/ResetPassword","/new-password/":"/Account/ResetPassword","/change-password":"/Account/ResetPassword","/CHANGE-PASSWORD":"/Account/ResetPassword","/Change-password":"/Account/ResetPassword","/change-password/":"/Account/ResetPassword","/tos":"/Legal/Term","/TOS":"/Legal/Term","/Tos":"/Legal/Term","/tos/":"/Legal/Term","/terms-of-service":"/Legal/Term","/TERMS-OF-SERVICE":"/Legal/Term","/Terms-of-service":"/Legal/Term","/terms-of-service/":"/Legal/Term","/eula":"/Legal/Term","/EULA":"/Legal/Term","/Eula":"/Legal/Term","/eula/":"/Legal/Term","/conditions":"/Legal/Term","/CONDITIONS":"/Legal/Term","/Conditions":"/Legal/Term","/conditions/":"/Legal/Term","/privacy-policy":"/Legal/Privacy","/PRIVACY-POLICY":"/Legal/Privacy","/Privacy-policy":"/Legal/Privacy","/privacy-policy/":"/Legal/Privacy","/gdpr":"/Legal/Privacy","/GDPR":"/Legal/Privacy","/Gdpr":"/Legal/Privacy","/gdpr/":"/Legal/Privacy","/data-policy":"/Legal/Privacy","/DATA-POLICY":"/Legal/Privacy","/Data-policy":"/Legal/Privacy","/data-policy/":"/Legal/Privacy","/sale":"/Contact/Sale","/SALE":"/Contact/Sale","/Sale":"/Contact/Sale","/sale/":"/Contact/Sale","/sales-contact":"/Contact/Sale","/SALES-CONTACT":"/Contact/Sale","/Sales-contact":"/Contact/Sale","/sales-contact/":"/Contact/Sale","/contact-sales":"/Contact/Sale","/CONTACT-SALES":"/Contact/Sale","/Contact-sales":"/Contact/Sale","/contact-sales/":"/Contact/Sale","/pricing":"/Contact/Sale","/PRICING":"/Contact/Sale","/Pricing":"/Contact/Sale","/pricing/":"/Contact/Sale","/enterprise":"/Contact/Sale","/ENTERPRISE":"/Contact/Sale","/Enterprise":"/Contact/Sale","/enterprise/":"/Contact/Sale","/buy":"/Contact/Sale","/BUY":"/Contact/Sale","/Buy":"/Contact/Sale","/buy/":"/Contact/Sale","/contribute":"/Contributing","/CONTRIBUTE":"/Contributing","/Contribute":"/Contributing","/contribute/":"/Contributing","/contributors":"/Contributing","/CONTRIBUTORS":"/Contributing","/Contributors":"/Contributing","/contributors/":"/Contributing","/dev":"/Contributing","/DEV":"/Contributing","/Dev":"/Contributing","/dev/":"/Contributing","/develop":"/Contributing","/DEVELOP":"/Contributing","/Develop":"/Contributing","/develop/":"/Contributing","/opensource":"/Contributing","/OPENSOURCE":"/Contributing","/Opensource":"/Contributing","/opensource/":"/Contributing","/open-source":"/Contributing","/OPEN-SOURCE":"/Contributing","/Open-source":"/Contributing","/open-source/":"/Contributing","/home":"/","/HOME":"/","/Home":"/","/home/":"/","/main":"/","/MAIN":"/","/Main":"/","/main/":"/","/index":"/","/INDEX":"/","/Index":"/","/index/":"/","/start":"/","/START":"/","/Start":"/","/start/":"/","/welcome":"/","/WELCOME":"/","/Welcome":"/","/welcome/":"/","/verify-email":"/Verify","/VERIFY-EMAIL":"/Verify","/Verify-email":"/Verify","/verify-email/":"/Verify","/email-verification":"/Verify","/EMAIL-VERIFICATION":"/Verify","/Email-verification":"/Verify","/email-verification/":"/Verify","/confirm":"/Verify","/CONFIRM":"/Verify","/Confirm":"/Verify","/confirm/":"/Verify","/confirm-email":"/Verify","/CONFIRM-EMAIL":"/Verify","/Confirm-email":"/Verify","/confirm-email/":"/Verify","/activate":"/Verify","/ACTIVATE":"/Verify","/Activate":"/Verify","/activate/":"/Verify","/app":"/Portal","/APP":"/Portal","/App":"/Portal","/app/":"/Portal","/launch":"/Portal","/LAUNCH":"/Portal","/Launch":"/Portal","/launch/":"/Portal","/open":"/Portal","/OPEN":"/Portal","/Open":"/Portal","/open/":"/Portal","/panel":"/Dashboard","/PANEL":"/Dashboard","/Panel":"/Dashboard","/panel/":"/Dashboard","/admin":"/Dashboard","/ADMIN":"/Dashboard","/Admin":"/Dashboard","/admin/":"/Dashboard","/overview":"/Dashboard","/OVERVIEW":"/Dashboard","/Overview":"/Dashboard","/overview/":"/Dashboard","/mit":"/License","/MIT":"/License","/Mit":"/License","/mit/":"/License","/licensing":"/License","/LICENSING":"/License","/Licensing":"/License","/licensing/":"/License","/news":"/Blog","/NEWS":"/Blog","/News":"/Blog","/news/":"/Blog","/articles":"/Blog","/ARTICLES":"/Blog","/Articles":"/Blog","/articles/":"/Blog","/posts":"/Blog","/POSTS":"/Blog","/Posts":"/Blog","/posts/":"/Blog","/updates":"/Blog","/UPDATES":"/Blog","/Updates":"/Blog","/updates/":"/Blog","/changelog":"/Blog","/CHANGELOG":"/Blog","/Changelog":"/Blog","/changelog/":"/Blog","/callback":"/OAuth/Success","/CALLBACK":"/OAuth/Success","/Callback":"/OAuth/Success","/callback/":"/OAuth/Success","/oauth-callback":"/OAuth/Success","/OAUTH-CALLBACK":"/OAuth/Success","/Oauth-callback":"/OAuth/Success","/oauth-callback/":"/OAuth/Success","/auth-callback":"/OAuth/Success","/AUTH-CALLBACK":"/OAuth/Success","/Auth-callback":"/OAuth/Success","/auth-callback/":"/OAuth/Success"};



const StripTrailingSlash = (Path) =>
	Path === "/" ? "/" : Path.replace(/\/+$/, "");

const NormalizePath = (Path) =>
	StripTrailingSlash(
		"/" +
			Path.replace(/^\/+/, "")
				.split("/")
				.map((Segment) =>
					decodeURIComponent(Segment).toLowerCase(),
				)
				.join("/"),
	);




const ResolveRoute = (RequestPath) => {
	const Cleaned = StripTrailingSlash(RequestPath);

	if (CanonicalSet.has(Cleaned)) {
		return null;
	}

	const Normalized = NormalizePath(Cleaned);

	if (CanonicalSet.has(Normalized)) {
		return Normalized;
	}

	if (VariantMap[Normalized]) {
		return VariantMap[Normalized];
	}

	if (VariantMap[Cleaned]) {
		return VariantMap[Cleaned];
	}

	const Stripped =
		"/" +
		Normalized.replace(/^\/+/, "")
			.split("/")
			.map((Segment) => Segment.replace(/[-_]/g, ""))
			.join("/");

	if (VariantMap[Stripped]) {
		return VariantMap[Stripped];
	}

	return null;
};



self.addEventListener("install", (Event: ExtendableEvent) => {
	false && Log(`Installing version ${INCREMENT}...`);

	Event.waitUntil(
		caches
			.open(CACHE_ROUTE)
			.then((Cache) => {
				false && Log("Route cache opened.");

				return Cache;
			})
			.catch(
				(_Error: unknown) =>
					false && ErrorLog("Cache open failed:", _Error),
			)
			.then(() => {
				false && Log("Install complete. Activating immediately.");

				return self.skipWaiting();
			}),
	);
});



self.addEventListener("activate", (Event: ExtendableEvent) => {
	false && Log(`Activating version ${INCREMENT}...`);

	Event.waitUntil(
		Promise.all([
			caches
				.keys()
				.then((CacheKey) =>
					Promise.all(
						CacheKey.map((Key) => {
							if (!CACHE.includes(Key)) {
								false && Log(`Deleting old cache: ${Key}`);

								return caches.delete(Key);
							}

							return Promise.resolve();
						}),
					),
				)
				.catch((_Error: unknown) => {
					false && ErrorLog("Cache cleanup failed:", _Error);

					return Promise.resolve();
				}),

			self.clients
				.claim()
				.then(() => {
					false && Log("Clients claimed successfully.");
				})
				.catch((_Error: unknown) => {
					false && ErrorLog("self.clients.claim() failed:", _Error);

					return Promise.resolve();
				}),
		])
			.then(async () => {
				false &&
					Log(
						`Version ${INCREMENT} activated and controlling clients.`,
					);

				const IsNewVersion = CurrentClientVersion !== INCREMENT;

				if (IsNewVersion) {
					false &&
						Log(
							`New version detected (${CurrentClientVersion} -> ${INCREMENT}). Notifying clients.`,
						);

					CurrentClientVersion = INCREMENT;

					return (
						await self.clients.matchAll({ type: "window" })
					).forEach((Client: WindowClient) => {
						false &&
							Log(
								`Sending New Version message to client ${Client.id}`,
							);

						Client.postMessage({ Version: "New" });
					});
				} else {
					false &&
						Log(
							`Same version (${INCREMENT}), skipping notification.`,
						);
				}
			})
			.catch(
				(_Error: unknown) =>
					false && ErrorLog("Activation failed overall:", _Error),
			),
	);
});








self.addEventListener("fetch", (Event: FetchEvent) => {
	const Request = Event.request;

	const _URL = new URL(Request.url);

	const Path = _URL.pathname;

	false &&
		Log(`Fetch: ${Path}`, {
			Method: Request.method,
			Destination: Request.destination,
			Mode: Request.mode,
		});

	if (
		_URL.origin === self.origin &&
		Path === new URL(self.location.href).pathname
	) {
		false && Log("Ignoring fetch for SW script itself:", Path);

		return;
	}

	if (Request.method !== "GET") {
		false && Log(`Ignoring non-GET: ${Request.method} ${Path}`);

		return;
	}

	// ── Concern 1: Route Redirect ──
	// Intercept ALL navigation requests and redirect variants to PascalCase

	if (Request.mode === "navigate") {
		const ResolvedPath = ResolveRoute(Path);

		if (ResolvedPath !== null) {
			false && Log(`Redirecting ${Path} → ${ResolvedPath}`);

			const RedirectURL = new URL(ResolvedPath, _URL.origin);

			RedirectURL.search = _URL.search;

			Event.respondWith(Response.redirect(RedirectURL.href, 301));

			return;
		}

		// ── Concern 2: Page Cache (Network-First) ──
		false && Log(`Navigation (network-first): ${Path}`);

		Event.respondWith(
			(async () => {
				try {
					const _Response = await fetch(Request);

					if (_Response && _Response.ok) {
						false && Log(`Navigation fetched: ${Path}`);

						(await caches.open(CACHE_ROUTE)).put(
							Request,
							_Response.clone(),
						);

						return _Response;
					}

					false &&
						WarnLog(
							`Navigation failed (${_Response.status}): ${Path}. Trying cache...`,
						);
				} catch (_Error: unknown) {
					false &&
						WarnLog(
							`Navigation fetch failed: ${Path}. Trying cache...`,
							_Error,
						);
				}

				const _Response = await (
					await caches.open(CACHE_ROUTE)
				).match(Request);

				if (_Response) {
					false && Log(`Serving from cache: ${Path}`);

					return _Response;
				}

				false &&
					ErrorLog(`No cache fallback for navigation: ${Path}`);

				return new Response(
					"Network error: You appear to be offline and the page is not cached.",
					{
						status: 503,
						statusText: "Service Unavailable",
						headers: { "Content-Type": "text/plain" },
					},
				);
			})(),
		);

		return;
	}

	// ── Concern 3: Asset Cache (Cache-First) ──
	// Static assets with content hashes: _astro/*, Asset/*, Favicon/*

	if (
		Path.startsWith("/_astro/") ||
		Path.startsWith("/Asset/") ||
		Path.startsWith("/Favicon/") ||
		Path.startsWith("/Image/")
	) {
		false && Log(`Asset (cache-first): ${Path}`);

		Event.respondWith(
			caches
				.open(CACHE_ASSET)
				.then(async (Cache) => {
					const Cached = await Cache.match(Request);

					if (Cached) {
						false && Log(`Asset cache hit: ${Path}`);

						return Cached;
					}

					false && Log(`Asset cache miss, fetching: ${Path}`);

					try {
						const _Response = await fetch(Request);

						if (_Response && _Response.ok) {
							false && Log(`Caching asset: ${Path}`);

							await Cache.put(Request, _Response.clone());
						}

						return (
							_Response ||
							new Response(`Failed to fetch ${Path}`, {
								status: 504,
							})
						);
					} catch (_Error: unknown) {
						false &&
							ErrorLog(`Asset fetch failed: ${Path}`, _Error);

						return new Response(`Offline: ${Path}`, {
							status: 503,
						});
					}
				})
				.catch((_Error: unknown) => {
					false && ErrorLog(`Asset cache error: ${Path}`, _Error);

					return fetch(Request);
				}),
		);

		return;
	}

	// ── Concern 4: Pass-through ──
	false && WarnLog(`Unhandled, passing through: ${Path}`);
});



self.addEventListener("message", (Event: ExtendableMessageEvent) => {
	if (Event.origin !== self.location.origin && Event.origin !== BASE_REMOTE) {
		false &&
			WarnLog(
				`Message from untrusted origin: ${Event.origin}`,
				Event.data,
			);

		return;
	}

	false && Log("Message from client:", Event.data);
});


