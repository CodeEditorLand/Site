import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { a as VerifyContent, n as DynamicButton, r as AuthAPI, t as DynamicInput } from "./DynamicInput_BJHPGyBw.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { Gt as LoadNamespace, St as Header, Zt as createAstro, ct as $$RecordLedger, ft as RegisterOf, it as LoadServerNamespace, rt as GetI18n, t as $$Base, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as AuthReport } from "./Report_B4f34NRY.mjs";
import { n as StateLabel } from "./DynamicStateReport_CppvWskY.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { t as $$RecordWell } from "./RecordWell_DwPpyOpV.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
import { t as SurfaceLives } from "./Life_BQ93jaTL.mjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
// Source/Component/Dynamic/DynamicEmailVerification.tsx
/**
* Dynamic EmailVerification component with states: pending, verifying,
* success, error. Auto-verifies if a token is present in the URL, otherwise
* shows the pending state with resend.
*
* Every state is a report in the card's own anatomy (`AuthReport`): the
* state's coded label, the state's title as an `h2`, one sentence saying what
* happened, and the action that is available. The pending state is the
* baseline's - the mail tile, the `Verify Your Email Address` heading, the
* four-sentence paragraph, the labelled email field and the full-width resend
* button.
*
* **The label is the vocabulary.** `Verify.json` carries `auth.pendingStatus`,
* `auth.verifyingStatus`, `auth.verifiedStatus` and `auth.failedStatus` -
* `STATUS: PREPARING`, `LOADING`, `VERIFIED`, `INTERRUPTED` - and every branch
* passes its own key, so the words in that file are the words this route prints
* and their tones come from `State.ts` rather than from a branch's opinion about
* how bad the news is. A state printed only as prose has lost its state.
* (The file's fifth key, `auth.expiredStatus`, is the failure route's -
* `pages/Verify.astro` prints it when the provider says the link expired.)
*
* **Every key is namespace-qualified.** `useTranslation("verify")` binds the
* hook's default namespace, but `T("verify:...")` states the namespace at the
* call site as well, so a lookup cannot be redirected by a different default
* and a reader can see which file a sentence comes from. `Verify.json` is the
* copy; each `defaultValue` here is the missing-key arm and repeats the file's
* sentence verbatim, so a missing key degrades to the same words instead of to
* an older draft of them.
*/
var DynamicEmailVerification = ({ Content, Token: PropToken, UserEmail, OnVerify, OnResend, OnNavigate }) => {
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
			SetErrorMessage(T("verify:errorGeneric", { defaultValue: "The check did not complete: the provider returned no answer for this token. Requesting a new link is the next step." }));
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
			SetErrorMessage(T("verify:resendFailed", { defaultValue: "The resend did not go out: the provider rejected the request. The existing link still works until it expires." }));
		}
	};
	const RenderPending = () => /* @__PURE__ */ jsx(AuthReport, {
		State: T("verify:auth.pendingStatus", { defaultValue: StateLabel.Preparing }),
		Title: Content.Pending.Title,
		Sentence: Content.Pending.Description,
		Glyph: "mail",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsx(DynamicInput, {
					Content: {
						Label: T("verify:emailLabel", { defaultValue: "Email" }),
						Placeholder: T("verify:emailPlaceholder", { defaultValue: "Enter your email address" }),
						Type: "email",
						Value: Email,
						OnChange: SetEmail
					},
					Id: "email"
				}),
				/* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						...Content.Pending.ResendButton,
						Text: ResendCooldown > 0 ? T("verify:resendCooldown", {
							defaultValue: "Resend in {{seconds}}s",
							seconds: ResendCooldown
						}) : Content.Pending.ResendButton.Text ?? "",
						FullWidth: true,
						Disabled: !Email || ResendCooldown > 0,
						Variant: "default",
						ClassName: "auth-shell__primary"
					},
					OnAction: HandleResend
				}),
				ResendSuccess && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__note",
					role: "status",
					children: Content.Pending.ResendSuccessMessage || T("verify:resendSuccess", { defaultValue: "Verification email resent." })
				}),
				Content.Pending.EmailSentMessage && /* @__PURE__ */ jsx("p", {
					className: "auth-shell__note",
					children: Content.Pending.EmailSentMessage
				})
			]
		})
	});
	const RenderVerifying = () => /* @__PURE__ */ jsx(AuthReport, {
		State: T("verify:auth.verifyingStatus", { defaultValue: StateLabel.Loading }),
		Title: Content.Verifying?.Title || T("verify:verifying.title", { defaultValue: "Verifying your email" }),
		Sentence: Content.Verifying?.Description || T("verify:verifying.description", { defaultValue: "Checking the email address with the provider." }),
		Glyph: "loading",
		Role: "status",
		children: /* @__PURE__ */ jsx("a", {
			href: "/",
			className: "auth-shell__alternate",
			children: T("verify:backToEditor", { defaultValue: "Back to the editor" })
		})
	});
	const RenderSuccess = () => /* @__PURE__ */ jsx(AuthReport, {
		State: T("verify:auth.verifiedStatus", { defaultValue: StateLabel.Verified }),
		Title: Content.Success.Title,
		Sentence: Content.Success.Description,
		Glyph: "check",
		children: /* @__PURE__ */ jsx(DynamicButton, {
			Content: {
				...Content.Success.ContinueButton,
				FullWidth: true,
				Variant: "default",
				ClassName: "auth-shell__primary"
			},
			OnAction: () => OnNavigate?.("/Dashboard")
		})
	});
	const RenderError = () => /* @__PURE__ */ jsx(AuthReport, {
		State: T("verify:auth.failedStatus", { defaultValue: StateLabel.Interrupted }),
		Title: Content.Error.Title,
		Sentence: ErrorMessage || Content.Error.Description,
		Glyph: "alert",
		Role: "alert",
		children: /* @__PURE__ */ jsx(DynamicButton, {
			Content: {
				...Content.Error.BackToSignInButton,
				FullWidth: true,
				Variant: "default",
				ClassName: "auth-shell__primary"
			},
			OnAction: () => OnNavigate?.("/Account/SignIn")
		})
	});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		State === "pending" && RenderPending(),
		State === "verifying" && RenderVerifying(),
		State === "success" && RenderSuccess(),
		State === "error" && RenderError()
	] });
};
// Source/Component/Dynamic/VerifyPage.tsx
var Authentication = new AuthAPI();
var NavigateToPath = (Path) => {
	window.location.href = Path;
};
/**
* VerifyPage - the state machine behind /Verify.
*
* Three entry modes: `verify` (a token is in the URL), `pending` (no token,
* no reason - the email is still waiting to be clicked) and `failure` (the
* provider sent a reason). Each mode renders a report inside the route's
* card (`AuthReport`): what the state is, what happened, and the action
* available. The pending mode is the baseline's own card.
*/
var VerifyPage = ({ Content, Route, Token, Reason, OnVerify, OnResend, OnNavigate }) => {
	const { t: T } = useTranslation("verify");
	const { Verification } = Content;
	const Navigate = OnNavigate || NavigateToPath;
	const [UserEmail, SetUserEmail] = useState("");
	useEffect(() => {
		LoadNamespace("verify");
	}, []);
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
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		(Route === "verify" || Route === "pending") && /* @__PURE__ */ jsx(DynamicEmailVerification, {
			Content: Verification,
			...Token ? { Token } : {},
			UserEmail,
			OnVerify: OnVerify || HandleVerify,
			OnResend: OnResend || HandleResend,
			OnNavigate: Navigate
		}),
		Route === "success" && /* @__PURE__ */ jsx(AuthReport, {
			Title: T("success.title", { defaultValue: "Email verified!" }),
			Sentence: "Your email has been successfully verified. You can now sign in to your account and start using Code Editor Land.",
			Glyph: "check",
			children: /* @__PURE__ */ jsx(DynamicButton, {
				Content: {
					Text: "Continue to Homepage",
					Variant: "default",
					ClassName: "auth-shell__primary"
				},
				OnAction: () => Navigate("/")
			})
		}),
		Route === "failure" && /* @__PURE__ */ jsx(AuthReport, {
			Title: T("error.title", { defaultValue: "Verification failed" }),
			Sentence: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				"This verification link is invalid or has expired.",
				Reason ? ` Reason: ${Reason}` : null,
				" ",
				"Please request a new verification email or contact support if the problem persists."
			] }),
			Glyph: "alert",
			Role: "alert",
			children: /* @__PURE__ */ jsxs("div", {
				className: "auth-shell__actions",
				children: [/* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						Text: "Send New Verification Email",
						Variant: "default",
						ClassName: "auth-shell__primary"
					},
					OnAction: () => Navigate("/Verify")
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "auth-shell__alternate",
					onClick: () => Navigate("/Account/SignIn"),
					children: "Sign In"
				})]
			})
		})
	] });
};
// Source/Content/Layout/Verify.ts
/** Resolve the route's audit through the page's translator. */
var VerifyAudit = (T, Declarations) => ({
	scopeLabel: "CHECK",
	scope: [
		...Declarations.map((Row) => ({
			key: `${Row.key}:`,
			value: Row.value
		})),
		{
			key: "WINDOW:",
			value: T("layout.verify.window", { defaultValue: "24 HOURS" })
		},
		{
			key: "PRODUCED BY:",
			value: T("layout.verify.producer", { defaultValue: "AUTH0" })
		}
	],
	columns: [
		{ label: T("layout.verify.column.state", { defaultValue: "STATE" }) },
		{ label: T("layout.verify.column.means", { defaultValue: "WHAT IT MEANS" }) },
		{ label: T("layout.verify.column.reader", { defaultValue: "WHAT THE READER DOES" }) }
	],
	rows: [
		{
			label: T("layout.verify.row.pending", { defaultValue: "PENDING" }),
			cells: [T("layout.verify.pending.means", { defaultValue: "A link was sent and has not been opened." }), T("layout.verify.pending.reader", { defaultValue: "Open the link in the inbox." })]
		},
		{
			label: T("layout.verify.row.verifying", { defaultValue: "VERIFYING" }),
			cells: [T("layout.verify.verifying.means", { defaultValue: "The link carries a token and the card exchanges it." }), T("layout.verify.verifying.reader", { defaultValue: "Nothing - the exchange runs on open." })]
		},
		{
			label: T("layout.verify.row.verified", { defaultValue: "VERIFIED" }),
			cells: [T("layout.verify.verified.means", { defaultValue: "The address is confirmed on the account." }), T("layout.verify.verified.reader", { defaultValue: "Continue to the dashboard." })]
		},
		{
			label: T("layout.verify.row.expired", { defaultValue: "EXPIRED" }),
			cells: [T("layout.verify.expired.means", { defaultValue: "The window closed before the link was opened." }), T("layout.verify.expired.reader", { defaultValue: "Request a new link from the card." })]
		},
		{
			label: T("layout.verify.row.failed", { defaultValue: "FAILED" }),
			cells: [T("layout.verify.failed.means", { defaultValue: "The provider rejected the token." }), T("layout.verify.failed.reader", { defaultValue: "Request a new link from the card." })]
		}
	],
	caption: T("layout.verify.caption", { defaultValue: "Five states, read from the route's own state machine. No token, signature or digest is claimed here: the exchange belongs to the provider." }),
	well: {
		label: T("layout.verify.well.label", { defaultValue: "THE LINK" }),
		language: "http",
		lines: [
			"GET /Verify                    -> PENDING",
			"GET /Verify?token=<token>      -> VERIFYING",
			"GET /Verify?reason=expired     -> EXPIRED",
			"GET /Verify?reason=failed      -> FAILED"
		],
		source: "SOURCE: SOURCE/PAGES/VERIFY.ASTRO"
	},
	adverse: {
		error: {
			statement: T("layout.verify.error.statement", { defaultValue: "The exchange reached the provider and came back rejected, so the token was never accepted." }),
			cause: T("layout.verify.error.cause", { defaultValue: "An expired or already-used link, or a provider that could not read the request. The card names which." }),
			next: {
				label: T("layout.verify.error.next", { defaultValue: "REQUEST A NEW LINK" }),
				href: "/Account/SignIn"
			}
		},
		stale: {
			statement: T("layout.verify.stale.statement", { defaultValue: "The link was issued inside a 24-hour window and the window has closed." }),
			cause: T("layout.verify.stale.cause", { defaultValue: "AGE: PAST THE WINDOW. The address is unchanged and unverified; nothing was lost but the link." }),
			next: {
				label: T("layout.verify.stale.next", { defaultValue: "ISSUE ANOTHER LINK" }),
				href: "/Account/SignIn"
			}
		},
		denied: {
			statement: T("layout.verify.denied.statement", { defaultValue: "This surface confirms an address on an account, so it is only readable with a session that owns one." }),
			cause: T("layout.verify.denied.cause", { defaultValue: "Signed out. The route prints its contract, its states and its failures to every reader - the confirmation itself needs the session." }),
			next: {
				label: T("layout.verify.denied.next", { defaultValue: "SIGN IN" }),
				href: "/Account/SignIn"
			}
		}
	}
});
// Source/pages/Verify.astro
var Verify_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Verify,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Verify = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Verify;
	LoadServerNamespace("verify");
	const T = GetI18n();
	const Verify = VerifyContent(T);
	const Token = Astro.url.searchParams.get("token");
	const Reason = Astro.url.searchParams.get("reason");
	const Route = Token ? "verify" : Reason ? "failure" : "pending";
	const States = Route === "failure" ? [Row("STATUS", Reason === "expired" ? T("verify:auth.expiredStatus", { defaultValue: "STATUS: UNAVAILABLE" }) : T("verify:auth.failedStatus", { defaultValue: "STATUS: INTERRUPTED" }))] : [];
	const Frame = AuthFrameFor("verify", T);
	const Declarations = [
		{
			key: "RECORD",
			value: "EMAIL"
		},
		{
			key: "ROUTE",
			value: "/VERIFY"
		},
		{
			key: "SOURCE",
			value: "EMAIL LINK"
		},
		{
			key: "AS OF",
			value: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}
	];
	const Audit = VerifyAudit(T, Declarations);
	const TrailItems = [
		{
			label: `/${T("common.breadcrumb.home", { defaultValue: "Home" }).toUpperCase()}`,
			href: "/"
		},
		{
			label: `/${T("common.breadcrumb.account", { defaultValue: "Account" }).toUpperCase()}`,
			href: "/Account"
		},
		{ label: Frame.kicker }
	];
	const MetaTitle = T("meta.verify.title", { defaultValue: "Verify Email - Code Editor Land" });
	const MetaDescription = T("verify:pending.description", { defaultValue: "A link was sent to the address on the account. It opens for 24 hours and works once.\n\nIf nothing arrives in a few minutes, the spam folder is the next place to look.\n\nThe link is a credential: anyone who opens it verifies the address." });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"noIndex": true
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# AUDIT_02",
			"label": "THE VERIFICATION LINK"
		}, {
			"default": ($$result) => renderTemplate`    ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
				"columns": Audit.columns,
				"rows": Audit.rows,
				"caption": Audit.caption
			})} ${maybeRenderHead($$result)}<div class="PageShell__instrument">  ${renderComponent($$result, "VerifyPage", VerifyPage, {
				"client:load": true,
				"Content": Verify,
				"Route": Route,
				"Token": Token || void 0,
				"Reason": Reason || void 0,
				"MetaTitle": MetaTitle,
				"MetaDescription": MetaDescription,
				"client:component-hydration": "load",
				"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/VerifyPage.tsx",
				"client:component-export": "VerifyPage"
			})} </div> ${renderComponent($$result, "RecordWell", $$RecordWell, {
				"label": Audit.well.label,
				"language": Audit.well.language,
				"lines": Audit.well.lines,
				"source": Audit.well.source
			})}  `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": TrailItems
			})}${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
				"slot": "head",
				"index": "# VERIFY_01",
				"title": Frame.heading,
				"proposition": Frame.sentence,
				"states": States,
				"declarations": Declarations,
				"life": SurfaceLives.VERIFY.term,
				"lifeNote": SurfaceLives.VERIFY.source,
				"rows": [
					{
						key: "RECORD:",
						value: "EMAIL ADDRESS"
					},
					{
						key: "WINDOW:",
						value: "24 HOURS"
					},
					{
						key: "PRODUCER:",
						value: "AUTH0"
					},
					{
						key: "ALTERNATE:",
						value: Frame.action.label
					}
				]
			})}`,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
				"slot": "rail",
				"register": RegisterOf(Audit.scopeLabel, Audit.scope),
				"rows": Audit.scope,
				"columns": 1
			})}`,
			"foot": ($$result) => renderTemplate`<div class="PageShell__row" style="--row-tracks:3"> ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "error",
				"index": "FAILURE / 01",
				"statement": Audit.adverse.error.statement,
				"cause": Audit.adverse.error.cause,
				"next": Audit.adverse.error.next,
				"note": "SOURCE: PROVIDER RESPONSE"
			})} ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "stale",
				"index": "FAILURE / 02",
				"statement": Audit.adverse.stale.statement,
				"cause": Audit.adverse.stale.cause,
				"next": Audit.adverse.stale.next,
				"asOf": "ISSUED AT LINK CREATION",
				"age": "PAST THE WINDOW",
				"note": "SOURCE: WINDOW DECLARATION"
			})} ${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "denied",
				"index": "FAILURE / 03",
				"statement": Audit.adverse.denied.statement,
				"cause": Audit.adverse.denied.cause,
				"next": Audit.adverse.denied.next,
				"note": "SOURCE: SESSION"
			})} </div>`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Verify.astro";
var $$url = "/Verify";
// \0virtual:astro:page:Source/pages/Verify@_@astro
var page = () => Verify_exports;
export { page };
