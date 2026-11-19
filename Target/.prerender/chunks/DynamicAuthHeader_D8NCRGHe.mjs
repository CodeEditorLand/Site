import { At as DropdownMenuTrigger, Ct as DropdownMenu, Et as DropdownMenuSeparator, St as Header, Tt as DropdownMenuItem, wt as DropdownMenuContent } from "./Base_BVG1wSoZ.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_QSmpZFE4.mjs";
import { a as Skeleton, i as AvatarImage, n as AvatarFallback, t as Avatar } from "./Avatar_DJQYAF80.mjs";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useAuth0 } from "@auth0/auth0-react";
// Source/Library/Theme/ThemeImage.tsx
/**
* ThemeImage - Daylight Field Record (single theme).
*
* A plain <img>: no <picture>, no media query, no OS-based switching. Every
* surface is light (creme canvas, white cards), so the src is always the
* LIGHT variant - the dark glyph.
*
* Convention:
*   Light: /Image/Foo.svg or /Asset/Foo.svg
*   (/Dark/Image/ and /Asset/Dark/ must never be referenced)
*/
function ThemeImage({ src, alt = "", width, height, className, ...props }) {
	return /* @__PURE__ */ jsx("img", {
		src,
		alt,
		width,
		height,
		className,
		...props
	});
}
// Source/Component/Dynamic/DynamicAuthStatus.tsx
/**
* Auth0-aware status display for header/nav.
* Shows user avatar + dropdown when authenticated, Sign In button when not.
*
* Loading state: skeleton matching avatar size (no layout shift).
* Authenticated state: Radix Avatar (picture + initials fallback)
* with Radix DropdownMenu - Dashboard, Account, Sign Out items.
* Unauthenticated state: Sign In link button.
*/
var DynamicAuthStatus_default = ({ SignInHref = "/Account/SignIn", DashboardHref = "/Dashboard", AccountHref = "/Account" }) => {
	const { isLoading: IsLoading, isAuthenticated: IsAuthenticated, user: User, logout: Auth0Logout } = useAuth0();
	const { t: T } = useTranslation("header");
	if (IsLoading) return /* @__PURE__ */ jsx(Skeleton, {
		className: "h-7 w-7",
		"aria-label": T("actions.loading", { defaultValue: "Reading the session" })
	});
	if (!IsAuthenticated || !User) return /* @__PURE__ */ jsxs("a", {
		href: SignInHref,
		className: "inline-flex items-center font-medium text-foreground hover:underline",
		"aria-label": T("actions.signIn", { defaultValue: "Sign In" }),
		children: [
			T("actions.signIn", { defaultValue: "Sign In" }),
			" ",
			/* @__PURE__ */ jsxs("svg", {
				className: "h-4 w-4",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
					/* @__PURE__ */ jsx("polyline", { points: "10 17 15 12 10 7" }),
					/* @__PURE__ */ jsx("line", {
						x1: "15",
						y1: "12",
						x2: "3",
						y2: "12"
					})
				]
			})
		]
	});
	const DisplayName = User.name && User.name !== User.email ? User.name : User.nickname || User.email?.split("@")[0] || "User";
	const Initials = DisplayName.slice(0, 2).toUpperCase();
	const Logout = () => Auth0Logout({ logoutParams: { returnTo: window.location.origin } });
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		modal: false,
		children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "flat flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"aria-label": T("user.avatarAlt", { defaultValue: "User menu" }),
				children: /* @__PURE__ */ jsxs(Avatar, {
					className: "h-7 w-7",
					children: [/* @__PURE__ */ jsx(AvatarImage, {
						src: User.picture,
						alt: T("user.avatarAlt", {
							defaultValue: "{{name}} avatar",
							name: DisplayName
						})
					}), /* @__PURE__ */ jsx(AvatarFallback, {
						className: "",
						children: Initials
					})]
				})
			})
		}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
			align: "end",
			head: {
				Name: "ACCOUNT",
				Count: 3
			},
			children: [
				/* @__PURE__ */ jsx(DropdownMenuItem, {
					asChild: true,
					mark: "/",
					children: /* @__PURE__ */ jsx("a", {
						href: DashboardHref,
						"aria-label": T("user.menu.dashboard", { defaultValue: "Dashboard" }),
						children: T("user.menu.dashboard", { defaultValue: "Dashboard" })
					})
				}),
				/* @__PURE__ */ jsx(DropdownMenuItem, {
					asChild: true,
					mark: "/",
					children: /* @__PURE__ */ jsx("a", {
						href: AccountHref,
						"aria-label": T("user.menu.account", { defaultValue: "Account" }),
						children: T("user.menu.account", { defaultValue: "Account" })
					})
				}),
				/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
				/* @__PURE__ */ jsx(DropdownMenuItem, {
					variant: "destructive",
					onClick: Logout,
					"aria-label": T("user.menu.signOut", { defaultValue: "Sign Out" }),
					children: T("user.menu.signOut", { defaultValue: "Sign Out" })
				})
			]
		})]
	});
};
// Source/Component/Dynamic/DynamicAuthHeader.tsx
/**
* Auth0-aware header island for Astro pages.
*
* Wraps the standard Header with Auth0Provider so auth state
* is available. Replaces the static "Sign In" action with
* DynamicAuthStatus that shows username/avatar when logged in.
*
* Usage in .astro:
* <DynamicAuthHeader client:load Domain={Auth0Domain} ClientIdentifier={Auth0ClientIdentifier} />
*/
var DynamicAuthHeader_default = ({ Domain, ClientIdentifier, Content }) => /* @__PURE__ */ jsx(Auth0Provider_default, {
	Children: /* @__PURE__ */ jsx(HeaderWithAuth, { ...Content ? { Content } : {} }),
	...Domain ? { Domain } : {},
	...ClientIdentifier ? { ClientIdentifier } : {}
});
var HeaderWithAuth = ({ Content }) => /* @__PURE__ */ jsx(Header, {
	...Content ? { Content } : {},
	AuthSlot: /* @__PURE__ */ jsx(DynamicAuthStatus_default, {}),
	Mode: "functional"
});
export { ThemeImage as n, DynamicAuthHeader_default as t };
