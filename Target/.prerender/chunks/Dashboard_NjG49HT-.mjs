import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { M as createAstro, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { n as GetI18n, o as ThemeImage, t as $$Base } from "./Base_Ch2j7K-P.mjs";
import "./Map_Bsl_SrZK.mjs";
import { s as Button } from "./Header_DjWYNAAS.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_Dl2IwPJE.mjs";
import { t as Skeleton } from "./Skeleton_CF2r5dxS.mjs";
import { t as DynamicAuthHeader_default } from "./DynamicAuthHeader_D3FijYCp.mjs";
import { i as Requests } from "./Request_TjP0ZRRO.mjs";
import { t as RichText } from "./RichText_EO81V8p4.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Building2, CircleCheck, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
//#region Source/Component/Dynamic/DynamicDashboardUser.tsx
var Pii = ({ children, visible }) => /* @__PURE__ */ jsx("span", {
	className: `transition-all duration-200 ${visible ? "" : "select-none blur-sm"}`,
	children
});
/**
* Auth0-aware dashboard user panel.
* Reads Auth0 session state and populates the Account card
* with email, username, member since, avatar, verified badge,
* provider label, and sign out button.
*
* Also bridges Auth0 claims into the legacy localStorage format
* so any remaining legacy code can read `current_user`.
*
* Sign-out clears Auth0 session, posts Auth:Clear to ServiceWorker,
* and removes legacy localStorage/cookie tokens.
*
* For Okta enterprise users, Auth0 normalizes claims:
* - sub = "okta|<okta-user-id>"
* - org_id (if orgs enabled)
* - custom claims via Auth0 Actions/Rules
*/
var DynamicDashboardUser_default = ({ Domain, ClientIdentifier }) => /* @__PURE__ */ jsx(Auth0Provider_default, {
	Children: /* @__PURE__ */ jsx(DashboardUserInner, {}),
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
var DashboardUserInner = () => {
	const { isLoading: IsLoading, isAuthenticated: IsAuthenticated, user: User, error: AuthError, loginWithRedirect: Login, logout: Auth0Logout } = useAuth0();
	const { t: T } = useTranslation("common");
	const [PIIVisible, SetPIIVisible] = useState(false);
	if (IsAuthenticated && User) try {
		const LegacyUser = {
			id: User.sub || "",
			email: User.email || "",
			username: User.nickname || User.email?.split("@")[0] || "",
			displayName: User.name || "",
			avatarUrl: User.picture || "",
			provider: DetectProvider(User.sub),
			emailVerified: User.email_verified || false,
			createdAt: User.updated_at || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: User.updated_at || (/* @__PURE__ */ new Date()).toISOString()
		};
		localStorage.setItem("current_user", JSON.stringify(LegacyUser));
	} catch {}
	const HandleSignOut = () => {
		ClearAuthFromServiceWorker();
		ClearLegacyTokens();
		Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
	};
	if (IsLoading) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		"aria-label": T("dashboard.loading", { defaultValue: "Loading account..." }),
		children: [
			/* @__PURE__ */ jsx(Skeleton, { className: "mx-auto h-12 w-12" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/5" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/5" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/5" })
		]
	});
	if (AuthError) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		role: "alert",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-destructive",
				children: T("dashboard.error", { defaultValue: "Could not load your account. Please refresh." })
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: AuthError.message
			}),
			/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => window.location.reload(),
				children: T("tryAgain", { defaultValue: "Try again" })
			})
		]
	});
	if (!IsAuthenticated || !User) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: T("dashboard.account.notSignedIn", { defaultValue: "Sign in to see your account details." })
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => Login(),
			className: "StaccatoButton inline-flex items-center justify-center bg-primary px-4 py-1.5 font-medium text-primary-fg transition-all hover:opacity-90",
			children: T("dashboard.account.signInButton", { defaultValue: "Sign In" })
		})]
	});
	const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
	const MemberSince = User.updated_at ? new Date(User.updated_at).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long"
	}) : "--";
	const ProviderLabel = DetectProviderLabel(User.sub);
	const ProviderIcon = DetectProviderIcon(User.sub);
	const IsEnterprise = IsEnterpriseUser(User.sub);
	const OrganizationName = User["org_name"];
	const OrganizationIdentifier = User["org_id"];
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => SetPIIVisible((v) => !v),
					"aria-label": PIIVisible ? "Hide personal data" : "Show personal data",
					className: "text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
					children: PIIVisible ? /* @__PURE__ */ jsx(EyeOff, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ jsx(Eye, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `flex justify-center pb-2 transition-all duration-200 ${PIIVisible ? "" : "blur-sm"}`,
				children: [User.picture ? /* @__PURE__ */ jsx("img", {
					src: User.picture,
					alt: `${DisplayName} avatar`,
					title: DisplayName,
					width: "48",
					height: "48",
					loading: "lazy",
					className: "h-12 w-12 flat",
					onError: (Event) => {
						Event.target.style.display = "none";
						const Fallback = Event.target.nextElementSibling;
						if (Fallback) Fallback.style.display = "flex";
					}
				}) : null, /* @__PURE__ */ jsx("div", {
					className: `${User.picture ? "hidden" : "flex"} h-12 w-12 items-center justify-center flat bg-mute text-lg font-bold text-muted-foreground`,
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: DisplayName.slice(0, 1).toUpperCase()
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.nameLabel", { defaultValue: "Name" })
				}), /* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: DisplayName
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.emailLabel", { defaultValue: "Email" })
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: /* @__PURE__ */ jsx(Pii, {
							visible: PIIVisible,
							children: User.email || "--"
						})
					}), User.email_verified === true && /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
						title: T("dashboard.account.emailVerifiedTitle", { defaultValue: "Email verified" }),
						children: [
							T("dashboard.account.emailVerifiedBadge", { defaultValue: "Verified" }),
							" ",
							/* @__PURE__ */ jsx(CircleCheck, {
								"aria-hidden": "true",
								className: "inline h-4 w-4 align-[-3px] text-grpc"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.planLabel", { defaultValue: "Plan" })
				}), /* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: IsEnterprise ? T("dashboard.account.planEnterprise", { defaultValue: "Enterprise" }) : T("dashboard.account.planFree", { defaultValue: "Free" })
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.providerLabel", { defaultValue: "Provider" })
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1.5 text-muted-foreground",
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
				})]
			}),
			IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.organizationLabel", { defaultValue: "Organization" })
				}), /* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: OrganizationName || OrganizationIdentifier
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: T("dashboard.account.memberSinceLabel", { defaultValue: "Member Since" })
				}), /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: MemberSince
					})
				})]
			}),
			IsEnterprise && /* @__PURE__ */ jsxs("div", {
				className: "mt-2 border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
				children: [
					T("dashboard.account.enterpriseSSO", { defaultValue: "Enterprise SSO active" }),
					" ",
					/* @__PURE__ */ jsx(Building2, {
						"aria-hidden": "true",
						className: "inline h-4 w-4 align-[-3px]"
					})
				]
			}),
			User.email_verified === false && /* @__PURE__ */ jsxs("div", {
				className: "mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
				children: [
					T("dashboard.account.emailNotVerified", { defaultValue: "Email not verified. Check your inbox." }),
					" ",
					/* @__PURE__ */ jsx(TriangleAlert, {
						"aria-hidden": "true",
						className: "inline h-4 w-4 align-[-3px]"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ jsx("a", {
					href: "/Account",
					className: "StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium transition-all hover:bg-secondary",
					children: T("dashboard.account.manageButton", { defaultValue: "Manage" })
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: HandleSignOut,
					className: "StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950",
					children: T("dashboard.account.signOutButton", { defaultValue: "Sign Out" })
				})]
			})
		]
	});
};
var DetectProvider = (Sub) => {
	if (!Sub) return "email";
	if (Sub.startsWith("github|")) return "github";
	if (Sub.startsWith("google-oauth2|")) return "google";
	if (Sub.startsWith("gitlab|")) return "gitlab";
	if (Sub.startsWith("okta|")) return "okta";
	return "email";
};
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
var IsEnterpriseUser = (Sub) => {
	if (!Sub) return false;
	return Sub.startsWith("okta|") || Sub.startsWith("samlp|") || Sub.startsWith("waad|");
};
//#endregion
//#region Source/Component/Dynamic/DynamicLocalFirstScan.tsx
var SCAN_TIMEOUT = 3e3;
var DAEMON_ENDPOINT = [{
	Port: 7979,
	URL: "ws://localhost:7979"
}, {
	Port: 7878,
	URL: "ws://localhost:7878"
}];
var ProbeDaemon = (URL, Port, TimeoutMillisecond) => new Promise((Resolve) => {
	try {
		const Socket = new WebSocket(URL);
		const Timer = setTimeout(() => {
			Socket.close();
			Resolve(null);
		}, TimeoutMillisecond);
		Socket.onopen = () => {
			clearTimeout(Timer);
			Socket.send(JSON.stringify({ Type: "Version" }));
			const VersionTimer = setTimeout(() => {
				Socket.close();
				Resolve({
					Port,
					Version: "unknown"
				});
			}, 500);
			Socket.onmessage = (Event) => {
				clearTimeout(VersionTimer);
				try {
					const Data = JSON.parse(Event.data);
					Socket.close();
					Resolve({
						Port,
						Version: Data.Version || "unknown"
					});
				} catch {
					Socket.close();
					Resolve({
						Port,
						Version: "unknown"
					});
				}
			};
		};
		Socket.onerror = () => {
			clearTimeout(Timer);
			Socket.close();
			Resolve(null);
		};
	} catch {
		Resolve(null);
	}
});
var ScanAnimation = () => /* @__PURE__ */ jsxs("div", {
	className: "flex items-center gap-3",
	children: [/* @__PURE__ */ jsxs("div", {
		className: "flex gap-1",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "inline-block h-2 w-2 animate-pulse flat bg-orange-400",
				style: { animationDelay: "0ms" }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "inline-block h-2 w-2 animate-pulse flat bg-orange-400",
				style: { animationDelay: "150ms" }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "inline-block h-2 w-2 animate-pulse flat bg-orange-400",
				style: { animationDelay: "300ms" }
			})
		]
	}), /* @__PURE__ */ jsx("span", {
		className: "text-muted-foreground",
		children: "Scanning for Air Daemon..."
	})]
});
var DynamicLocalFirstScan_default = ({ Domain, ClientIdentifier }) => /* @__PURE__ */ jsx(LocalFirstScanInner, {});
var LocalFirstScanInner = () => {
	const { t: T } = useTranslation("common");
	const [Status, SetStatus] = useState("Scanning");
	const [DaemonDetail, SetDaemonDetail] = useState(null);
	const [ScanProgress, SetScanProgress] = useState(0);
	useEffect(() => {
		let Cancelled = false;
		const RunScan = async () => {
			SetStatus("Scanning");
			SetScanProgress(0);
			for (let Index = 0; Index < DAEMON_ENDPOINT.length; Index++) {
				if (Cancelled) return;
				const Endpoint = DAEMON_ENDPOINT[Index];
				if (!Endpoint) continue;
				SetScanProgress(Math.round((Index + 1) / DAEMON_ENDPOINT.length * 100));
				const Result = await ProbeDaemon(Endpoint.URL, Endpoint.Port, SCAN_TIMEOUT);
				if (Result && !Cancelled) {
					SetDaemonDetail(Result);
					SetStatus("Connected");
					return;
				}
			}
			if (!Cancelled) {
				SetScanProgress(100);
				SetStatus("NotFound");
			}
		};
		RunScan();
		return () => {
			Cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "StaccatoCard StaccatoBorderShimmer bg-card p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx(ThemeImage, {
				src: "/Asset/Logo/Glyph/Land.svg",
				alt: "Land",
				width: 48,
				height: 48
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-medium",
								children: T("dashboard.localFirst.title", { defaultValue: "Air Daemon" })
							}),
							Status === "Scanning" && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
								children: [
									T("dashboard.localFirst.scanning", { defaultValue: "Scanning" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "h-1.5 w-1.5 animate-pulse flat bg-orange-500",
										"aria-hidden": "true"
									})
								]
							}),
							Status === "Connected" && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center border border-green-200 bg-green-50 px-2.5 py-0.5 font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
								children: [
									T("dashboard.localFirst.connected", { defaultValue: "Connected" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "h-1.5 w-1.5 flat bg-green-500",
										"aria-hidden": "true"
									})
								]
							}),
							Status === "NotFound" && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center bg-mute px-2.5 py-0.5 font-medium text-muted-foreground",
								children: [
									T("dashboard.localFirst.notFound", { defaultValue: "Not Detected" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "h-1.5 w-1.5 flat bg-gray-400",
										"aria-hidden": "true"
									})
								]
							})
						]
					}),
					Status === "Scanning" && /* @__PURE__ */ jsxs("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ jsx(ScanAnimation, {}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-2 h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-orange-400 transition-all duration-500",
									style: { width: `${ScanProgress}%` }
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: T("dashboard.localFirst.scanDescription", { defaultValue: "Checking ws://localhost:7979 and ws://localhost:7878" })
							})
						]
					}),
					Status === "Connected" && DaemonDetail && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-2",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-green-700 dark:text-green-400",
								children: T("dashboard.localFirst.connectedMessage", { defaultValue: "Connected to Air Daemon" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-3 text-muted-foreground",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-medium",
											children: T("dashboard.localFirst.portLabel", { defaultValue: "Port" })
										}), /* @__PURE__ */ jsx("code", { children: DaemonDetail.Port })]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-medium",
											children: T("dashboard.localFirst.versionLabel", { defaultValue: "Version" })
										}), /* @__PURE__ */ jsx("code", { children: DaemonDetail.Version })]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-medium",
											children: T("dashboard.localFirst.protocolLabel", { defaultValue: "Protocol" })
										}), /* @__PURE__ */ jsx("code", { children: "WebSocket" })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
										children: [
											"Peer-to-peer design",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "h-1 w-1 flat bg-blue-500",
												"aria-hidden": "true"
											})
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
										children: [
											"Local-first",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "h-1 w-1 flat bg-blue-500",
												"aria-hidden": "true"
											})
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
										children: [
											"No cloud required",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "h-1 w-1 flat bg-blue-500",
												"aria-hidden": "true"
											})
										]
									})
								]
							})
						]
					}),
					Status === "NotFound" && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: T("dashboard.localFirst.notFoundMessage", { defaultValue: "Air Daemon not detected. Launch Code Editor Land to enable local-first features." })
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "/Download",
								className: "StaccatoButton inline-flex items-center justify-center border border-orange-300 bg-orange-50 px-4 py-2 font-medium text-orange-700 transition-all hover:bg-orange-100 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900",
								children: [T("dashboard.localFirst.downloadButton", { defaultValue: "Download Land" }), /* @__PURE__ */ jsx("span", {
									className: "InlineSeparator",
									children: "↓"
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => window.location.reload(),
								className: "StaccatoButton inline-flex items-center justify-center bg-card px-4 py-2 font-medium transition-all hover:bg-secondary",
								children: T("dashboard.localFirst.retryButton", { defaultValue: "Retry Scan" })
							})]
						})]
					})
				]
			})]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicPrivacyRequests.tsx
