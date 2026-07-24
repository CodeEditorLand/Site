import { a as cn } from "./Base_CnqryvRS.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuItem, n as DropdownMenu, o as DropdownMenuTrigger, r as DropdownMenuContent, t as Header } from "./Header_B5QWyqEA.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_Dl2IwPJE.mjs";
import { t as Skeleton } from "./Skeleton_BHoeul-n.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
//#region Source/Component/UI/Avatar.tsx
function Avatar({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
		"data-slot": "avatar",
		className: cn("relative flex size-10 shrink-0 overflow-hidden flat", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center flat bg-muted", className),
		...props
	});
}
//#endregion
//#region Source/Component/Dynamic/DynamicAuthStatus.tsx
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
		"aria-label": T("actions.loading", { defaultValue: "Loading…" })
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
				className: "flex items-center gap-2 flat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
			className: "w-40",
			children: [
				/* @__PURE__ */ jsx(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ jsx("a", {
						href: DashboardHref,
						"aria-label": T("user.menu.dashboard", { defaultValue: "Dashboard" }),
						children: T("user.menu.dashboard", { defaultValue: "Dashboard" })
					})
				}),
				/* @__PURE__ */ jsx(DropdownMenuItem, {
					asChild: true,
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
//#endregion
//#region Source/Component/Dynamic/DynamicAuthHeader.tsx
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
	AuthSlot: /* @__PURE__ */ jsx(DynamicAuthStatus_default, {})
});
//#endregion
export { DynamicAuthHeader_default as t };
