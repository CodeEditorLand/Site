import {
	Building2,
	Check,
	Cloud,
	GitFork,
	Globe,
	HardDrive,
	Key,
	Lock,
	Monitor,
	RefreshCw,
	Server,
	Shield,
	Users,
	Wifi,
	type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import { DynamicInput } from "./DynamicInput";
import type PortalContent from "./Interface/Content/Page/Portal.js";
import type TierContent from "./Interface/Content/Portal/Tier.js";

/**
 * Icon registry for tier icons.
 */
const TierIconRegistry: Record<string, LucideIcon> = {
	Building2,
	Cloud,
	GitFork,
	Globe,
	HardDrive,
	Key,
	Lock,
	Monitor,
	RefreshCw,
	Server,
	Shield,
	Users,
	Wifi,
};

/**
 * Enterprise SSO form with organization domain input and Auth0 redirect buttons.
 * Routes through Auth0 Enterprise Connections (Okta, Azure AD, SAML).
 */
const EnterpriseSSOForm = ({
	Content,
	OnEnterprise,
}: {
	Content: TierContent;
	OnEnterprise?: () => void;
}) => {
	const [OrganizationDomain, SetOrganizationDomain] = useState("");
	const { t: T } = useTranslation("account");

	const HandleEnterpriseLogin = (Connection: string) => {
		// Auth0 loginWithRedirect is triggered via the parent's OnEnterprise callback
		// which passes the connection + organization to Auth0AccountGate
		const Params = new URLSearchParams();
		Params.set("connection", Connection);
		if (OrganizationDomain.trim()) {
			Params.set("login_hint", OrganizationDomain.trim());
		}
		window.location.href = `/Account/SignIn?${Params.toString()}`;
	};

	const HandleDomainSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (!OrganizationDomain.trim()) return;
		// HRD: Auth0 will detect the domain and route to the correct enterprise connection
		window.location.href = `/Account/SignIn?login_hint=${encodeURIComponent(OrganizationDomain.trim())}`;
	};

	return (
		<div
			className="space-y-4"
			aria-label={T("portal.enterprise.ariaLabel", {
				defaultValue: "Enterprise SSO",
			})}>
			<form onSubmit={HandleDomainSubmit} className="space-y-3">
				<DynamicInput
					content={{
						label: T("portal.enterprise.domainLabel", {
							defaultValue: "Work Email or Domain",
						}),
						placeholder: T(
							"portal.enterprise.domainPlaceholder",
							{
								defaultValue: "name@company.com",
							},
						),
						type: "email",
						required: false,
						onChange: SetOrganizationDomain,
					}}
					id="portal-enterprise-domain"
				/>
				<Button
					type="submit"
					className="StaccatoButton w-full"
					style={{
						backgroundColor: Content.Color,
						borderColor: Content.BorderColor,
						color: "#ffffff",
					}}>
					{T("portal.enterprise.continueSSO", {
						defaultValue: "Continue with SSO",
					})}
					{"\u2001"}
					<Building2
						className="h-4 w-4"
						aria-hidden="true"
					/>
				</Button>
			</form>

			<div className="PortalTierDivider StaccatoSeparator" />

			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() => HandleEnterpriseLogin("okta")}>
				{T("portal.enterprise.continueOkta", {
					defaultValue: "Continue with Okta",
				})}
				{"\u2001"}
				<Shield
					className="h-4 w-4"
					aria-hidden="true"
				/>
			</Button>
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() => HandleEnterpriseLogin("waad")}>
				{T("portal.enterprise.continueAzure", {
					defaultValue: "Continue with Azure AD",
				})}
				{"\u2001"}
				<Key
					className="h-4 w-4"
					aria-hidden="true"
				/>
			</Button>
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() => HandleEnterpriseLogin("samlp")}>
				{T("portal.enterprise.continueSAML", {
					defaultValue: "Continue with SAML",
				})}
				{"\u2001"}
				<Lock
					className="h-4 w-4"
					aria-hidden="true"
				/>
			</Button>

			<div className="PortalTierDivider StaccatoSeparator" />
			<p className="text-center text-xs text-muted-foreground">
				{T("portal.enterprise.note", {
					defaultValue:
						"OIDC Discovery \u00B7 SAML 2.0 \u00B7 SCIM provisioning",
				})}
			</p>
		</div>
	);
};

/**
 * Single tier row:login form on the left, feature description on the right.
 * Color-coded border by Protocol Spine identity.
 */