/**
* Privacy & Data Rights directory for the Dashboard.
*
* Each card links to a dedicated /Contact/<Slug> form page
* where the user fills out a structured request with their
* income code, pre-filled Auth0 data, and three delivery options.
*
* No mailto: links are generated here - all email composition
* happens on the dedicated form pages to ensure plain-text
* formatting and proper income code tagging.
*/
var DynamicPrivacyRequests_default = () => {
	const GdprRights = [
		Requests.REACH,
		Requests.AMEND,
		Requests.PAUSE,
		Requests.QUERY,
		Requests.LEAVE,
		Requests.LODGE
	];
	const SupportChannels = [
		Requests.SCOUT,
		Requests.GUARD,
		Requests.CLAIM,
		Requests.LEGAL
	];
	const BadgeColor = (Article) => Article ? "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300" : "bg-mute text-muted-foreground";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-12",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "mb-2 font-mono text-sm font-semibold",
					children: "Your Rights Under GDPR"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-6 text-muted-foreground",
					children: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: GdprRights.map((Right) => /* @__PURE__ */ jsxs("a", {
						href: `/Contact/${Right.Slug.charAt(0).toUpperCase()}${Right.Slug.slice(1)}`,
						className: "StaccatoCard StaccatoBorderShimmer flex flex-col bg-card p-5 transition-all hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-3 flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-medium leading-snug",
									children: Right.Title
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex shrink-0 flex-col items-end gap-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: `px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${BadgeColor(Right.Article)}`,
										children: Right.Code
									}), Right.Article && /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[9px] text-muted-foreground",
										children: Right.Article
									})]
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-4 flex-1 text-sm leading-relaxed text-muted-foreground",
								children: Right.Subtitle
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "mt-auto inline-flex items-center text-sm font-medium text-primary",
								children: [
									"Open form",
									" ",
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "ml-1",
										children: "→"
									})
								]
							})
						]
					}, Right.Code))
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "mb-2 font-mono text-sm font-semibold",
					children: "Support & Assistance"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-6 text-muted-foreground",
					children: "Direct channels for technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
					children: SupportChannels.map((Channel) => /* @__PURE__ */ jsxs("a", {
						href: `/Contact/${Channel.Slug.charAt(0).toUpperCase()}${Channel.Slug.slice(1)}`,
						className: "StaccatoCard StaccatoBorderShimmer flex flex-col bg-card p-5 transition-all hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-2 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-medium",
									children: Channel.Title
								}), /* @__PURE__ */ jsx("span", {
									className: "shrink-0 font-mono text-[10px] font-bold tracking-widest text-muted-foreground",
									children: Channel.Code
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-4 flex-1 text-sm leading-relaxed text-muted-foreground",
								children: Channel.Subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-auto font-mono text-sm text-muted-foreground",
								children: Channel.To
							})
						]
					}, Channel.Code))
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "mb-2 font-mono text-sm font-semibold",
					children: "Delete Account"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-6 text-muted-foreground",
					children: "Permanently delete your account and all associated personal data under GDPR Article 17. This action is irreversible."
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/Contact/Erase",
					className: "StaccatoCard block border border-red-200 bg-card p-6 transition-all hover:bg-red-50 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 dark:border-red-800 dark:hover:bg-red-950",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-start gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 shrink-0 items-center justify-center border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400",
								children: /* @__PURE__ */ jsxs("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ jsx("path", { d: "M3 6h18" }),
										/* @__PURE__ */ jsx("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
										/* @__PURE__ */ jsx("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
										/* @__PURE__ */ jsx("line", {
											x1: "10",
											y1: "11",
											x2: "10",
											y2: "17"
										}),
										/* @__PURE__ */ jsx("line", {
											x1: "14",
											y1: "11",
											x2: "14",
											y2: "17"
										})
									]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mb-1 flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "font-semibold text-red-700 dark:text-red-400",
										children: "Permanent Account Deletion"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[10px] font-bold tracking-widest text-red-400 dark:text-red-500",
										children: "ERASE"
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Opens a structured erasure request form. The generated email includes income code [ERASE] and covers Auth0, PostHog, Cloudflare, and all backup copies - citing GDPR Art. 17 with a 30-day response requirement."
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "shrink-0 font-medium text-red-600 dark:text-red-400",
								children: "→"
							})
						]
					})
				})
			] })
		]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicRichText.tsx
