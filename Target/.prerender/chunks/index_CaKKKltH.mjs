import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { n as AuthFrameFor, t as AccountCrumbs } from "./Data_DzJ24Zfb.mjs";
import { n as ThemeImage, t as DynamicAuthHeader_default } from "./DynamicAuthHeader_D8NCRGHe.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_QSmpZFE4.mjs";
import { Zt as createAstro, ct as $$RecordLedger, ft as RegisterOf, qt as Button, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import "./Avatar_DJQYAF80.mjs";
import { n as StateLabel, t as DynamicStateReport } from "./DynamicStateReport_CppvWskY.mjs";
import { t as $$RecordAside } from "./RecordAside_DoIExEdG.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellPanes } from "./ShellPanes_By4EddmM.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
import { t as SurfaceLives } from "./Life_BQ93jaTL.mjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff, Lock, MailCheck, ShieldCheck } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
// Source/Component/Dynamic/DynamicAccountProfile.tsx
var Pii = ({ children, visible }) => /* @__PURE__ */ jsx("span", {
	className: `transition-all duration-200 ${visible ? "" : "select-none blur-sm"}`,
	children
});
var SourceBadge = ({ label, icon }) => /* @__PURE__ */ jsxs("span", {
	className: "bg-mute inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-sm text-muted-foreground",
	children: [icon && /* @__PURE__ */ jsx(ThemeImage, {
		src: icon,
		alt: label,
		width: 10,
		height: 10,
		className: "h-2.5 w-2.5"
	}), label]
});
var FieldRow = ({ label, value, source, sourceIcon, editable, editHint, editHref }) => /* @__PURE__ */ jsxs("div", {
	className: "px-6 py-4",
	children: [/* @__PURE__ */ jsx("div", {
		className: "flex items-start justify-between gap-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium",
						children: label
					}),
					/* @__PURE__ */ jsx(SourceBadge, {
						label: source,
						icon: sourceIcon
					}),
					editable ? /* @__PURE__ */ jsx("span", {
						className: "inline-flex items-center border border-[color:var(--Divider)] bg-[var(--Mute)] px-1.5 py-0 font-mono text-sm text-[var(--Foreground)]",
						children: "Editable"
					}) : /* @__PURE__ */ jsx("span", {
						className: "bg-mute inline-flex items-center px-1.5 py-0 font-mono text-sm text-muted-foreground",
						children: "Read-only"
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-1 text-sm text-card-foreground opacity-70",
				children: value
			})]
		})
	}), editHint && /* @__PURE__ */ jsxs("p", {
		className: "mt-1.5 text-sm text-card-foreground opacity-70",
		children: [editHint, editHref && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("a", {
			href: editHref,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "text-card-foreground hover:underline",
			children: "Update here →"
		})] })]
	})]
});
var Auth0Badge = () => /* @__PURE__ */ jsxs("a", {
	href: "https://auth0.com/privacy",
	target: "_blank",
	rel: "noopener noreferrer",
	className: "inline-flex items-center gap-1.5 border border-[#EB5424]/30 bg-[#EB5424]/5 px-2 py-1 text-sm transition-colors hover:bg-[#EB5424]/10",
	children: [/* @__PURE__ */ jsxs("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z",
			fill: "#EB5424"
		}), /* @__PURE__ */ jsx("path", {
			d: "M12 6l-5 2.75V12c0 3.25 2.3 6.25 5 6.9 2.7-.65 5-3.65 5-6.9V8.75L12 6z",
			fill: "white",
			fillOpacity: "0.9"
		})]
	}), /* @__PURE__ */ jsxs("span", { children: [
		"Secured by",
		" ",
		/* @__PURE__ */ jsx("span", {
			className: "font-medium",
			style: { color: "#EB5424" },
			children: "Auth0"
		}),
		" ",
		"by Okta"
	] })]
});
var DetectProviderLabel = (Sub) => {
	if (!Sub) return "Email";
	if (Sub.startsWith("github|")) return "GitHub";
	if (Sub.startsWith("google-oauth2|")) return "Google";
	if (Sub.startsWith("gitlab|")) return "GitLab";
	if (Sub.startsWith("okta|")) return "Okta SSO";
	if (Sub.startsWith("samlp|")) return "SAML SSO";
	if (Sub.startsWith("waad|")) return "Azure AD";
	return "Auth0";
};
var DetectProviderIcon = (Sub) => {
	if (!Sub) return null;
	if (Sub.startsWith("github|")) return "/Image/GitHub.svg";
	if (Sub.startsWith("google-oauth2|")) return "/Image/Google.svg";
	if (Sub.startsWith("gitlab|")) return "/Image/GitLab.svg";
	if (Sub.startsWith("okta|")) return "/Image/Okta.svg";
	if (Sub.startsWith("waad|")) return "/Image/Microsoft.svg";
	return null;
};
var DetectProviderProfileUrl = (Sub) => {
	if (!Sub) return null;
	if (Sub.startsWith("github|")) return "https://github.com/settings/profile";
	if (Sub.startsWith("google-oauth2|")) return "https://myaccount.google.com/personal-info";
	if (Sub.startsWith("gitlab|")) return "https://gitlab.com/-/profile";
	return null;
};
var DetectPortalTier = (Sub) => {
	if (!Sub) return "LocalFirst";
	if (Sub.startsWith("github|")) return "Provider";
	if (Sub.startsWith("google-oauth2|")) return "Provider";
	if (Sub.startsWith("gitlab|")) return "Provider";
	if (Sub.startsWith("okta|")) return "Enterprise";
	if (Sub.startsWith("samlp|")) return "Enterprise";
	if (Sub.startsWith("waad|")) return "Enterprise";
	return "Cloud";
};
var IsEnterpriseUser = (Sub) => {
	if (!Sub) return false;
	return Sub.startsWith("okta|") || Sub.startsWith("samlp|") || Sub.startsWith("waad|");
};
var TierColorMap = {
	Cloud: {
		Border: "border-blue-200",
		Background: "bg-blue-50",
		Text: "text-blue-700",
		Dot: "bg-blue-500"
	},
	Provider: {
		Border: "border-purple-200",
		Background: "bg-purple-50",
		Text: "text-purple-700",
		Dot: "bg-purple-500"
	},
	LocalFirst: {
		Border: "border-orange-200",
		Background: "bg-orange-50",
		Text: "text-orange-700",
		Dot: "bg-orange-500"
	},
	Enterprise: {
		Border: "border-green-200",
		Background: "bg-green-50",
		Text: "text-green-700",
		Dot: "bg-green-500"
	}
};
var DynamicAccountProfile_default = ({ Domain, ClientIdentifier }) => /* @__PURE__ */ jsx(Auth0Provider_default, {
	Children: /* @__PURE__ */ jsx(AccountProfileInner, {
		Domain,
		ClientIdentifier
	}),
	...Domain ? { Domain } : {},
	...ClientIdentifier ? { ClientIdentifier } : {}
});
var ClearAuthFromServiceWorker = () => {
	try {
		if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller) return;
		navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
	} catch {}
};
var ClearLegacyTokens = () => {
	try {
		localStorage.removeItem("session_token");
		localStorage.removeItem("current_user");
		document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	} catch {}
};
var AccountProfileInner = ({ Domain = "", ClientIdentifier = "" }) => {
	const { isLoading: IsLoading, isAuthenticated: IsAuthenticated, user: User, error: AuthError, loginWithRedirect: Login, logout: Auth0Logout } = useAuth0();
	const { t: T } = useTranslation("account");
	const [PIIVisible, SetPIIVisible] = useState(false);
	const [PasswordResetState, SetPasswordResetState] = useState("idle");
	const HandleSignOut = () => {
		ClearAuthFromServiceWorker();
		ClearLegacyTokens();
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
	};
	const HandlePasswordReset = async () => {
		if (!User?.email || !Domain || !ClientIdentifier) return;
		SetPasswordResetState("sending");
		try {
			const Response = await fetch(`https://${Domain}/dbconnections/change_password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					client_id: ClientIdentifier,
					email: User.email,
					connection: "Username-Password-Authentication"
				})
			});
			SetPasswordResetState(Response.ok ? "sent" : "error");
		} catch {
			SetPasswordResetState("error");
		}
	};
	if (IsLoading) return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl space-y-6 px-4 py-16",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flat bg-mute h-20 w-20 shrink-0",
					"data-slot": "skeleton"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 space-y-3",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flat bg-mute h-6 w-48",
							"data-slot": "skeleton"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flat bg-mute h-4 w-64",
							"data-slot": "skeleton"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flat bg-mute h-4 w-32",
							"data-slot": "skeleton"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-48 w-full",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-32 w-full",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-24 w-full",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx(DynamicStateReport, {
				Label: StateLabel.Loading,
				Loading: true,
				Sentence: T("accountPage.loading", { defaultValue: "Reading your profile from the identity provider. The account fields appear as soon as it answers." }),
				Action: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "auth-shell__alternate",
					onClick: () => window.location.reload(),
					children: T("reload", { defaultValue: "Reload" })
				})
			})
		]
	});
	if (AuthError) return /* @__PURE__ */ jsx(DynamicStateReport, {
		Role: "alert",
		Label: StateLabel.Interrupted,
		Sentence: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			T("error", { defaultValue: "Authentication error" }),
			":",
			" ",
			AuthError.message
		] }),
		Action: /* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: () => window.location.reload(),
			children: T("tryAgain", { defaultValue: "Try again" })
		})
	});
	if (!IsAuthenticated || !User) return /* @__PURE__ */ jsx(DynamicStateReport, {
		Label: StateLabel.SignInRequired,
		Sentence: T("notSignedIn", { defaultValue: "Sign in to manage your account." }),
		Action: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => {
				try {
					sessionStorage.setItem("auth0_return_to", window.location.pathname);
				} catch {}
				Login();
			},
			className: "auth-shell__primary emphasis-expressive",
			children: T("signInButton", { defaultValue: "Sign In" })
		})
	});
	const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
	const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : "--";
	const ProviderLabel = DetectProviderLabel(User.sub);
	const ProviderIcon = DetectProviderIcon(User.sub);
	const ProviderProfileUrl = DetectProviderProfileUrl(User.sub);
	const Tier = DetectPortalTier(User.sub);
	const TierColor = TierColorMap[Tier] || TierColorMap["Cloud"];
	const IsEnterprise = IsEnterpriseUser(User.sub);
	const IsSocialUser = User.sub !== void 0 && !User.sub.startsWith("auth0|");
	const IsEmailPasswordUser = User.sub?.startsWith("auth0|") === true;
	const OrganizationName = User["org_name"];
	const OrganizationIdentifier = User["org_id"];
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl space-y-8 px-4 py-16",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-6",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: `shrink-0 transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
						children: User.picture ? /* @__PURE__ */ jsx("img", {
							src: User.picture,
							alt: User.name || "User avatar",
							title: User.name || "User avatar",
							width: "80",
							height: "80",
							className: "flat h-20 w-20 object-cover"
						}) : /* @__PURE__ */ jsx("div", {
							className: "bg-mute flex h-20 w-20 items-center justify-center text-sub font-medium text-muted-foreground",
							children: DisplayName.slice(0, 2).toUpperCase()
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "type-sub font-medium",
								children: /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: DisplayName
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-1 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-sm text-muted-foreground",
										children: /* @__PURE__ */ jsx(Pii, {
											visible: PIIVisible,
											children: User.email || "--"
										})
									}),
									User.email_verified === true && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 text-sm font-medium text-green-700",
										children: [/* @__PURE__ */ jsx(MailCheck, {
											className: "h-2.5 w-2.5",
											"aria-hidden": "true"
										}), "Verified"]
									}),
									User.email_verified === false && /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 text-sm font-medium text-yellow-700",
										children: "Not Verified"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ jsxs("span", {
									className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-sm font-medium ${TierColor.Text}`,
									children: [
										Tier,
										" ",
										/* @__PURE__ */ jsx("span", {
											className: `StaccatoDot flat h-1.5 w-1.5 ${TierColor.Dot}`,
											"aria-hidden": "true"
										})
									]
								}), ProviderIcon ? /* @__PURE__ */ jsxs("span", {
									className: "bg-mute inline-flex items-center gap-1 px-2 py-0.5 text-sm font-medium text-muted-foreground",
									children: [/* @__PURE__ */ jsx(ThemeImage, {
										src: ProviderIcon,
										alt: ProviderLabel,
										width: 12,
										height: 12,
										className: "h-3 w-3"
									}), /* @__PURE__ */ jsx(Pii, {
										visible: PIIVisible,
										children: ProviderLabel
									})]
								}) : /* @__PURE__ */ jsx("span", {
									className: "bg-mute inline-flex items-center px-2 py-0.5 text-sm font-medium text-muted-foreground",
									children: /* @__PURE__ */ jsx(Pii, {
										visible: PIIVisible,
										children: ProviderLabel
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => SetPIIVisible((v) => !v),
						"aria-label": PIIVisible ? "Hide personal data" : "Show personal data",
						className: "mt-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
						children: PIIVisible ? /* @__PURE__ */ jsx(EyeOff, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						}) : /* @__PURE__ */ jsx(Eye, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					})
				]
			}),
			IsEnterprise && /* @__PURE__ */ jsxs("div", {
				className: "border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ShieldCheck, {
						className: "h-4 w-4 shrink-0",
						"aria-hidden": "true"
					}), /* @__PURE__ */ jsxs("span", { children: ["Enterprise SSO active", (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxs(Fragment$1, { children: [" - ", /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: /* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: OrganizationName || OrganizationIdentifier
						})
					})] })] })]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 pl-6 text-sm text-green-600",
					children: "Profile fields are managed by your organization's identity provider. Contact your IT administrator to update them."
				})]
			}),
			User.email_verified === false && /* @__PURE__ */ jsx("div", {
				className: "border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700",
				children: T("emailNotVerified", { defaultValue: "Email not verified. Check your inbox." })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-mute flex items-start gap-4 border border-[var(--Border)] px-5 py-4",
				children: [/* @__PURE__ */ jsx(Lock, {
					className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground",
					"aria-hidden": "true"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 space-y-1",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm font-medium",
							children: "Your account data is stored securely"
						}), /* @__PURE__ */ jsx(Auth0Badge, {})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Authentication, profile data, and session tokens are managed by Auth0 (by Okta) and stored on their EU infrastructure. Code Editor Land does not store your password. Social login credentials (Google, GitHub, etc.) remain with your identity provider."
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "StaccatoCard StaccatoBorderShimmer bg-card",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-b border-[var(--Border)] px-6 py-4",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-medium text-card-foreground",
						children: T("profileSection", { defaultValue: "Profile Fields" })
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm text-card-foreground",
						children: "All data stored in Auth0"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "divide-y divide-[var(--Border)]",
					children: [
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Display Name",
							value: /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: DisplayName
							}),
							source: IsSocialUser ? ProviderLabel : "Auth0",
							sourceIcon: IsSocialUser ? ProviderIcon : null,
							editable: !IsSocialUser,
							editHint: IsSocialUser ? `Set by your ${ProviderLabel} account. To change it, update your profile at ${ProviderLabel}.` : "Contact support to update your display name.",
							editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Email Address",
							value: /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(Pii, {
										visible: PIIVisible,
										children: User.email || "--"
									}),
									User.email_verified === true && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 font-mono text-sm text-green-700",
										children: [/* @__PURE__ */ jsx(MailCheck, { className: "h-2.5 w-2.5" }), "verified"]
									}),
									User.email_verified === false && /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 font-mono text-sm text-yellow-700",
										children: "unverified"
									})
								]
							}),
							source: IsSocialUser ? ProviderLabel : "Auth0",
							sourceIcon: IsSocialUser ? ProviderIcon : null,
							editable: IsEmailPasswordUser,
							editHint: IsSocialUser ? `Email is tied to your ${ProviderLabel} account and cannot be changed here.` : IsEmailPasswordUser ? "Email changes require re-verification. Contact support to initiate an email update." : void 0,
							editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Profile Picture",
							value: User.picture ? /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: `transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
									children: /* @__PURE__ */ jsx("img", {
										src: User.picture,
										alt: "Profile picture",
										width: "32",
										height: "32",
										className: "flat h-8 w-8 object-cover"
									})
								}), /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: /* @__PURE__ */ jsxs("span", {
										className: "font-mono text-sm text-card-foreground opacity-70",
										children: [User.picture.split("/").pop()?.slice(0, 24), "..."]
									})
								})]
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-card-foreground opacity-70",
								children: "Not set"
							}),
							source: IsSocialUser ? ProviderLabel : "Auth0",
							sourceIcon: IsSocialUser ? ProviderIcon : null,
							editable: false,
							editHint: IsSocialUser ? `Avatar is pulled from your ${ProviderLabel} account on each login.` : "Profile picture URL can be updated via the Auth0 Management API. Contact support.",
							editHref: IsSocialUser ? ProviderProfileUrl ?? void 0 : void 0
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Identity Provider",
							value: /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [ProviderIcon && /* @__PURE__ */ jsx(ThemeImage, {
									src: ProviderIcon,
									alt: ProviderLabel,
									width: 14,
									height: 14,
									className: "h-3.5 w-3.5"
								}), /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: ProviderLabel
								})]
							}),
							source: "Auth0",
							editable: false,
							editHint: "To use a different sign-in method, sign out and sign in with another provider. Multiple providers can be linked."
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Portal Tier",
							value: /* @__PURE__ */ jsxs("span", {
								className: `inline-flex items-center border ${TierColor.Border} ${TierColor.Background} px-2 py-0.5 text-sm font-medium ${TierColor.Text}`,
								children: [
									Tier,
									" ",
									/* @__PURE__ */ jsx("span", {
										className: `StaccatoDot flat h-1 w-1 ${TierColor.Dot}`,
										"aria-hidden": "true"
									})
								]
							}),
							source: "Auth0",
							editable: false,
							editHint: "Tier is determined by your sign-in method. Switch to a different provider to change tier."
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "User ID",
							value: /* @__PURE__ */ jsx("code", {
								className: "font-mono text-sm",
								children: /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: User.sub || "--"
								})
							}),
							source: "Auth0",
							editable: false,
							editHint: "System identifier assigned by Auth0. Used in GDPR requests and support tickets."
						}),
						/* @__PURE__ */ jsx(FieldRow, {
							label: "Last Updated",
							value: /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: MemberSince
							}),
							source: "Auth0",
							editable: false
						}),
						IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsx(FieldRow, {
							label: "Organization",
							value: /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: /* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: OrganizationName || OrganizationIdentifier
								})
							}),
							source: "Auth0 Organizations",
							editable: false,
							editHint: "Managed by your organization administrator."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "StaccatoCard StaccatoBorderShimmer bg-card",
				children: [/* @__PURE__ */ jsx("div", {
					className: "border-b border-[var(--Border)] px-6 py-4",
					children: /* @__PURE__ */ jsx("h3", {
						className: "font-medium text-card-foreground",
						children: "Security"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "divide-y divide-[var(--Border)]",
					children: [
						IsEmailPasswordUser && /* @__PURE__ */ jsx("div", {
							className: "px-6 py-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [
											/* @__PURE__ */ jsx(Lock, {
												className: "h-3.5 w-3.5 text-card-foreground opacity-70",
												"aria-hidden": "true"
											}),
											"Password",
											/* @__PURE__ */ jsx(SourceBadge, { label: "Auth0" }),
											/* @__PURE__ */ jsx("span", {
												className: "inline-flex items-center border border-[color:var(--Divider)] bg-[var(--Mute)] px-1.5 py-0 font-mono text-sm text-[var(--Foreground)]",
												children: "Editable"
											})
										]
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-card-foreground opacity-70",
										children: "A reset link is sent to your email. You will not be signed out until you set a new password."
									})] }),
									PasswordResetState === "idle" && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: HandlePasswordReset,
										className: "StaccatoButton shrink-0 bg-card px-3 py-1.5 text-sm font-medium transition-all hover:bg-secondary",
										children: "Send Reset Email"
									}),
									PasswordResetState === "sending" && /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-sm text-card-foreground opacity-70",
										children: "Sending..."
									}),
									PasswordResetState === "sent" && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex shrink-0 items-center gap-1 border border-green-200 bg-green-50 px-2 py-1 text-sm text-green-700",
										children: [/* @__PURE__ */ jsx(MailCheck, { className: "h-3 w-3" }), "Email sent"]
									}),
									PasswordResetState === "error" && /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-sm text-red-600",
										children: "Failed. Try again."
									})
								]
							})
						}),
						IsSocialUser && /* @__PURE__ */ jsxs("div", {
							className: "px-6 py-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [
									/* @__PURE__ */ jsx(Lock, {
										className: "h-3.5 w-3.5 text-card-foreground opacity-70",
										"aria-hidden": "true"
									}),
									"Password",
									/* @__PURE__ */ jsx(SourceBadge, {
										label: ProviderLabel,
										icon: ProviderIcon
									}),
									/* @__PURE__ */ jsx("span", {
										className: "bg-mute inline-flex items-center px-1.5 py-0 font-mono text-sm text-muted-foreground",
										children: "Not applicable"
									})
								]
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-card-foreground opacity-70",
								children: [
									"You signed in via ",
									ProviderLabel,
									". Password management is handled entirely by",
									" ",
									ProviderLabel,
									" - Code Editor Land never receives or stores your password.",
									ProviderProfileUrl && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsxs("a", {
										href: ProviderProfileUrl,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-card-foreground hover:underline",
										children: [
											"Manage at ",
											ProviderLabel,
											" →"
										]
									})] })
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-6 py-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [
									/* @__PURE__ */ jsx(ShieldCheck, {
										className: "h-3.5 w-3.5 text-card-foreground opacity-70",
										"aria-hidden": "true"
									}),
									"Active Session",
									/* @__PURE__ */ jsx(SourceBadge, { label: "Auth0" }),
									/* @__PURE__ */ jsx("span", {
										className: "bg-mute inline-flex items-center px-1.5 py-0 font-mono text-sm text-muted-foreground",
										children: "Read-only"
									})
								]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-card-foreground opacity-70",
								children: "Session managed by Auth0. Signing out revokes the session token on Auth0's servers and clears local storage. Access token validity: 1 hour."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "StaccatoCard StaccatoBorderShimmer bg-card",
				children: [/* @__PURE__ */ jsx("div", {
					className: "border-b border-[var(--Border)] px-6 py-4",
					children: /* @__PURE__ */ jsx("h3", {
						className: "font-medium text-card-foreground",
						children: T("actionsSection", { defaultValue: "Account Actions" })
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-3 px-6 py-4",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "/Dashboard",
						className: "StaccatoButton inline-flex w-full items-center justify-center bg-card px-4 py-2 font-medium transition-all hover:bg-secondary",
						children: [T("goToDashboard", { defaultValue: "Go to Dashboard" }), /* @__PURE__ */ jsx("span", {
							className: "InlineSeparator",
							children: "→"
						})]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: HandleSignOut,
						className: "StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-card px-4 py-2 font-medium text-red-600 transition-all hover:bg-red-50",
						children: T("signOut", { defaultValue: "Sign Out" })
					})]
				})]
			})
		]
	});
};
// Source/Content/Layout/Account.ts
/** Resolve the workspace through the page's translator. */
var AccountWorkspace = (T) => ({
	railLabel: T("layout.account.rail", { defaultValue: "ACCOUNT" }),
	rail: [
		{
			mark: "01",
			label: T("layout.account.route.here", { defaultValue: "/ACCOUNT" }),
			meta: T("layout.account.meta.here", { defaultValue: "HERE" }),
			href: "/Account",
			current: true,
			note: T("layout.account.note.here", { defaultValue: "Profile, session and the editor connection" })
		},
		{
			mark: "02",
			label: T("layout.account.route.signIn", { defaultValue: "/SIGN IN" }),
			href: "/Account/SignIn"
		},
		{
			mark: "03",
			label: T("layout.account.route.signUp", { defaultValue: "/CREATE ACCOUNT" }),
			meta: T("layout.account.meta.planned", { defaultValue: "PREPARING" }),
			href: "/Account/SignUp"
		},
		{
			mark: "04",
			label: T("layout.account.route.forgot", { defaultValue: "/FORGOT PASSWORD" }),
			href: "/Account/ForgotPassword"
		},
		{
			mark: "05",
			label: T("layout.account.route.reset", { defaultValue: "/RESET PASSWORD" }),
			href: "/Account/ResetPassword"
		},
		{
			mark: "06",
			label: T("layout.account.route.dashboard", { defaultValue: "/DASHBOARD" }),
			href: "/Dashboard"
		},
		{
			mark: "07",
			label: T("layout.account.route.portal", { defaultValue: "/PORTAL" }),
			href: "/Portal",
			note: T("layout.account.note.portal", { defaultValue: "The four tiers this account can be held in" })
		}
	],
	accessLabel: "ACCESS",
	access: [
		{
			key: "SESSION:",
			value: T("layout.account.access.session", { defaultValue: "AUTH0" })
		},
		{
			key: "SCOPE:",
			value: T("layout.account.access.scope", { defaultValue: "PROFILE" })
		},
		{
			key: "WORKSPACE:",
			value: T("layout.account.access.workspace", { defaultValue: "LAND" })
		},
		{
			key: "EDITOR:",
			value: T("layout.account.access.editor", { defaultValue: "NOT CONNECTED" }),
			note: T("layout.account.access.editorNote", { defaultValue: "A connection this page does not make" })
		},
		{
			key: "SIGNED IN:",
			value: T("layout.account.access.state", { defaultValue: "CLIENT STATE" }),
			note: T("layout.account.access.stateNote", { defaultValue: "The island answers; the page does not claim it" })
		},
		{
			key: "SOURCE:",
			value: T("layout.account.access.source", { defaultValue: "AUTH0 SESSION" }),
			code: true
		}
	],
	aside: {
		index: "ASIDE_01",
		label: T("layout.account.aside.label", { defaultValue: "/ WHAT THE PROFILE DOES NOT CARRY" }),
		line: T("layout.account.aside.line", { defaultValue: "Three facts about this workspace live on other records; this one does not restate them." }),
		rows: [
			{
				key: "DOWNLOADS:",
				value: T("layout.account.aside.downloads", { defaultValue: "NOT A PROFILE FACT" }),
				note: "/Download"
			},
			{
				key: "BILLING:",
				value: T("layout.account.aside.billing", { defaultValue: "NOT RECORDED" }),
				note: "No tier is priced yet"
			},
			{
				key: "EDITOR LINK:",
				value: T("layout.account.aside.editor", { defaultValue: "NOT CONNECTED" }),
				note: "The dashboard's editor region"
			}
		],
		source: T("layout.account.aside.source", { defaultValue: "SOURCE: ACCOUNT SURFACE" })
	},
	denied: {
		statement: T("layout.account.denied.statement", { defaultValue: "This workspace holds a profile: the fields, the session it came from, and the editor connection it can reach." }),
		cause: T("layout.account.denied.cause", { defaultValue: "Signed out. The rail, the access ledger and the disclosure print for every reader; the profile itself is the island's, and it answers only with a session." }),
		next: {
			label: T("layout.account.denied.next", { defaultValue: "SIGN IN" }),
			href: "/Account/SignIn"
		}
	}
});
// Source/pages/Account/index.astro
var Account_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const T = GetI18n();
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_COyUGpTd.mjs");
	const MetaTitle = T("meta.account.title", { defaultValue: "Account | Code Editor Land" });
	const MetaDescription = T("meta.account.description", { defaultValue: "Manage your Code Editor Land account and profile." });
	const Frame = AuthFrameFor("account", T);
	const Crumbs = AccountCrumbs(T);
	const Declarations = [
		{
			key: "RECORD",
			value: "PROFILE"
		},
		{
			key: "ROUTE",
			value: Astro.url.pathname.toUpperCase()
		},
		{
			key: "SOURCE",
			value: "AUTH0"
		},
		{
			key: "AS OF",
			value: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}
	];
	const Workspace = AccountWorkspace(T);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# WORKSPACE_03",
			"label": "THE ACCOUNT"
		}, {
			"default": ($$result) => renderTemplate`    ${renderComponent($$result, "ShellPanes", $$ShellPanes, {
				"ratio": "7/5",
				"primary": {
					mark: "# PROFILE_01",
					label: T("layout.account.pane.profile", { defaultValue: "PROFILE" }),
					meta: "AUTH0"
				},
				"secondary": {
					mark: "# ACCESS_01",
					label: T("layout.account.pane.access", { defaultValue: "ACCESS" }),
					meta: `${Workspace.access.length}\u2001ROWS`
				},
				"drawer": {
					label: T("layout.account.drawer", { defaultValue: "WHAT THE PROFILE DOES NOT CARRY" }),
					note: T("layout.account.drawer.note", { defaultValue: "FOLDED" })
				}
			}, {
				"primary": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div> ${renderComponent($$result, "DynamicAccountProfile", DynamicAccountProfile_default, {
					"client:load": true,
					"Domain": Auth0Domain,
					"ClientIdentifier": Auth0ClientIdentifier,
					"client:component-hydration": "load",
					"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
					"client:component-export": "default"
				})} </div>`,
				"secondary": ($$result) => renderTemplate`<div> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
					"register": RegisterOf(Workspace.accessLabel, Workspace.access),
					"rows": Workspace.access,
					"columns": 1
				})} </div>`,
				"drawer": ($$result) => renderTemplate`<div> ${renderComponent($$result, "RecordAside", $$RecordAside, { "aside": Workspace.aside })} </div>`
			})}  `,
			"head": ($$result) => renderTemplate`${renderComponent($$result, "Trail", $$Trail, {
				"slot": "head",
				"trail": Crumbs
			})}${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
				"slot": "head",
				"index": "# ACCOUNT_01",
				"title": Frame.heading,
				"proposition": Frame.sentence,
				"declarations": Declarations,
				"life": SurfaceLives.ACCOUNT.term,
				"lifeNote": SurfaceLives.ACCOUNT.source,
				"rows": [
					{
						key: "RECORD:",
						value: "PROFILE"
					},
					{
						key: "SESSION:",
						value: "AUTH0"
					},
					{
						key: "ROUTES:",
						value: String(Workspace.rail.length)
					},
					{
						key: "ALTERNATE:",
						value: Frame.action.label
					}
				]
			})}`,
			"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
				"slot": "rail",
				"label": Workspace.railLabel,
				"count": Workspace.rail.length,
				"items": Workspace.rail,
				"current": "page",
				"foot": {
					label: T("layout.account.rail.foot", { defaultValue: "ALL DESTINATIONS" }),
					href: "/Contents"
				}
			})}`,
			"foot": ($$result) => renderTemplate`${renderComponent($$result, "ShellState", $$ShellState, {
				"kind": "denied",
				"index": "ACCESS / 00",
				"statement": Workspace.denied.statement,
				"cause": Workspace.denied.cause,
				"next": Workspace.denied.next,
				"note": "SOURCE: AUTH0 SESSION",
				"slot": "foot"
			})}`
		})} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "DynamicAuthHeader", DynamicAuthHeader_default, {
			"client:load": true,
			"slot": "Header",
			"Domain": Auth0Domain,
			"ClientIdentifier": Auth0ClientIdentifier,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
			"client:component-export": "default"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro";
var $$url = "/Account";
// \0virtual:astro:page:Source/pages/Account/index@_@astro
var page = () => Account_exports;
export { page };
