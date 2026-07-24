import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, o as ThemeImage, t as $$Base } from "./Base_DhBMo2T1.mjs";
import "./Map_Bsl_SrZK.mjs";
import { s as Button } from "./Header_wkpfoPSt.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_Dl2IwPJE.mjs";
import { t as Skeleton } from "./Skeleton_Ch27QRaB.mjs";
import { t as DynamicAuthHeader_default } from "./DynamicAuthHeader_Cxc3MMMN.mjs";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff, Lock, MailCheck, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
//#region Source/Component/Dynamic/DynamicAccountProfile.tsx
var Pii = ({ children, visible }) => /* @__PURE__ */ jsx("span", {
	className: `transition-all duration-200 ${visible ? "" : "select-none blur-sm"}`,
	children
});
var SourceBadge = ({ label, icon }) => /* @__PURE__ */ jsxs("span", {
	className: "inline-flex items-center gap-1 bg-mute px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
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
						className: "inline-flex items-center border border-blue-200 bg-blue-50 px-1.5 py-0 font-mono text-[10px] text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
						children: "Editable"
					}) : /* @__PURE__ */ jsx("span", {
						className: "inline-flex items-center bg-mute px-1.5 py-0 font-mono text-[10px] text-muted-foreground",
						children: "Read-only"
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-1 text-sm text-muted-foreground",
				children: value
			})]
		})
	}), editHint && /* @__PURE__ */ jsxs("p", {
		className: "mt-1.5 text-sm text-muted-foreground",
		children: [editHint, editHref && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("a", {
			href: editHref,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "text-primary hover:underline",
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
			className: "font-semibold",
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
		Border: "border-blue-200 dark:border-blue-800",
		Background: "bg-blue-50 dark:bg-blue-950",
		Text: "text-blue-700 dark:text-blue-300",
		Dot: "bg-blue-500"
	},
	Provider: {
		Border: "border-purple-200 dark:border-purple-800",
		Background: "bg-purple-50 dark:bg-purple-950",
		Text: "text-purple-700 dark:text-purple-300",
		Dot: "bg-purple-500"
	},
	LocalFirst: {
		Border: "border-orange-200 dark:border-orange-800",
		Background: "bg-orange-50 dark:bg-orange-950",
		Text: "text-orange-700 dark:text-orange-300",
		Dot: "bg-orange-500"
	},
	Enterprise: {
		Border: "border-green-200 dark:border-green-800",
		Background: "bg-green-50 dark:bg-green-950",
		Text: "text-green-700 dark:text-green-300",
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
				children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-20 w-20 shrink-0" }), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 space-y-3",
					children: [
						/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-64" }),
						/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" })
					]
				})]
			}),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" })
		]
	});
	if (AuthError) return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl space-y-4 px-4 py-16",
		role: "alert",
		"aria-live": "polite",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "text-destructive",
			children: [
				T("error", { defaultValue: "Authentication error" }),
				":",
				" ",
				AuthError.message
			]
		}), /* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: () => window.location.reload(),
			children: T("tryAgain", { defaultValue: "Try again" })
		})]
	});
	if (!IsAuthenticated || !User) return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl space-y-4 px-4 py-16 text-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: T("notSignedIn", { defaultValue: "Sign in to manage your account." })
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => {
				try {
					sessionStorage.setItem("auth0_return_to", window.location.pathname);
				} catch {}
				Login();
			},
			className: "StaccatoButton inline-flex items-center justify-center bg-primary px-6 py-2 font-medium text-primary-fg transition-all hover:opacity-90",
			children: T("signInButton", { defaultValue: "Sign In" })
		})]
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
							className: "h-20 w-20 flat object-cover"
						}) : /* @__PURE__ */ jsx("div", {
							className: "flex h-20 w-20 items-center justify-center bg-mute text-2xl font-bold text-muted-foreground",
							children: DisplayName.slice(0, 2).toUpperCase()
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-bold",
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
										className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
										children: [/* @__PURE__ */ jsx(MailCheck, {
											className: "h-2.5 w-2.5",
											"aria-hidden": "true"
										}), "Verified"]
									}),
									User.email_verified === false && /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 text-[10px] font-medium text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
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
											className: `h-1.5 w-1.5 flat ${TierColor.Dot}`,
											"aria-hidden": "true"
										})
									]
								}), ProviderIcon ? /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 bg-mute px-2 py-0.5 text-sm font-medium text-muted-foreground",
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
									className: "inline-flex items-center bg-mute px-2 py-0.5 text-sm font-medium text-muted-foreground",
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
				className: "border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
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
					className: "mt-1 pl-6 text-sm text-green-600 dark:text-green-400",
					children: "Profile fields are managed by your organization's identity provider. Contact your IT administrator to update them."
				})]
			}),
			User.email_verified === false && /* @__PURE__ */ jsx("div", {
				className: "border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
				children: T("emailNotVerified", { defaultValue: "Email not verified. Check your inbox." })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-4 border border-[var(--Border)] bg-mute px-5 py-4",
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
						className: "font-semibold",
						children: T("profileSection", { defaultValue: "Profile Fields" })
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm text-muted-foreground",
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
										className: "inline-flex items-center gap-1 border border-green-200 bg-green-50 px-1.5 py-0 font-mono text-[10px] text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
										children: [/* @__PURE__ */ jsx(MailCheck, { className: "h-2.5 w-2.5" }), "verified"]
									}),
									User.email_verified === false && /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center border border-yellow-200 bg-yellow-50 px-1.5 py-0 font-mono text-[10px] text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
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
										className: "h-8 w-8 flat object-cover"
									})
								}), /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: /* @__PURE__ */ jsxs("span", {
										className: "font-mono text-sm text-muted-foreground",
										children: [User.picture.split("/").pop()?.slice(0, 24), "…"]
									})
								})]
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
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
										className: `h-1 w-1 flat ${TierColor.Dot}`,
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
						className: "font-semibold",
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
												className: "h-3.5 w-3.5 text-muted-foreground",
												"aria-hidden": "true"
											}),
											"Password",
											/* @__PURE__ */ jsx(SourceBadge, { label: "Auth0" }),
											/* @__PURE__ */ jsx("span", {
												className: "inline-flex items-center border border-blue-200 bg-blue-50 px-1.5 py-0 font-mono text-[10px] text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
												children: "Editable"
											})
										]
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: "A reset link is sent to your email. You will not be signed out until you set a new password."
									})] }),
									PasswordResetState === "idle" && /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: HandlePasswordReset,
										className: "StaccatoButton shrink-0 bg-card px-3 py-1.5 text-sm font-medium transition-all hover:bg-secondary",
										children: "Send Reset Email"
									}),
									PasswordResetState === "sending" && /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-sm text-muted-foreground",
										children: "Sending…"
									}),
									PasswordResetState === "sent" && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex shrink-0 items-center gap-1 border border-green-200 bg-green-50 px-2 py-1 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
										children: [/* @__PURE__ */ jsx(MailCheck, { className: "h-3 w-3" }), "Email sent"]
									}),
									PasswordResetState === "error" && /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-sm text-red-600 dark:text-red-400",
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
										className: "h-3.5 w-3.5 text-muted-foreground",
										"aria-hidden": "true"
									}),
									"Password",
									/* @__PURE__ */ jsx(SourceBadge, {
										label: ProviderLabel,
										icon: ProviderIcon
									}),
									/* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center bg-mute px-1.5 py-0 font-mono text-[10px] text-muted-foreground",
										children: "Not applicable"
									})
								]
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-muted-foreground",
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
										className: "text-primary hover:underline",
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
										className: "h-3.5 w-3.5 text-muted-foreground",
										"aria-hidden": "true"
									}),
									"Active Session",
									/* @__PURE__ */ jsx(SourceBadge, { label: "Auth0" }),
									/* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center bg-mute px-1.5 py-0 font-mono text-[10px] text-muted-foreground",
										children: "Read-only"
									})
								]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
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
						className: "font-semibold",
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
						className: "StaccatoButton inline-flex w-full items-center justify-center border border-red-200 bg-card px-4 py-2 font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950",
						children: T("signOut", { defaultValue: "Sign Out" })
					})]
				})]
			})
		]
	});
};
//#endregion
//#region Source/pages/Account/index.astro
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
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_CyM7bDBq.mjs");
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": T("meta.account.title", { defaultValue: "Account | Code Editor Land" }),
		"Description": T("meta.account.description", { defaultValue: "Manage your Code Editor Land account and profile." }),
		"Url": Astro.url.href,
		"lang": "en"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "DynamicAuthHeader", DynamicAuthHeader_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
		"client:component-export": "default"
	})} ${maybeRenderHead($$result)}<main id="main-content"> <div class="container mx-auto max-w-5xl px-4"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="pt-6"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", { defaultValue: "Home" })}</a> </li> <li class="mx-2">/</li> <li> <a href="/Dashboard" class="transition-colors hover:text-foreground">${T("common.breadcrumb.dashboard", { defaultValue: "Dashboard" })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.breadcrumb.account", { defaultValue: "Account" })}</span> </li> </ol> </nav> </div> ${renderComponent($$result, "DynamicAccountProfile", DynamicAccountProfile_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAccountProfile.tsx",
		"client:component-export": "default"
	})} </main> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/index.astro";
var $$url = "/Account";
//#endregion
//#region \0virtual:astro:page:Source/pages/Account/index@_@astro
var page = () => Account_exports;
//#endregion
export { page };