/**
* Thin client island that renders a translated string through the RichText
* parser. Use this in Astro pages where translations contain `\n\n` paragraph
* breaks, inline code (backticks), or other RichText markup.
*
* Usage in .astro:
* <DynamicRichText client:load Text={T("some.key")} ClassName="text-muted-foreground" />
*/
var DynamicRichText = (Props) => /* @__PURE__ */ jsx(RichText, { ...Props });
//#endregion
//#region Source/pages/Dashboard.astro
var Dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	const T = GetI18n();
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_CyM7bDBq.mjs");
	const IsLocalMode = Astro.url.searchParams.get("mode") === "local";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": T("meta.dashboard.title", { defaultValue: "Dashboard | Code Editor Land" }),
		"Description": T("meta.dashboard.description", { defaultValue: "Manage your account, download, and setting.\nYour Code Editor Land dashboard." }),
		"Url": Astro.url.href,
		"lang": "en"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "DynamicAuthHeader", DynamicAuthHeader_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicAuthHeader.tsx",
		"client:component-export": "default"
	})} ${maybeRenderHead($$result)}<main id="main-content"> <div class="container mx-auto max-w-5xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", { defaultValue: "Home" })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.dashboard.breadcrumbLabel", { defaultValue: "Dashboard" })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12" aria-label="Dashboard page header"> <div class="mb-4 flex items-center gap-4"> <picture> <source srcset="/Asset/Dark/Logo/Glyph/Land.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="Code Editor Land logo" title="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="40" height="40"> </picture> <div class="flex flex-col"> <h1 class="text-4xl font-bold tracking-tight"> ${T("common.dashboard.pageTitle", { defaultValue: "Dashboard" })} </h1> <p class="text-muted"> ${T("common.dashboard.pageSubtitle", { defaultValue: "Your Land account, downloads, and editor connection." })} </p> </div> </div> <div class="flex flex-wrap items-center gap-3 text-muted-foreground"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Telemetry Feature Gated${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
CC0 Licensed
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Signing Planned
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "azure",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Mountain Workbench${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpineIPC)" aria-hidden="true"></span> ` })} </div> </header> <!-- Dashboard Grid --> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Account Info Card --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.account.heading", { defaultValue: "Account" })} </h2> ${renderComponent($$result, "DynamicDashboardUser", DynamicDashboardUser_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
		"client:component-export": "default"
	})} </div> <!-- Downloads Card --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.downloads.heading", { defaultValue: "Downloads" })} </h2> <a href="/Download" class="StaccatoButton h- mb-3 inline-flex items-center justify-center bg-primary px-4 font-medium text-primary-fg transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T("common.dashboard.downloads.goButton", { defaultValue: "Go to Downloads" })} </a> <p class="text-muted-foreground"> ${T("common.dashboard.downloads.description", { defaultValue: "Get the latest Land build for your platform. Native on macOS, Windows, and Linux." })} </p> </div> <!-- Quick Links Card --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <h2 class="mb-4 text-lg font-semibold"> ${T("common.dashboard.quickLinks.heading", { defaultValue: "Quick Links" })} </h2> <ul class="space-y-2"> <li> <a href="/Doc" class="text-primary hover:underline"> ${T("common.dashboard.quickLinks.docs", { defaultValue: "Documentation" })} </a> </li> <li> <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline"> ${T("common.dashboard.quickLinks.reportIssue", { defaultValue: "Report an Issue" })} </a> </li> <li> <a href="/Contributing" class="text-primary hover:underline"> ${T("common.dashboard.quickLinks.contribute", { defaultValue: "Contribute" })} </a> </li> </ul> </div> </div> <!-- Telemetry Status Panel --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.telemetry.heading", { defaultValue: "Telemetry Architecture" })} </h2> <div class="StaccatoCard StaccatoBorderShimmer bg-card"> <div class="flex items-center justify-between border-b border-[var(--Border)] px-5 pb-5 pt-8"> <div class="flex-1"> <div class="flex items-center gap-3"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Disabled${" "}<span class="h-2 w-2 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Feature Gated
