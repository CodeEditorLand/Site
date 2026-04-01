"use client";

import Auth0Provider from "../Provider/Auth0Provider";
import Auth0AccountGate from "./Auth0AccountGate";

/**
 * Self-contained Auth0 account island for Astro pages.
 * Wraps Auth0AccountGate with Auth0Provider so it works as
 * an independent React island (no shared context needed).
 */
export default ({
	Route,
	Header,
	Domain,
	ClientIdentifier,
}: {
	Route: "signin" | "signup";
	Header?: {
		logo?: { text: string };
		navigation?: Array<{ label: string; href: string; icon?: string }>;
		actions?: Array<{
			type?: string;
			text: string;
			variant?: string;
			size?: string;
			href?: string;
			icon?: string;
		}>;
	};
	Domain?: string;
	ClientIdentifier?: string;
}) => (
	<Auth0Provider Domain={Domain} ClientIdentifier={ClientIdentifier}>
		<Auth0AccountGate Route={Route} Header={Header} />
	</Auth0Provider>
);
