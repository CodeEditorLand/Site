import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, t as $$Base } from "./Base_DhBMo2T1.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_wkpfoPSt.mjs";
import { t as AuthAPI } from "./Authentication_g8wRvs2Y.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./Card_7Ud2JdtH.mjs";
import { t as DynamicButton } from "./DynamicButton_BZmnCNU8.mjs";
import { t as DynamicInput } from "./DynamicInput_Bii_sKDt.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
//#region Source/Component/Dynamic/DynamicEmailVerification.tsx
/**
* Dynamic EmailVerification component with states: pending, verifying, success, error
* Auto-verifies if token present in URL, otherwise shows pending state with resend
*/
var DynamicEmailVerification = ({ Content, Token: PropToken, UserEmail, OnVerify, OnResend, OnNavigate, ClassName }) => {
	const { t: T } = useTranslation("verify");
	const [State, SetState] = useState("pending");
	const [, SetToken] = useState(PropToken || "");
	const [Email, SetEmail] = useState(UserEmail || "");
	const [ErrorMessage, SetErrorMessage] = useState("");
	const [ResendSuccess, SetResendSuccess] = useState(false);
	const [ResendCooldown, SetResendCooldown] = useState(0);
	const CooldownInterval = useRef(null);
	const HandleVerify = useCallback(async (VerifyToken) => {
		try {
			if (OnVerify ? await OnVerify(VerifyToken) : true) SetState("success");
			else {
				SetState("error");
				SetErrorMessage(Content.Error.Description);
			}
		} catch {
			SetState("error");
			SetErrorMessage(T("errorGeneric", { defaultValue: "An error occurred during verification.\nPlease try again." }));
		}
	}, [OnVerify, Content.Error.Description]);
	useEffect(() => {
		const UrlToken = PropToken || new URLSearchParams(window.location.search).get("token");
		if (UrlToken) {
			SetToken(UrlToken);
			SetState("verifying");
			HandleVerify(UrlToken);
		}
	}, [PropToken, HandleVerify]);
	const StartCooldown = () => {
		SetResendCooldown(60);
		CooldownInterval.current = setInterval(() => {
			SetResendCooldown((Previous) => {
				if (Previous <= 1) {
					if (CooldownInterval.current) {
						clearInterval(CooldownInterval.current);
						CooldownInterval.current = null;
					}
					return 0;
				}
				return Previous - 1;
			});
		}, 1e3);
	};
	useEffect(() => {
		return () => {
			if (CooldownInterval.current) clearInterval(CooldownInterval.current);
		};
	}, []);
	const HandleResend = async () => {
		if (!Email || ResendCooldown > 0) return;
		try {
			await OnResend?.(Email) || Promise.resolve(true);
			SetResendSuccess(true);
			StartCooldown();
			setTimeout(() => SetResendSuccess(false), 5e3);
		} catch {
			SetErrorMessage(T("resendFailed", { defaultValue: "Failed to resend email.\nPlease try again." }));
		}
	};
	const RenderPending = () => /* @__PURE__ */ jsxs(Card, {
		className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
		children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center flat",
					children: /* @__PURE__ */ jsx(lucide.Mail, {
						className: "h-6 w-6 text-primary",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ jsx(CardTitle, {
					className: "text-2xl",
					children: Content.Pending.Title
				}),
				/* @__PURE__ */ jsx(CardDescription, { children: Content.Pending.Description })
			]
		}), /* @__PURE__ */ jsx(CardContent, {
			className: "space-y-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(DynamicInput, {
						Content: {
							Label: T("emailLabel", { defaultValue: "Email" }),
							Placeholder: T("emailPlaceholder", { defaultValue: "Enter your email to resend verification" }),
							Type: "email",
							Value: Email,
							OnChange: SetEmail
						},
						Id: "email"
					}),
					/* @__PURE__ */ jsx(DynamicButton, {
						Content: {
							...Content.Pending.ResendButton,
							Text: ResendCooldown > 0 ? T("resendCooldown", {
								defaultValue: "Resend in {{seconds}}s",
								seconds: ResendCooldown
							}) : Content.Pending.ResendButton.Text ?? "",
							FullWidth: true,
							Disabled: !Email || ResendCooldown > 0
						},
						OnAction: HandleResend
					}),
					ResendSuccess && /* @__PURE__ */ jsx("p", {
						className: "text-center text-green-600 dark:text-green-400",
						role: "status",
						children: Content.Pending.ResendSuccessMessage || T("resendSuccess", { defaultValue: "Verification email resent!" })
					}),
					Content.Pending.EmailSentMessage && /* @__PURE__ */ jsx("p", {
						className: "text-center text-muted-foreground",
						children: Content.Pending.EmailSentMessage
					})
				]
			})
		})]
	});
	const RenderVerifying = () => /* @__PURE__ */ jsx(Card, {
		className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
		children: /* @__PURE__ */ jsxs(CardHeader, {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center flat",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" })
				}),
				/* @__PURE__ */ jsx(CardTitle, { children: Content.Verifying?.Title || T("verifying.title", { defaultValue: "Verifying your email" }) }),
				/* @__PURE__ */ jsx(CardDescription, {
					role: "status",
					children: Content.Verifying?.Description || T("verifying.description", { defaultValue: "Please wait while we verify your email address..." })
				})
			]
		})
	});
	const RenderSuccess = () => /* @__PURE__ */ jsx(Card, {
		className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
		children: /* @__PURE__ */ jsxs(CardHeader, {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						...Content.Success.ContinueButton,
						FullWidth: true
					},
					OnAction: () => OnNavigate?.("/Dashboard")
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center pt-4",
					children: [
						/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl",
							children: Content.Success.Title
						}),
						" ",
						/* @__PURE__ */ jsx(lucide.CheckCircle, {
							className: "h-5 w-5 shrink-0 text-green-600 dark:text-green-400",
							"aria-hidden": "true"
						})
					]
				}),
				/* @__PURE__ */ jsx(CardDescription, {
					className: "",
					children: Content.Success.Description
				})
			]
		})
	});
	const RenderError = () => /* @__PURE__ */ jsx(Card, {
		className: "StaccatoCard StaccatoBorderShimmer StaccatoShadowLift",
		children: /* @__PURE__ */ jsxs(CardHeader, {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						...Content.Error.BackToSignInButton,
						FullWidth: true
					},
					OnAction: () => OnNavigate?.("/Account/SignIn")
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center pt-4",
					children: [
						/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl",
							children: Content.Error.Title
						}),
						" ",
						/* @__PURE__ */ jsx(lucide.XCircle, {
							className: "h-5 w-5 shrink-0 text-red-600 dark:text-red-400",
							"aria-hidden": "true"
						})
					]
				}),
				/* @__PURE__ */ jsx(CardDescription, {
					className: "",
					children: ErrorMessage || Content.Error.Description
				})
			]
		})
	});
	return /* @__PURE__ */ jsx("section", {
		className: "py-20",
		"aria-label": "Email verification",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: `mx-auto max-w-md ${ClassName}`,
				"aria-live": "polite",
				children: [
					State === "pending" && RenderPending(),
					State === "verifying" && RenderVerifying(),
					State === "success" && RenderSuccess(),
					State === "error" && RenderError()
				]
			})
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/VerifyPage.tsx
var Authentication = new AuthAPI();
var NavigateToPath = (Path) => {
	window.location.href = Path;
};
var VerifyPage = ({ Content, Route, Token, Reason, ClassName, OnVerify, OnResend, OnNavigate }) => {
	const { Verification } = Content;
	const Navigate = OnNavigate || NavigateToPath;
	const [UserEmail, SetUserEmail] = useState("");
	useEffect(() => {
		try {
			const UserData = localStorage.getItem("current_user");
			if (UserData) {
				const ParsedUser = JSON.parse(UserData);
				SetUserEmail(ParsedUser.email || "");
			}
		} catch {}
	}, []);
	const HandleVerify = async (VerifyToken) => {
		try {
			await Authentication.VerifyEmail(VerifyToken);
			toast.success("Email verified successfully!");
			return true;
		} catch (ErrorInstance) {
			const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "Verification failed";
			toast.error(ErrorMessage);
			return false;
		}
	};
	const HandleResend = async (_Email) => {
		try {
			await Authentication.ResendVerification();
			toast.success("Verification email sent!");
			return true;
		} catch (ErrorInstance) {
			const ErrorMessage = ErrorInstance instanceof Error ? ErrorInstance.message : "Failed to resend email";
			toast.error(ErrorMessage);
			return false;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: `flex min-h-screen flex-col ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [
				(Route === "verify" || Route === "pending") && /* @__PURE__ */ jsx(DynamicEmailVerification, {
					Content: Verification,
					...Token ? { Token } : {},
					UserEmail,
					OnVerify: OnVerify || HandleVerify,
					OnResend: OnResend || HandleResend,
					OnNavigate: Navigate
				}),
				Route === "success" && /* @__PURE__ */ jsx("section", {
					className: "py-20",
					children: /* @__PURE__ */ jsx("div", {
						className: "container mx-auto px-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "mx-auto max-w-md text-center",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flat border border-green-500 p-8 dark:border-green-700",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center flat bg-green-100 dark:bg-green-950",
										children: /* @__PURE__ */ jsxs("svg", {
											className: "h-10 w-10 text-green-600 dark:text-green-400",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											"aria-hidden": "true",
											children: [/* @__PURE__ */ jsx("title", { children: "Email verified" }), /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M5 13l4 4L19 7"
											})]
										})
									}),
									/* @__PURE__ */ jsx("h1", {
										className: "mb-2 text-2xl font-bold",
										children: "Email Verified Successfully!"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mb-6 text-muted-foreground",
										children: "Your email address has been verified. You can now access all features."
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 flat bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:bg-primary disabled:pointer-events-none disabled:opacity-50",
										onClick: () => Navigate("/"),
										children: "Continue to Homepage"
									})
								]
							})
						})
					})
				}),
				Route === "failure" && /* @__PURE__ */ jsx("section", {
					className: "py-20",
					children: /* @__PURE__ */ jsx("div", {
						className: "container mx-auto px-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "mx-auto max-w-md text-center",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flat border border-destructive p-8",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center flat bg-red-100 dark:bg-red-950",
										children: /* @__PURE__ */ jsxs("svg", {
											className: "h-10 w-10 text-red-600 dark:text-red-400",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											"aria-hidden": "true",
											children: [/* @__PURE__ */ jsx("title", { children: "Verification failed" }), /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M6 18L18 6M6 6l12 12"
											})]
										})
									}),
									/* @__PURE__ */ jsx("h1", {
										className: "mb-2 text-2xl font-bold",
										children: "Verification Failed"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mb-2 text-muted-foreground",
										children: Reason ? `Error: ${Reason}` : "This verification link is invalid or has expired."
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mb-6 text-muted-foreground",
										children: "Please request a new verification email or contact support if the problem persists."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-center gap-4",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 flat bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:bg-primary",
											onClick: () => Navigate("/Verify"),
											children: "Send New Verification Email"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "StaccatoButton inline-flex h-10 items-center justify-center gap-0 flat bg-background px-4 py-2 font-medium transition-all hover:bg-accent",
											onClick: () => Navigate("/Account/SignIn"),
											children: "Sign In"
										})]
									})
								]
							})
						})
					})
				})
			]
		})
	});
};
//#endregion
//#region Source/pages/Verify.astro
var Verify_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Verify,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Verify = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Verify;
	const T = GetI18n();
	const VerifyContent = { Verification: {
		Pending: {
			Title: T("verify.pending.title", { defaultValue: "Verify Your Email Address" }),
			Description: T("verify.pending.description", { defaultValue: "A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 7 days.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share this email with anyone." }),
			ResendButton: {
				Text: T("verify.pending.resendButton", { defaultValue: "Resend Verification Email" }),
				Variant: "default",
				FullWidth: true
			}
		},
		Success: {
			Title: T("verify.success.title", { defaultValue: "Email verified!" }),
			Description: T("verify.success.description", { defaultValue: "Your email has been successfully verified." }),
			ContinueButton: {
				Text: T("verify.success.continueButton", { defaultValue: "Continue to Homepage" }),
				Variant: "default",
				FullWidth: true
			}
		},
		Error: {
			Title: T("verify.error.title", { defaultValue: "Verification failed" }),
			Description: T("verify.error.description", { defaultValue: "This verification link is invalid or has expired." }),
			BackToSignInButton: {
				Text: T("verify.error.backToSignInButton", { defaultValue: "Back to Sign In" }),
				Variant: "default",
				FullWidth: true
			}
		}
	} };
	const Token = Astro.url.searchParams.get("token");
	const Reason = Astro.url.searchParams.get("reason");
	const Route = Token ? "verify" : Reason ? "failure" : "pending";
	const MetaTitle = T("meta.verify.title", { defaultValue: "Verify Email - Code Editor Land" });
	const MetaDescription = T("verify.pending.description", { defaultValue: "A verification link has been sent to your email address.\nPlease check your inbox and click the link to activate your account.\nThe link is valid for 7 days.\nIf the email is not received within a few minutes, check the spam or promotions folder.\nFor security, do not share this email with anyone." });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"noIndex": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", Header, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
		"client:component-export": "Header"
	})} ${maybeRenderHead($$result)}<main id="main-content"> ${renderComponent($$result, "VerifyPage", VerifyPage, {
		"Content": VerifyContent,
		"Route": Route,
		"Token": Token || void 0,
		"Reason": Reason || void 0,
		"MetaTitle": MetaTitle,
		"MetaDescription": MetaDescription
	})} </main> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro";
var $$url = "/Verify";
//#endregion
//#region \0virtual:astro:page:Source/pages/Verify@_@astro
var page = () => Verify_exports;
//#endregion
export { page };