` })} </div> <h3 class="mt-3 font-medium"> ${T("common.dashboard.telemetry.production.title", { defaultValue: "Feature-gated by build profile." })} </h3> ${renderComponent($$result, "DynamicRichText", DynamicRichText, {
		"client:load": true,
		"Text": T("common.dashboard.telemetry.production.description", { defaultValue: "Telemetry and tracing are behind named Rust feature gates. The build profile determines what is compiled in - nothing is emitted unless a specific feature path is enabled." }),
		"Terms": true,
		"ClassName": "mt-2 text-muted-foreground",
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx",
		"client:component-export": "default"
	})} </div> </div> <div class="flex items-center justify-between border-b border-[var(--Border)] px-5 pb-5 pt-8"> <div class="flex-1"> <div class="flex items-center gap-3"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "amber",
		"shape": "square",
		"style": `--jelly-fill:var(--ExtensionTauriMute);--jelly-label:var(--ExtensionTauriFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Optional${" "}<span class="h-2 w-2 flat" style="background-color:var(--ExtensionTauri)" aria-hidden="true"></span> ` })} </div> <h3 class="mt-3 font-medium"> ${T("common.dashboard.telemetry.otel.title", { defaultValue: "Opt-in OpenTelemetry. Your infrastructure only." })} </h3> ${renderComponent($$result, "DynamicRichText", DynamicRichText, {
		"client:load": true,
		"Text": T("common.dashboard.telemetry.otel.description", { defaultValue: "OpenTelemetry tracing is available in source. Activating it requires an explicit feature flag and a configured endpoint - trace data goes only to infrastructure you control." }),
		"Terms": true,
		"ClassName": "mt-2 text-muted-foreground",
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx",
		"client:component-export": "default"
	})} </div> </div> <div class="px-5 pb-5 pt-8"> <div class="flex items-center gap-3"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "azure",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Active${" "}<span class="h-2 w-2 flat" style="background-color:var(--SpineIPC)" aria-hidden="true"></span> ` })} </div> <h3 class="mt-3 font-medium"> ${T("common.dashboard.telemetry.effect.title", { defaultValue: "Extension host timing. Stays in the process." })} </h3> ${renderComponent($$result, "DynamicRichText", DynamicRichText, {
		"client:load": true,
		"Text": T("common.dashboard.telemetry.effect.description", { defaultValue: "Cocoon has internal timing and service diagnostics for extension-host work. Unless a transport is configured, that data is local process instrumentation." }),
		"Terms": true,
		"ClassName": "mt-2 text-muted-foreground",
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx",
		"client:component-export": "default"
	})} </div> </div> </section> <!-- Build Log Panel (Local-First Only) --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.buildLog.heading", { defaultValue: "Build Configuration" })} </h2> <p class="mb-6 text-muted-foreground"> ${T("common.dashboard.buildLog.subtitle", { defaultValue: "Active build variant and deployment mode.\n\nAvailable via Local-First Air Daemon connection." })} </p> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Active Profile --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T("common.dashboard.buildLog.profile.heading", { defaultValue: "Active Profile" })} </h3> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "azure",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Recommended${" "}<span class="h-2 w-2 flat" style="background-color:var(--SpineIPC)" aria-hidden="true"></span> ` })} </div> <div class="mt-4 space-y-2"> <div class="flex justify-between"> <span class="text-muted-foreground">Profile</span> <code class="">production</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Workbench</span> <span class="font-medium">Mountain</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Features</span> <span>Active Source Path</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Compiler</span> <code class="">esbuild</code> </div> </div> </div> <!-- Deployment Mode --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T("common.dashboard.buildLog.deployment.heading", { defaultValue: "Deployment Mode" })} </h3> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Active${" "}<span class="h-2 w-2 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} </div> <div class="mt-4 space-y-2"> <div class="flex justify-between"> <span class="text-muted-foreground">Mode</span> <span class="font-medium">Production Release</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">NODE_ENV</span> <code class="">production</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">RUST_LOG</span> <code class="">info</code> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Bundle</span> <span>Full</span> </div> </div> </div> <!-- Test Matrix --> <div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold"> ${T("common.dashboard.buildLog.matrix.heading", { defaultValue: "Test Matrix" })} </h3> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
