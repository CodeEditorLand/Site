import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { n as ThemeImage, t as DynamicAuthHeader_default } from "./DynamicAuthHeader_D8NCRGHe.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_QSmpZFE4.mjs";
import { Xt as renderScript, Zt as createAstro, ct as $$RecordLedger, it as LoadServerNamespace, qt as Button, rt as GetI18n, t as $$Base, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { n as StateLabel, t as DynamicStateReport } from "./DynamicStateReport_CppvWskY.mjs";
import { a as $$SurfaceAbsent, n as $$PrivacyRequests, t as $$SurfaceRegion } from "./SurfaceRegion_PDxUJhmc.mjs";
import { t as $$RecordMatrix } from "./RecordMatrix_Dd20c_be.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
import { t as $$SurfaceBadge } from "./SurfaceBadge_B9i5j2zn.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
import { t as RichText } from "./RichText_DN4L2Omf.mjs";
import { t as SurfaceLives } from "./Life_BQ93jaTL.mjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Building2, CircleCheck, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
// Source/Component/Dynamic/DynamicDashboardUser.tsx
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
	if (IsLoading) return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		"aria-label": "Loading account...",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute mx-auto h-12 w-12",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-4 w-full",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-4 w-4/5",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-4 w-3/5",
				"data-slot": "skeleton"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flat bg-mute h-4 w-2/5",
				"data-slot": "skeleton"
			})
		]
	}), /* @__PURE__ */ jsx(DynamicStateReport, {
		Label: StateLabel.Loading,
		Loading: true,
		Sentence: T("account:dashboardPage.surface.state.loading", { defaultValue: "Reading your session from the identity provider. The account rows appear as soon as it answers." }),
		Action: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "auth-shell__alternate",
			onClick: () => window.location.reload(),
			children: T("dashboard.reload", { defaultValue: "Reload" })
		})
	})] });
	if (AuthError) return /* @__PURE__ */ jsx(DynamicStateReport, {
		Role: "alert",
		Label: StateLabel.Interrupted,
		Sentence: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			T("account:dashboardPage.surface.state.error", { defaultValue: "The identity provider did not answer, so no account rows can be shown. Reloading asks it again." }),
			" ",
			T("dashboard.error", { defaultValue: "Could not load your account. Please refresh." }),
			" ",
			AuthError.message
		] }),
		Action: /* @__PURE__ */ jsx(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => window.location.reload(),
			children: T("tryAgain", { defaultValue: "Try again" })
		})
	});
	if (!IsAuthenticated || !User) return /* @__PURE__ */ jsx(DynamicStateReport, {
		Label: StateLabel.SignInRequired,
		Sentence: T("account:dashboardPage.surface.state.signedOut", { defaultValue: "You are not signed in. Sign in to see your account." }),
		Action: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => Login(),
			className: "auth-shell__primary emphasis-expressive",
			children: T("dashboard.account.signInButton", { defaultValue: "Sign In" })
		})
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
	const HasNoProfile = !User.email && !User.name && !User.nickname;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			HasNoProfile ? /* @__PURE__ */ jsx(DynamicStateReport, {
				Label: StateLabel.Empty,
				Sentence: T("account:dashboardPage.surface.state.noEmail", { defaultValue: "No email on this account. The provider did not return one." }),
				Action: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "auth-shell__alternate",
					onClick: HandleSignOut,
					children: T("logout", { defaultValue: "Sign Out" })
				})
			}) : null,
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => SetPIIVisible((v) => !v),
					"aria-label": PIIVisible ? "Hide personal data" : "Show personal data",
					className: "text-card-foreground transition-colors hover:text-card-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
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
					className: "flat h-12 w-12",
					onError: (Event) => {
						Event.target.style.display = "none";
						const Fallback = Event.target.nextElementSibling;
						if (Fallback) Fallback.style.display = "flex";
					}
				}) : null, /* @__PURE__ */ jsx("div", {
					className: `${User.picture ? "hidden" : "flex"} flat bg-mute h-12 w-12 items-center justify-center text-lg font-medium text-foreground`,
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx(Pii, {
						visible: PIIVisible,
						children: DisplayName.slice(0, 1).toUpperCase()
					})
				})]
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "record-ledger record-ledger--1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.nameLabel", { defaultValue: "Name" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: DisplayName
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.emailLabel", { defaultValue: "Email" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: /* @__PURE__ */ jsxs("span", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [User.email ? /* @__PURE__ */ jsx(Pii, {
									visible: PIIVisible,
									children: User.email
								}) : /* @__PURE__ */ jsx("span", {
									className: "surface__state",
									children: T("account:dashboardPage.surface.state.noEmail", { defaultValue: "No email on this account. The provider did not return one." })
								}), User.email_verified === true && /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center border border-green-200 bg-green-50 px-1.5 py-0 text-sm font-medium text-green-700",
									title: T("dashboard.account.emailVerifiedTitle", { defaultValue: "Email verified" }),
									children: [
										T("dashboard.account.emailVerifiedBadge", { defaultValue: "Verified" }),
										" ",
										/* @__PURE__ */ jsx(CircleCheck, {
											"aria-hidden": "true",
											className: "text-grpc inline h-4 w-4 align-[-3px]"
										})
									]
								})]
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.planLabel", { defaultValue: "Plan" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: IsEnterprise ? T("dashboard.account.planEnterprise", { defaultValue: "Enterprise" }) : T("dashboard.account.planFree", { defaultValue: "Free" })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.providerLabel", { defaultValue: "Provider" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: /* @__PURE__ */ jsxs("span", {
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
							})
						})]
					}),
					IsEnterprise && (OrganizationName || OrganizationIdentifier) && /* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.organizationLabel", { defaultValue: "Organization" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: OrganizationName || OrganizationIdentifier
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "record-ledger__row",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "record-ledger__key",
							children: T("dashboard.account.memberSinceLabel", { defaultValue: "Member Since" })
						}), /* @__PURE__ */ jsx("dd", {
							className: "record-ledger__value",
							children: User.updated_at ? /* @__PURE__ */ jsx(Pii, {
								visible: PIIVisible,
								children: MemberSince
							}) : /* @__PURE__ */ jsx("span", {
								className: "surface__state",
								children: T("account:dashboardPage.surface.state.noDate", { defaultValue: "Not recorded. The provider returned no update date for this account." })
							})
						})]
					})
				]
			}),
			IsEnterprise && /* @__PURE__ */ jsxs("div", {
				className: "mt-2 border border-green-200 bg-green-50 px-3 py-2 text-green-700",
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
				className: "mt-2 border border-yellow-200 bg-yellow-50 px-3 py-2 text-yellow-700",
				children: [
					T("dashboard.account.emailNotVerified", { defaultValue: "Email not verified. Check your inbox." }),
					" ",
					/* @__PURE__ */ jsx(TriangleAlert, {
						"aria-hidden": "true",
						className: "inline h-4 w-4 align-[-3px]"
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "surface__state mt-3",
				children: T("account:dashboardPage.surface.state.actions", { defaultValue: "Manage opens your account page. Sign Out ends the Auth0 session and clears the local token." })
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
					className: "StaccatoButton inline-flex flex-1 items-center justify-center bg-card px-3 py-1.5 font-medium text-red-600 transition-all hover:bg-red-50",
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
// Source/Component/Dynamic/DynamicLocalFirstScan.tsx
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
				className: "StaccatoDot flat inline-block h-2 w-2 animate-pulse bg-[var(--TierLocalFirst)]",
				style: { animationDelay: "0ms" }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "StaccatoDot flat inline-block h-2 w-2 animate-pulse bg-[var(--TierLocalFirst)]",
				style: { animationDelay: "150ms" }
			}),
			/* @__PURE__ */ jsx("span", {
				className: "StaccatoDot flat inline-block h-2 w-2 animate-pulse bg-[var(--TierLocalFirst)]",
				style: { animationDelay: "300ms" }
			})
		]
	}), /* @__PURE__ */ jsx("span", {
		className: "text-card-foreground opacity-70",
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
								className: "font-medium text-card-foreground",
								children: T("dashboard.localFirst.title", { defaultValue: "Air Daemon" })
							}),
							Status === "Scanning" && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center border border-[color:var(--TierLocalFirstMute)] bg-[var(--TierLocalFirstSurface)] px-2.5 py-0.5 font-medium text-[color:var(--TierLocalFirstFore)]",
								children: [
									T("dashboard.localFirst.scanning", { defaultValue: "Scanning" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "StaccatoDot flat h-1.5 w-1.5 animate-pulse bg-[var(--TierLocalFirst)]",
										"aria-hidden": "true"
									})
								]
							}),
							Status === "Connected" && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center border border-[color:var(--SpinegRPCMute)] bg-[var(--SpinegRPCSurface)] px-2.5 py-0.5 font-medium text-[color:var(--SpinegRPCFore)]",
								children: [
									T("dashboard.localFirst.connected", { defaultValue: "Connected" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "StaccatoDot flat h-1.5 w-1.5 bg-[var(--SpinegRPC)]",
										"aria-hidden": "true"
									})
								]
							}),
							Status === "NotFound" && /* @__PURE__ */ jsxs("span", {
								className: "bg-mute inline-flex items-center px-2.5 py-0.5 font-medium text-muted-foreground",
								children: [
									T("dashboard.localFirst.notFound", { defaultValue: "Not Detected" }),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "StaccatoDot flat h-1.5 w-1.5 bg-[var(--MuteForeground)]",
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
								className: "mt-2 h-1 w-full overflow-hidden bg-[var(--Mute)]",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-[var(--TierLocalFirst)] transition-all duration-500",
									style: { width: `${ScanProgress}%` }
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-card-foreground opacity-70",
								children: T("dashboard.localFirst.scanDescription", { defaultValue: "Checking ws://localhost:7979 and ws://localhost:7878" })
							})
						]
					}),
					Status === "Connected" && DaemonDetail && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-2",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[color:var(--SpinegRPCFore)]",
								children: T("dashboard.localFirst.connectedMessage", { defaultValue: "Connected to Air Daemon" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-3 text-card-foreground opacity-70",
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
										className: "inline-flex items-center border border-[color:var(--SpineIPCMute)] bg-[var(--SpineIPCSurface)] px-2 py-0.5 text-[color:var(--SpineIPCFore)]",
										children: [
											"Peer-to-peer design",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "StaccatoDot flat h-1 w-1 bg-[var(--SpineIPC)]",
												"aria-hidden": "true"
											})
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center border border-[color:var(--SpineIPCMute)] bg-[var(--SpineIPCSurface)] px-2 py-0.5 text-[color:var(--SpineIPCFore)]",
										children: [
											"Local-first",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "StaccatoDot flat h-1 w-1 bg-[var(--SpineIPC)]",
												"aria-hidden": "true"
											})
										]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center border border-[color:var(--SpineIPCMute)] bg-[var(--SpineIPCSurface)] px-2 py-0.5 text-[color:var(--SpineIPCFore)]",
										children: [
											"No cloud required",
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "StaccatoDot flat h-1 w-1 bg-[var(--SpineIPC)]",
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
							className: "text-card-foreground opacity-70",
							children: T("dashboard.localFirst.notFoundMessage", { defaultValue: "Air Daemon not detected. Launch Code Editor Land to enable local-first features." })
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "/Download",
								className: "StaccatoButton inline-flex items-center justify-center border border-[color:var(--TierLocalFirstMute)] bg-[var(--TierLocalFirstSurface)] px-4 py-2 font-medium text-[color:var(--TierLocalFirstFore)] transition-all hover:bg-[var(--TierLocalFirstMute)]",
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
// Source/Content/Surface/Dashboard.ts
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/** The page's copy, resolved once. */
var DashboardPage = (T) => {
	const Copy = {
		Title: T("common.dashboard.pageTitle", { defaultValue: "Dashboard" }),
		Subtitle: T("common.dashboard.pageSubtitle", { defaultValue: "Your Land account, downloads, and editor connection." }),
		Account: T("common.dashboard.account.heading", { defaultValue: "Account" }),
		Downloads: "Downloads",
		QuickLinks: "Quick Links",
		Access: T("common.dashboard.portal.heading", { defaultValue: "Authentication Tiers" }),
		AccessSubtitle: T("common.dashboard.portal.subtitle", { defaultValue: "The current authentication method and the tiers the account can reach." }),
		Data: T("common.dashboard.privacy.heading", { defaultValue: "Privacy & Data Rights" }),
		DataSubtitle: T("common.dashboard.privacy.subtitle", { defaultValue: "Exercise GDPR rights, request a data export, or delete the account. Requests go straight to our privacy team; each is answered within 30 days." }),
		Build: T("common.dashboard.buildLog.heading", { defaultValue: "Build Configuration" }),
		BuildSubtitle: T("common.dashboard.buildLog.subtitle", { defaultValue: "Active build variant and deployment mode.\n\nAvailable over a Local-First Air Daemon connection." }),
		Telemetry: T("common.dashboard.telemetry.heading", { defaultValue: "Telemetry Architecture" }),
		Editor: T("common.dashboard.editor.heading", { defaultValue: "Editor Connection" }),
		EditorSubtitle: T("common.dashboard.editor.subtitle", { defaultValue: "Connect the website to a running Land editor instance." }),
		EditorStatus: T("common.dashboard.editor.status", { defaultValue: "Not Connected" }),
		EditorDescription: T("common.dashboard.editor.description", { defaultValue: "The Air Daemon connects this dashboard to a running Land editor over WebSocket.\n\nLaunch Land for real-time build logs, telemetry and configuration management." }),
		Settings: T("common.dashboard.settings.heading", { defaultValue: "Settings" }),
		Partners: T("common.dashboard.partners.heading", { defaultValue: "Partners & Attribution" }),
		ComingSoon: T("common.comingSoon", { defaultValue: "PLANNED" })
	};
	return {
		title: Copy.Title,
		standfirst: Copy.Subtitle,
		badges: [
			{
				label: "Telemetry Feature Gated",
				tone: "grpc",
				dot: true
			},
			{
				label: "CC0 Licensed",
				tone: "mute"
			},
			{
				label: "Signing Planned",
				tone: "mute"
			},
			{
				label: "Mountain Workbench",
				tone: "ipc",
				dot: true
			}
		],
		downloads: {
			label: T("common.dashboard.downloads.goButton", { defaultValue: "Go to Downloads" }),
			href: "/Download",
			line: T("common.dashboard.downloads.description", { defaultValue: "The latest Land build for each platform. Native on macOS, Windows and Linux." })
		},
		quickLinks: [
			{
				label: T("common.dashboard.quickLinks.docs", { defaultValue: "Documentation" }),
				href: "/Doc"
			},
			{
				label: T("common.dashboard.quickLinks.reportIssue", { defaultValue: "Report an Issue" }),
				href: "https://github.com/CodeEditorLand/Land/issues"
			},
			{
				label: T("common.dashboard.quickLinks.contribute", { defaultValue: "Contribute" }),
				href: "/Contributing"
			}
		],
		telemetry: {
			heading: Copy.Telemetry,
			paths: [
				{
					badges: [{
						label: "Disabled",
						tone: "grpc",
						dot: true
					}, {
						label: "Feature Gated",
						tone: "mute",
						dot: true
					}],
					heading: T("common.dashboard.telemetry.production.title", { defaultValue: "Absent from the binary. Not just disabled." }),
					text: T("common.dashboard.telemetry.production.description", { defaultValue: "Telemetry and tracing sit behind named Rust feature gates. The build profile decides what is compiled in; nothing is emitted unless a specific feature path is enabled." })
				},
				{
					badges: [{
						label: "Optional",
						tone: "tauri",
						dot: true
					}],
					heading: T("common.dashboard.telemetry.otel.title", { defaultValue: "Opt-in OpenTelemetry. Your infrastructure only." }),
					text: T("common.dashboard.telemetry.otel.description", { defaultValue: "Distributed traces for a deployment are opt-in: enable with `cargo build --features Telemetry`.\n\nLocal-only OTEL tracing, metrics and spans. No external transmission; all data stays on your infrastructure." })
				},
				{
					badges: [{
						label: "Active",
						tone: "ipc",
						dot: true
					}],
					heading: T("common.dashboard.telemetry.effect.title", { defaultValue: "Extension host timing. Stays in the process." }),
					text: T("common.dashboard.telemetry.effect.description", { defaultValue: "Cocoon uses TelemetryService for internal RPC and bootstrap timing; the data is used for performance diagnostics only.\n\nAll of it stays local, and a TelemetryMock layer is available for zero-overhead testing." })
				}
			]
		},
		build: {
			heading: Copy.Build,
			subtitle: Copy.BuildSubtitle.split("\n\n").filter((Line) => Line.length > 0).join(" "),
			cards: [
				{
					title: "Active Profile",
					badge: {
						label: "Recommended",
						tone: "ipc",
						dot: true
					},
					rows: [
						{
							key: "Profile",
							value: "production",
							mono: true
						},
						{
							key: "Workbench",
							value: "Mountain",
							strong: true
						},
						{
							key: "Features",
							value: "Active Source Path"
						},
						{
							key: "Compiler",
							value: "esbuild",
							mono: true
						}
					]
				},
				{
					title: "Deployment Mode",
					badge: {
						label: "Active",
						tone: "grpc",
						dot: true
					},
					rows: [
						{
							key: "Mode",
							value: "Production Release",
							strong: true
						},
						{
							key: "NODE_ENV",
							value: "production",
							mono: true
						},
						{
							key: "RUST_LOG",
							value: "info",
							mono: true
						},
						{
							key: "Bundle",
							value: "Full"
						}
					]
				},
				{
					title: "Test Matrix",
					badge: {
						label: "16 Permutations",
						tone: "mute"
					},
					rows: [
						{
							key: "Profiles",
							value: "9 named"
						},
						{
							key: "Workbenches",
							value: "5 variants"
						},
						{
							key: "Compilers",
							value: "esbuild, OXC"
						},
						{
							key: "Permutations",
							value: "16 verified",
							strong: true
						}
					]
				}
			]
		},
		tiers: {
			heading: Copy.Access,
			subtitle: Copy.AccessSubtitle,
			cards: [
				{
					title: "Cloud",
					protocol: ["Auth0", "HTTPS / TLS 1.3"].join(` ${Quad} `),
					badge: {
						label: "Online",
						tone: "ipc",
						dot: true
					},
					glyph: "☁",
					token: "TierCloud"
				},
				{
					title: "Provider",
					protocol: ["OAuth 2.0", "PKCE"].join(` ${Quad} `),
					badge: {
						label: "OAuth",
						tone: "wasm",
						dot: true
					},
					glyph: "♧",
					token: "TierProvider"
				},
				{
					title: "Local-First",
					protocol: [
						"mTLS",
						"CRDTs",
						"WebSocket"
					].join(` ${Quad} `),
					badge: {
						label: "Local",
						tone: "tcp",
						dot: true
					},
					glyph: "⚙",
					token: "TierLocalFirst"
				},
				{
					title: "Enterprise",
					protocol: [
						"OIDC",
						"SAML 2.0",
						"SCIM"
					].join(` ${Quad} `),
					badge: {
						label: "SSO",
						tone: "grpc",
						dot: true
					},
					glyph: "☋",
					token: "TierEnterprise"
				}
			]
		},
		editor: {
			heading: Copy.Editor,
			subtitle: Copy.EditorSubtitle,
			name: "Air Daemon",
			status: Copy.EditorStatus,
			text: Copy.EditorDescription,
			scan: {
				label: T("common.dashboard.editor.scanButton", { defaultValue: "Scan for Daemon" }),
				href: "/Dashboard?mode=local"
			},
			connect: {
				label: T("common.dashboard.editor.connect", { defaultValue: "Connect via Portal" }),
				href: "/Portal"
			},
			note: [
				"mTLS",
				"CRDTs",
				"WebSocket",
				"Zero cloud dependency"
			].join(` ${Quad} `)
		},
		partners: {
			heading: Copy.Partners,
			cards: [
				{
					name: "Code Editor Land",
					line: ["Organization", "GitHub"].join(` ${Quad} `),
					href: "https://github.com/CodeEditorLand",
					logo: "/Asset/Logo/Glyph/Land.svg"
				},
				{
					name: "PlayForm",
					line: ["Platform", "PlayForm.Cloud"].join(` ${Quad} `),
					href: "https://PlayForm.Cloud",
					logo: "/Image/PlayForm.svg"
				},
				{
					name: "NLnet Foundation",
					line: "NGI0 Commons Fund",
					href: "https://nlnet.nl/project/Land/",
					tile: "NL"
				}
			]
		},
		privacy: {
			heading: Copy.Data,
			subtitle: Copy.DataSubtitle
		},
		settings: {
			heading: Copy.Settings,
			rows: [
				{
					title: T("common.dashboard.settings.sync.title", { defaultValue: "Sync Settings" }),
					body: T("common.dashboard.settings.sync.description", { defaultValue: "Editor preferences follow the account across every device, automatically." }),
					badge: {
						label: Copy.ComingSoon,
						tone: "mute"
					}
				},
				{
					title: T("common.dashboard.settings.extensionSync.title", { defaultValue: "Extension Sync" }),
					body: T("common.dashboard.settings.extensionSync.description", { defaultValue: "Installed extensions stay in sync across all machines." }),
					badge: {
						label: Copy.ComingSoon,
						tone: "mute"
					}
				},
				{
					title: T("common.dashboard.settings.account.title", { defaultValue: "Account" }),
					body: T("common.dashboard.settings.account.description", { defaultValue: "Update your profile and manage your account." }),
					action: {
						label: "Manage",
						href: "/Account"
					}
				}
			]
		}
	};
};
// Source/pages/Dashboard.astro
var Dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	LoadServerNamespace("account");
	const T = GetI18n();
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_COyUGpTd.mjs");
	const IsLocalMode = Astro.url.searchParams.get("mode") === "local";
	const MetaTitle = T("meta.dashboard.title", { defaultValue: "Dashboard | Code Editor Land" });
	const MetaDescription = T("meta.dashboard.description", { defaultValue: "Manage your account, downloads, and settings.\nYour Code Editor Land dashboard." });
	const Page = DashboardPage(T);
	const Declarations = [
		{
			key: "ROUTE",
			value: Astro.url.pathname.toUpperCase()
		},
		{
			key: "SOURCE",
			value: "SESSION"
		},
		{
			key: "ENV",
			value: IsLocalMode ? "LOCAL" : "WEB"
		},
		{
			key: "AS OF",
			value: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}
	];
	const States = [Row("STATUS", "READY")];
	const Regions = [
		{
			id: "account",
			index: "01",
			label: "Account"
		},
		{
			id: "downloads",
			index: "02",
			label: "Downloads"
		},
		{
			id: "quick-links",
			index: "03",
			label: "Quick Links"
		},
		{
			id: "telemetry",
			index: "04",
			label: Page.telemetry.heading
		},
		{
			id: "build",
			index: "05",
			label: Page.build.heading
		},
		{
			id: "tiers",
			index: "06",
			label: Page.tiers.heading
		},
		{
			id: "editor",
			index: "07",
			label: Page.editor.heading
		},
		{
			id: "partners",
			index: "08",
			label: Page.partners.heading
		},
		{
			id: "privacy",
			index: "09",
			label: Page.privacy.heading
		},
		{
			id: "settings",
			index: "10",
			label: Page.settings.heading
		}
	];
	const CardStyle = "--jelly-fill:var(--Card);--jelly-radius:0;--jelly-card-font-size:inherit;--jelly-card-padding-block:var(--space-group);--jelly-card-padding-inline:var(--space-group)";
	const ProfileValue = Page.build.cards[0]?.rows.find((Fact) => Fact.key === "Profile")?.value ?? "UNAVAILABLE";
	const ModeValue = Page.build.cards[1]?.rows.find((Fact) => Fact.key === "Mode")?.value ?? "UNAVAILABLE";
	const MatrixColumns = Page.tiers.cards.map((Card) => ({
		label: Card.title.toUpperCase(),
		ink: `${Card.token}Fore`
	}));
	const MatrixRows = [
		{
			label: "PROFILE:",
			cells: Page.tiers.cards.map(() => ProfileValue)
		},
		{
			label: "MODE:",
			cells: Page.tiers.cards.map(() => ModeValue)
		},
		{
			label: "TIER:",
			cells: Page.tiers.cards.map((Card) => Card.protocol)
		},
		{
			label: "BADGE:",
			cells: Page.tiers.cards.map((Card) => Card.badge.label)
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="surface-trail"> ${renderComponent($$result, "Trail", $$Trail, { "trail": [{
			label: "/HOME",
			href: "/"
		}, { label: "/DASHBOARD" }] })} </div>  ${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
			"index": "# DASHBOARD_02",
			"title": Page.title,
			"proposition": Page.standfirst,
			"states": States,
			"declarations": Declarations,
			"life": SurfaceLives.DASHBOARD.term,
			"lifeNote": SurfaceLives.DASHBOARD.source
		}, { "default": ($$result) => renderTemplate` <div class="surface-head__marks"> ${Page.badges.map((Badge) => renderTemplate`${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Badge.label,
			"tone": Badge.tone,
			"dot": Badge.dot
		})}`)} </div> ` })}  <div class="surface-regions"> <nav class="surface-regions__rail" aria-label="Dashboard regions"> <ul class="surface-regions__list"> ${Regions.map((Region) => renderTemplate`<li> <a class="surface-regions__link"${addAttribute(`#${Region.id}`, "href")}> <span class="surface-regions__index"> ${Region.index} </span> ${Region.label} </a> </li>`)} </ul> </nav> <details class="surface-regions__drawer"> <summary class="surface-regions__summary"> <span>REGIONS: ${Regions.length}</span> <span class="surface-regions__summary-mark" aria-hidden="true">
↳ OPEN
</span> </summary> <ul class="surface-regions__list"> ${Regions.map((Region) => renderTemplate`<li> <a class="surface-regions__link"${addAttribute(`#${Region.id}`, "href")}> <span class="surface-regions__index"> ${Region.index} </span> ${Region.label} </a> </li>`)} </ul> </details> <div class="surface-regions__main"> <!-- 01 Account. The identity record. Who is signed in is client state,
			 so the island prints the record and its own loading report; the
			 region states nothing it cannot see. -->${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 01",
			"id": "account",
			"title": "Account"
		}, { "default": ($$result) => renderTemplate` <div class="surface-panel"> ${renderComponent($$result, "DynamicDashboardUser", DynamicDashboardUser_default, {
			"client:load": true,
			"Domain": Auth0Domain,
			"ClientIdentifier": Auth0ClientIdentifier,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDashboardUser.tsx",
			"client:component-export": "default"
		})} </div> ` })} <!-- 02 Downloads. One fact and the one action that acts on it. The
			 action is a route: the reader is going to another page, not
			 finishing something here, so it takes the ghost register
			 (\`surface__action\`). The page spends its one ink fill on the
			 account record's sign-in - the only thing a reader on this page
			 completes rather than visits - so a band that only offers a door
			 out takes the rule, not the slab. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 02",
			"id": "downloads",
			"title": "Downloads"
		}, { "default": ($$result) => renderTemplate` <div class="surface-panel"> <p class="surface-region__standfirst"> ${Page.downloads.line} </p> <div class="surface__actions"> <a class="surface__action"${addAttribute(Page.downloads.href, "href")}> ${Page.downloads.label} ${" "} <span aria-hidden="true">→</span> </a> </div> </div> ` })} <!-- 03 Quick Links. A route strip: three destinations, one row each. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 03",
			"id": "quick-links",
			"title": "Quick Links"
		}, { "default": ($$result) => renderTemplate` <ul class="surface-links"> ${Page.quickLinks.map((Link) => renderTemplate`<li> <a class="surface-links__item"${addAttribute(Link.href, "href")}> <span>${Link.label}</span> <span class="surface-links__arrow" aria-hidden="true">
→
</span> </a> </li>`)} </ul> ` })} <!-- 04 Telemetry. Three paths, each a record: its marker, its state
			 badges, its heading and the sentence that qualifies it. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 04",
			"id": "telemetry",
			"title": Page.telemetry.heading
		}, { "default": ($$result) => renderTemplate` <div class="surface-panel surface-telemetry"> ${Page.telemetry.paths.map((Path, Position) => renderTemplate`<div class="surface-telemetry__row"> <p class="surface-telemetry__index"> ${String(Position + 1).padStart(2, "0")} </p> <div class="surface-telemetry__body"> <div class="surface-telemetry__badges"> ${Path.badges.map((Badge) => renderTemplate`${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Badge.label,
			"tone": Badge.tone,
			"dot": Badge.dot
		})}`)} </div> <h3 class="surface-telemetry__heading"> ${Path.heading} </h3> ${renderComponent($$result, "RichText", RichText, {
			"client:load": true,
			"Text": Path.text,
			"Terms": true,
			"ClassName": "mt-2 text-card-foreground",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
			"client:component-export": "RichText"
		})} </div> </div>`)} </div> ` })} <!-- 05 Build Configuration. One instrument, three columns: the three
			 cards the baseline printed become one panel of three ledgers, so the
			 facts read across instead of as three boxes side by side - and under
			 them the build/tier matrix, the comparison the three cards cannot
			 make between themselves. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 05",
			"id": "build",
			"title": Page.build.heading,
			"standfirst": Page.build.subtitle
		}, { "default": ($$result) => renderTemplate` <div class="surface-panel surface-build"> ${Page.build.cards.map((Card) => renderTemplate`<div class="surface-build__column"> <div class="surface-build__head"> <h3 class="surface-build__title"> ${Card.title} </h3> ${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Card.badge.label,
			"tone": Card.badge.tone,
			"dot": Card.badge.dot
		})} </div>  ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
			"class": "surface-build__ledger",
			"rows": Card.rows.map((Fact) => ({
				key: `${Fact.key}:`,
				value: Fact.value,
				code: Fact.mono,
				strong: Fact.strong
			}))
		})} </div>`)} </div> <div class="surface-build__matrix"> <p class="surface-build__matrix-register">
MATRIX: PROFILE / MODE / TIER
</p> ${renderComponent($$result, "RecordMatrix", $$RecordMatrix, {
			"id": "build-tier-matrix",
			"columns": MatrixColumns,
			"rows": MatrixRows,
			"caption": T("common.dashboard.buildLog.matrix.caption", { defaultValue: "One build read across four tiers. PROFILE and MODE are the active build's own rows; TIER is what each tier speaks and BADGE is the word each one reports. The four tiers are planned, so the matrix states no arrival." })
		})} </div> ` })} <!-- 06 Authentication Tiers. Four destinations, equal because the four
			 modes are equal; each keeps its pastel tile, its protocol and its
			 badge. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 06",
			"id": "tiers",
			"title": Page.tiers.heading,
			"standfirst": Page.tiers.subtitle
		}, { "default": ($$result) => renderTemplate` <div class="surface-tiers"> ${Page.tiers.cards.map((Card) => renderTemplate`<a class="surface-tier"${addAttribute(`--TierWash:var(--${Card.token}Surface);--TierLine:var(--${Card.token}Mute);--TierInk:var(--${Card.token}Fore);--TierEdge:var(--${Card.token})`, "style")} href="/Portal"> <span class="surface-tier__tile" aria-hidden="true"> ${Card.glyph} </span> <span class="surface-tier__body"> <h3 class="surface-tier__title"> ${Card.title} </h3> <p class="surface-tier__protocol"> ${Card.protocol} </p> </span> ${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Card.badge.label,
			"tone": Card.badge.tone,
			"dot": Card.badge.dot
		})} </a>`)} </div> ` })} <!-- 07 Editor Connection. The absent record, composed: what would be
			 here, why it is not, what to do - then the prose that explains it and
			 the second exit. \`?mode=local\` swaps the panel body for the scan
			 island. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 07",
			"id": "editor",
			"title": Page.editor.heading,
			"standfirst": Page.editor.subtitle
		}, { "default": ($$result) => renderTemplate`${IsLocalMode ? renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", { "style": CardStyle }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "DynamicLocalFirstScan", DynamicLocalFirstScan_default, {
			"client:load": true,
			"Domain": Auth0Domain,
			"ClientIdentifier": Auth0ClientIdentifier,
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicLocalFirstScan.tsx",
			"client:component-export": "default"
		})} ` })}` : renderTemplate`<div class="surface-editor"> <div class="surface-editor__head"> <img class="surface-editor__glyph" src="/Asset/Logo/Glyph/Land.svg" alt="Land" width="32" height="32"> <div class="surface-editor__body"> <div class="surface-editor__name"> <h3 class="surface-editor__title"> ${Page.editor.name} </h3> ${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Page.editor.status,
			"tone": "mute",
			"dot": true
		})} </div> ${renderComponent($$result, "RichText", RichText, {
			"client:load": true,
			"Text": Page.editor.text,
			"Terms": true,
			"ClassName": "mt-1 text-card-foreground",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/RichText.tsx",
			"client:component-export": "RichText"
		})} </div> </div> ${renderComponent($$result, "SurfaceAbsent", $$SurfaceAbsent, {
			"class": "surface-editor__absent",
			"status": "UNAVAILABLE",
			"wouldBe": "Build logs, telemetry and configuration from a running Land editor, over WebSocket.",
			"whyNot": "No Air Daemon is listening on this machine: the editor is not running, or its daemon is not connected.",
			"next": {
				label: Page.editor.scan.label,
				href: Page.editor.scan.href
			}
		})} <div class="surface__actions"> <a class="surface__action"${addAttribute(Page.editor.connect.href, "href")}> ${Page.editor.connect.label} ${" "} <span aria-hidden="true">→</span> </a> <span class="surface-editor__note"> ${Page.editor.note} </span> </div> </div>`}` })} <!-- 08 Partners. Three attributed organisations. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 08",
			"id": "partners",
			"title": Page.partners.heading
		}, { "default": ($$result) => renderTemplate` <div class="surface-partners"> ${Page.partners.cards.map((Card) => renderTemplate`<a class="surface-partner"${addAttribute(Card.href, "href")}> ${Card.logo ? renderTemplate`<img class="surface-partner__logo"${addAttribute(Card.logo, "src")}${addAttribute(Card.name, "alt")} width="32" height="32">` : renderTemplate`<span class="surface-partner__tile"> ${Card.tile} </span>`} <span class="surface-partner__body"> <span class="surface-partner__name"> ${Card.name} </span> <span class="surface-partner__line"> ${Card.line} </span> </span> </a>`)} </div> ` })} <!-- 09 Privacy & Data Rights. The directory keeps its own composition:
			 six statutory rights, four support channels, and the one entry that
			 ends the account. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 09",
			"id": "privacy",
			"title": Page.privacy.heading,
			"standfirst": Page.privacy.subtitle
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PrivacyRequests", $$PrivacyRequests, {})} ` })} <!-- 10 Settings. Three rows; the two planned settings state their
			 state, the live one states its action. --> ${renderComponent($$result, "SurfaceRegion", $$SurfaceRegion, {
			"index": "# 10",
			"id": "settings",
			"title": Page.settings.heading
		}, { "default": ($$result) => renderTemplate` <div class="surface-panel surface-settings"> ${Page.settings.rows.map((Setting) => renderTemplate`<div class="surface-settings__row"> <div class="surface-settings__body"> ${Setting.badge ? renderTemplate`${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Setting.badge.label,
			"tone": Setting.badge.tone
		})}` : null} <h3 class="surface-settings__title"> ${Setting.title} </h3> <p class="surface-settings__line"> ${Setting.body} </p> </div> ${Setting.action ? renderTemplate`<a class="surface__action"${addAttribute(Setting.action.href, "href")}> ${Setting.action.label} ${" "} <span aria-hidden="true">→</span> </a>` : null} </div>`)} </div> ` })} </div> </div>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro?astro&type=script&index=0&lang.ts")} `,
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Dashboard.astro";
var $$url = "/Dashboard";
// \0virtual:astro:page:Source/pages/Dashboard@_@astro
var page = () => Dashboard_exports;
export { page };