const PortalTierRow = ({
	Content,
	Index,
	OnAction,
	Labels,
}: {
	Content: TierContent;
	Index: number;
	OnAction?: () => void;
	Labels?: PortalContent["Labels"];
}) => {
	const RowReference = useRef<HTMLDivElement>(null);
	const [, SetEmail] = useState("");
	const [, SetPassword] = useState("");

	const IconComponent = Content.Icon
		? TierIconRegistry[Content.Icon] || Shield
		: Shield;

	// Apply Attention scatter per-row
	useEffect(() => {
		const Row = RowReference.current;
		if (!Row) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		const ApplyScatter = async () => {
			const AttentionModule =
				await import("../../Function/Noise/Attention.js");
			const Attention = await AttentionModule.default;
			Attention.ApplyToElement(Row, Index, 3, 2);
		};

		ApplyScatter();
	}, [Index]);

	const IsCloud = Content.Identifier === "Cloud";
	const IsProvider = Content.Identifier === "Provider";
	const IsLocalFirst = Content.Identifier === "LocalFirst";
	const IsEnterprise = Content.Identifier === "Enterprise";

	const TierBorderClass = IsCloud
		? "PortalTierCloud"
		: IsProvider
			? "PortalTierProvider"
			: IsEnterprise
				? "PortalTierEnterprise"
				: "PortalTierLocalFirst";

	return (
		<div
			ref={RowReference}
			className={`PortalTierRow ${TierBorderClass} StaccatoCard StaccatoBorderShimmer`}
			role="region"
			aria-label={`${Content.Title} authentication tier`}>
			{/* Left: Login Box */}
			<div className="PortalTierLogin">
				<Card className="PortalTierCard">
					<CardHeader className="PortalTierCardHeader">
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl">
								{Content.Title}
							</CardTitle>
							<div className="PortalTierIconWrapper">
								<IconComponent
									className="StaccatoIcon h-6 w-6"
									aria-hidden="true"
									style={{ color: Content.Color }}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{IsCloud && (
							<form
								className="space-y-4"
								onSubmit={(Event) => {
									Event.preventDefault();
									OnAction?.();
								}}
								aria-label="Cloud sign in form">
								<DynamicInput
									content={{
										label: "Email",
										placeholder: "name@example.com",
										type: "email",
										required: true,
										onChange: SetEmail,
									}}
									id={`portal-cloud-email`}
								/>
								<DynamicInput
									content={{
										label: "Password",
										placeholder: "Enter your password",
										type: "password",
										required: true,
										onChange: SetPassword,
									}}
									id={`portal-cloud-password`}
								/>
								<Button
									type="submit"
									className="StaccatoButton w-full"
									style={{
										backgroundColor: Content.Color,
										borderColor: Content.BorderColor,
										color: "#ffffff",
									}}>
									Secure Sign In
									{"\u2001"}
									<Lock
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
							</form>
						)}

						{IsProvider && (
							<div
								className="space-y-4"
								aria-label="Provider authentication options">
								<Button
									className="StaccatoButton w-full"
									variant="outline"
									style={{ borderColor: Content.BorderColor }}
									onClick={() => OnAction?.()}>
									Continue with GitHub
									{"\u2001"}
									<GitFork
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<Button
									className="StaccatoButton w-full"
									variant="outline"
									style={{ borderColor: Content.BorderColor }}
									onClick={() => OnAction?.()}>
									Continue with Google
									{"\u2001"}
									<Globe
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<Button
									className="StaccatoButton w-full"
									variant="outline"
									style={{ borderColor: Content.BorderColor }}
									onClick={() => OnAction?.()}>
									Continue with GitLab
									{"\u2001"}
									<GitFork
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<div className="PortalTierDivider StaccatoSeparator" />
								<p className="text-center text-xs text-muted-foreground">
									OAuth 2.0 &middot; Linked to your
									preferences
								</p>
							</div>
						)}

						{IsLocalFirst && (
							<div
								className="space-y-4"
								aria-label="Local-first connection">
								<div className="PortalTierDaemonStatus StaccatoBreath">
									<span className="text-xs font-medium">
										Air Daemon
									</span>
									<span className="ml-auto text-xs text-muted-foreground">
										Scanning...
									</span>
									{"\u2001"}
									<div className="PortalTierDaemonDot StaccatoRhythmDot" />
								</div>
								<Button
									className="StaccatoButton w-full"
									style={{
										backgroundColor: Content.Color,
										borderColor: Content.BorderColor,
										color: "#ffffff",
									}}
									onClick={() => OnAction?.()}>
									Connect to Air Daemon
									{"\u2001"}
									<Wifi
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<div className="PortalTierDivider StaccatoSeparator" />
								<p className="text-center text-xs text-muted-foreground">
									Zero cloud dependency &middot; JWT
									certificates &middot; mTLS
								</p>
							</div>
						)}

						{IsEnterprise && (
							<EnterpriseSSOForm
								Content={Content}
								OnEnterprise={OnAction}
							/>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Right: Feature Description */}
			<div className="PortalTierDescription">
				{Content.Badge && (
					<span
						className="StaccatoBadge StaccatoRhythmBeat PortalTierBadge"
						style={{
							color: Content.Color,
							borderColor: Content.BorderColor,
						}}>
						{Content.Badge}
					</span>
				)}

				<h3
					className="PortalTierDescriptionTitle"
					style={{ color: Content.Color }}>
					{Content.Title}
				</h3>

				<p className="PortalTierDescriptionSubtitle">
					{Content.Subtitle}
				</p>

				{/* Features list */}
				<div className="PortalTierFeatureList">
					<h4 className="PortalTierFeatureHeading">{Labels?.Included ?? "Included"}</h4>
					<ul className="PortalTierFeatureItems">
						{Content.Feature.map((FeatureText, FeatureIndex) => (
							<li
								key={FeatureIndex}
								className="PortalTierFeatureItem">
								<span className="text-sm">{FeatureText}</span>
								{"\u2001"}
								<Check
									className="StaccatoCheckmark h-4 w-4 shrink-0"
									aria-hidden="true"
									style={{ color: Content.Color }}
								/>
							</li>
						))}
					</ul>
				</div>

				{/* Capabilities list */}
				{Content.Capability.length > 0 && (
					<div className="PortalTierCapabilityList">
						<h4 className="PortalTierFeatureHeading">
							{Labels?.Capabilities ?? "Capabilities"}
						</h4>
						<div className="PortalTierCapabilityGrid">
							{Content.Capability.map(
								(CapabilityText, CapabilityIndex) => (
									<div
										key={CapabilityIndex}
										className="PortalTierCapabilityItem StaccatoBreath">
										<span className="text-xs">
											{CapabilityText}
										</span>
										{"\u2001"}
										<Shield
											className="h-3 w-3 shrink-0"
											aria-hidden="true"
											style={{ color: Content.Color }}
										/>
									</div>
								),
							)}
						</div>
					</div>
				)}

				{Content.Protocol && (
					<div className="PortalTierProtocol">
						<span className="text-xs font-medium text-muted-foreground">
							{Labels?.Protocol ?? "Protocol:"}
						</span>
						<code
							className="PortalTierProtocolCode"
							style={{ color: Content.Color }}>
							{Content.Protocol}
						</code>
					</div>
				)}

				{/* Settings managed badge:universal across all tiers */}
				<div className="PortalTierSettingsManaged StaccatoBorderShimmer">
					<span className="text-xs font-medium">
						{Labels?.SettingsManaged ?? "Settings Managed"}
					</span>
					<span className="text-xs text-muted-foreground">
						{Labels?.AllTiers ?? "Included in all tiers"}
					</span>
					{"\u2001"}
					<RefreshCw
						className="StaccatoIcon h-3.5 w-3.5"
						aria-hidden="true"
						style={{ color: Content.Color }}
					/>
				</div>
			</div>
		</div>
	);
};

/**
 * DynamicPortal:Three-tier authentication portal.
 *
 * Three distinct rows, each color-coded by Protocol Spine:
 *   Cloud (IPC blue):Secure online login
 *   Provider (WASM purple):GitHub/OAuth authentication
 *   LocalFirst (TCP orange):Air Daemon local-first connection
 *
 * Layout: Login box (left, white bg) | Feature description (right)
 * Staccato noise integration on all interactive elements.
 */
export function DynamicPortal({
	Content,
	OnSignIn,
	OnOAuth,
	OnConnect,
	OnEnterprise,
}: {
	Content: PortalContent;
	OnSignIn?: (Email: string, Password: string) => void;
	OnOAuth?: (Provider: string) => void;
	OnConnect?: () => void;
	OnEnterprise?: (Provider: string) => void;
}) {
	const SectionReference = useRef<HTMLElement>(null);

	// Start Staccato noise engine
	useEffect(() => {
		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		let StopFunction: (() => void) | undefined;

		const StartNoise = async () => {
			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");
			const Staccato = await StaccatoModule.default;
			Staccato.Start();
			StopFunction = Staccato.Stop;

			// Seed all portal rows
			Staccato.SeedSelector(".PortalTierRow");
		};

		StartNoise();

		return () => {
			StopFunction?.();
		};
	}, []);

	return (
		<section
			ref={SectionReference}
			id="portal"
			className="PortalSection"
			aria-label="Authentication Portal">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="PortalHeader StaccatoBreath">
					<h1 className="PortalTitle">{Content.Title}</h1>
					<p className="PortalSubtitle">{Content.Subtitle}</p>
				</div>

				{/* Three Tier Rows */}
				<div className="PortalTierGrid">
					<PortalTierRow
						Content={Content.Cloud}
						Index={0}
						OnAction={() => OnSignIn?.("", "")}
						Labels={Content.Labels}
					/>

					<PortalTierRow
						Content={Content.Provider}
						Index={1}
						OnAction={() => OnOAuth?.("github")}
						Labels={Content.Labels}
					/>

					<PortalTierRow
						Content={Content.LocalFirst}
						Index={2}
						OnAction={() => OnConnect?.()}
						Labels={Content.Labels}
					/>

					{Content.Enterprise && (
						<PortalTierRow
							Content={Content.Enterprise}
							Index={3}
							OnAction={() => OnEnterprise?.("okta")}
							Labels={Content.Labels}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