16 Permutations
` })} </div> <div class="mt-4 space-y-2"> <div class="flex justify-between"> <span class="text-muted-foreground">Profiles</span> <span>9 named</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Workbenches</span> <span>5 variants</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Compilers</span> <span>esbuild, OXC</span> </div> <div class="flex justify-between"> <span class="text-muted-foreground">Permutations</span> <span class="font-medium">16 verified</span> </div> </div> </div> </div> </section> <!-- Portal Tier Access --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.portal.heading", { defaultValue: "Authentication Tiers" })} </h2> <p class="mb-6 text-muted-foreground"> ${T("common.dashboard.portal.subtitle", { defaultValue: "Your current authentication method and available tiers." })} </p> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 bg-card p-5 transition-all hover:border-blue-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center flat border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"> <span class="text-lg text-blue-600 dark:text-blue-400" aria-hidden="true">&#9729;</span> </div> <div> <h3 class="font-medium">Cloud</h3> <p class="text-muted-foreground">
Auth0 &#x2001; HTTPS / TLS 1.3
</p> </div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "azure",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Online${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpineIPC)" aria-hidden="true"></span> ` })} </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 bg-card p-5 transition-all hover:border-purple-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center flat border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950"> <span class="text-lg text-purple-600 dark:text-purple-400" aria-hidden="true">&#9831;</span> </div> <div> <h3 class="font-medium">Provider</h3> <p class="text-muted-foreground">
OAuth 2.0 &#x2001; PKCE
</p> </div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineWASMMute);--jelly-label:var(--SpineWASMFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
OAuth${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpineWASM)" aria-hidden="true"></span> ` })} </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 bg-card p-5 transition-all hover:border-orange-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center flat border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950"> <span class="text-lg text-orange-600 dark:text-orange-400" aria-hidden="true">&#9881;</span> </div> <div> <h3 class="font-medium">Local-First</h3> <p class="text-muted-foreground">
mTLS &#x2001; CRDTs &#x2001; WebSocket
</p> </div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineTCPMute);--jelly-label:var(--SpineTCPFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Local${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpineTCP)" aria-hidden="true"></span> ` })} </a> <a href="/Portal" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-4 bg-card p-5 transition-all hover:border-green-300"> <div class="flex h-10 w-10 shrink-0 items-center justify-center flat border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"> <span class="text-lg text-green-600 dark:text-green-400" aria-hidden="true">&#9739;</span> </div> <div> <h3 class="font-medium">Enterprise</h3> <p class="text-muted-foreground">
OIDC &#x2001; SAML 2.0 &#x2001; SCIM
</p> </div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
SSO${" "}<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} </a> </div> </section> <!-- Editor Connection (Local-First) --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.editor.heading", { defaultValue: "Editor Connection" })} </h2> <p class="mb-6 text-muted-foreground"> ${T("common.dashboard.editor.subtitle", { defaultValue: "Connect the website to your running Land editor instance." })} </p> ${IsLocalMode ? renderTemplate`${renderComponent($$result, "DynamicLocalFirstScan", DynamicLocalFirstScan_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
		"client:component-export": "default"
	})}` : renderTemplate`<div class="StaccatoCard StaccatoBorderShimmer bg-card p-6"> <div class="flex items-center gap-4"> <picture> <source srcset="/Asset/Dark/Logo/Glyph/Land.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="48" height="48"> </picture> <div class="flex-1"> <div class="flex items-center gap-3"> <h3 class="font-medium">Air Daemon</h3> <span class="inline-flex items-center bg-mute px-2.5 py-0.5 font-medium text-muted-foreground"> ${T("common.dashboard.editor.status", { defaultValue: "Not Connected" })} ${" "} <span class="h-1.5 w-1.5 flat bg-gray-400" aria-hidden="true"></span> </span> </div> ${renderComponent($$result, "DynamicRichText", DynamicRichText, {
		"client:load": true,
		"Text": T("common.dashboard.editor.description", { defaultValue: "The Air Daemon connects this dashboard to a running Land editor via WebSocket.\n\nLaunch Land to enable real-time build logs, telemetry, and configuration management." }),
		"Terms": true,
		"ClassName": "mt-1 text-muted-foreground",
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicRichText.tsx",
		"client:component-export": "default"
	})} </div> </div> <div class="mt-6 flex flex-wrap items-center gap-3"> <a href="/Dashboard?mode=local" class="StaccatoButton inline-flex items-center justify-center border border-orange-300 bg-orange-50 px-4 py-2 font-medium text-orange-700 transition-all hover:bg-orange-100 focus:outline-2 focus:outline-offset-2 focus:outline-orange-400 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900"> ${T("common.dashboard.editor.scanButton", { defaultValue: "Scan for Daemon" })} <span class="InlineSeparator">&rarr;</span> </a> <a href="/Portal" class="StaccatoButton inline-flex items-center justify-center border border-transparent bg-card px-4 py-2 font-medium transition-all hover:bg-secondary"> ${T("common.dashboard.editor.connect", { defaultValue: "Connect via Portal" })} <span class="InlineSeparator">&rarr;</span> </a> <span class="text-muted-foreground">
mTLS &#x2001; CRDTs &#x2001; WebSocket
									&#x2001; Zero cloud dependency
</span> </div> </div>`} </section> <!-- Partners & Attribution --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.partners.heading", { defaultValue: "Partners & Attribution" })} </h2> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"> <a href="https://github.com/CodeEditorLand" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 bg-card p-4 transition-all hover:border-[var(--Primary)]"> <picture> <source srcset="/Asset/Dark/Logo/Glyph/Land.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="Code Editor Land" src="/Asset/Logo/Glyph/Land.svg" width="32" height="32" class="h-8 w-8"> </picture> <div> <span class="font-medium">Code Editor Land</span> <p class="text-muted-foreground">
Organization &#x2001; GitHub
</p> </div> </a> <a href="https://PlayForm.Cloud" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 bg-card p-4 transition-all hover:border-[var(--Primary)]"> <picture> <source srcset="/Dark/Image/PlayForm.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="PlayForm" src="/Image/PlayForm.svg" width="32" height="32" class="h-8 w-8"> </picture> <div> <span class="font-medium">PlayForm</span> <p class="text-muted-foreground">
Platform &#x2001; PlayForm.Cloud
</p> </div> </a> <a href="https://nlnet.nl/project/Land/" target="_blank" rel="noopener noreferrer" class="StaccatoCard StaccatoBorderShimmer flex items-center gap-3 bg-card p-4 transition-all hover:border-[var(--Primary)]"> <div class="flex h-8 w-8 shrink-0 items-center justify-center flat bg-mute font-bold">
NL
</div> <div> <span class="font-medium">NLnet Foundation</span> <p class="text-muted-foreground">
NGI0 Commons Fund
</p> </div> </a> </div> </section> <!-- Privacy & Data Rights Section --> <section class="mt-12"> <h2 class="mb-2 text-2xl font-semibold"> ${T("common.dashboard.privacy.heading", { defaultValue: "Privacy & Data Rights" })} </h2> <p class="mb-6 text-muted-foreground"> ${T("common.dashboard.privacy.subtitle", { defaultValue: "Exercise your GDPR rights, request data exports, or delete your account. All requests are sent directly to our privacy team and handled within 30 days." })} </p> ${renderComponent($$result, "DynamicPrivacyRequests", DynamicPrivacyRequests_default, {
		"client:load": true,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicPrivacyRequests.tsx",
		"client:component-export": "default"
	})} </section> <!-- Settings Section --> <section class="mt-12"> <h2 class="mb-6 text-2xl font-semibold"> ${T("common.dashboard.settings.heading", { defaultValue: "Settings" })} </h2> <div class="StaccatoCard StaccatoBorderShimmer bg-card"> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate` ${T("common.comingSoon", { defaultValue: "Coming Soon" })} ` })} <h3 class="mt-2 font-medium"> ${T("common.dashboard.settings.sync.title", { defaultValue: "Sync Settings" })} </h3> <p class="mt-1 text-muted-foreground"> ${T("common.dashboard.settings.sync.description", { defaultValue: "Your editor preferences follow you across every device automatically." })} </p> </div> </div> <div class="flex items-center justify-between border-b border-[var(--Border)] p-5"> <div> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate` ${T("common.comingSoon", { defaultValue: "Coming Soon" })} ` })} <h3 class="mt-2 font-medium"> ${T("common.dashboard.settings.extensionSync.title", { defaultValue: "Extension Sync" })} </h3> <p class="mt-1 text-muted-foreground"> ${T("common.dashboard.settings.extensionSync.description", { defaultValue: "Your installed extensions stay in sync across all machines." })} </p> </div> </div> <div class="p-5"> <a href="/Account" class="StaccatoButton h- inline-flex items-center justify-center bg-card px-4 font-medium transition-all hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"> ${T("common.dashboard.settings.account.manageButton", { defaultValue: "Manage" })} </a> <h3 class="mt-2 font-medium"> ${T("common.dashboard.settings.account.title", { defaultValue: "Account" })} </h3> <p class="mt-1 text-muted-foreground"> ${T("common.dashboard.settings.account.description", { defaultValue: "Update your profile and manage your account." })} </p> </div> </div> </section> </div> </main> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro";
var $$url = "/Dashboard";
//#endregion
//#region \0virtual:astro:page:Source/pages/Dashboard@_@astro
var page = () => Dashboard_exports;
//#endregion
export { page };
