import * as lucide from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card";
import { IconTooltip } from "../UI/IconTooltip.js";
import { DynamicInput } from "./DynamicInput";
import type PortalContent from "./Interface/Content/Page/Portal.js";
import type TierContent from "./Interface/Content/Portal/Tier.js";

/**
 * Icon registry for tier icons.
 *
 * Covers the full CodeEditorLand technology stack:
 *   - Core runtime:        Cpu, Zap, Layers, Network, Radio, Timer
 *   - Platform/OS:         Laptop, Monitor, HardDrive, Server, Terminal
 *   - Language/build:      Code, Wrench, Package, PackageOpen, Hammer, FlaskConical
 *   - Git/VCS:             GitBranch, GitFork, GitCommit, GitPullRequest, FolderGit
 *   - Identity/crypto:     Key, KeyRound, Lock, Hash, Fingerprint, Shield
 *   - Cloud/sync:          Cloud, RefreshCw, RefreshCcw, RotateCcw, Database
 *   - Auth/provisioning:   UserPlus, Users, Building2, Blocks
 *   - Extensions/plugins:  Puzzle, Box, CirclePlay, Rocket
 *   - Connectivity:        Wifi, WifiOff, Globe, Unplug, Link2, ExternalLink
 *   - Audit/docs:          FileText, Activity, AlertTriangle, Info
 *   - Settings/config:     Settings, Sliders, CheckCircle, Check, ChevronRight
 *   - AI/intelligence:     BrainCircuit
 *   - Support/lifecycle:   LifeBuoy, Download, Search
 */
const TierIconRegistry: Record<string, lucide.LucideIcon> = {
	Activity: lucide.Activity,
	AlertTriangle: lucide.AlertTriangle,
	Blocks: lucide.Blocks,
	Box: lucide.Box,
	BrainCircuit: lucide.BrainCircuit,
	Building2: lucide.Building2,
	Check: lucide.Check,
	CheckCircle: lucide.CheckCircle,
	ChevronRight: lucide.ChevronRight,
	CirclePlay: lucide.CirclePlay,
	Cloud: lucide.Cloud,
	Code: lucide.Code,
	Cpu: lucide.Cpu,
	Database: lucide.Database,
	Download: lucide.Download,
	ExternalLink: lucide.ExternalLink,
	FileText: lucide.FileText,
	Fingerprint: lucide.Fingerprint,
	FlaskConical: lucide.FlaskConical,
	FolderGit: lucide.FolderGit,
	GitBranch: lucide.GitBranch,
	GitCommit: lucide.GitCommit,
	GitFork: lucide.GitFork,
	GitPullRequest: lucide.GitPullRequest,
	Globe: lucide.Globe,
	Hammer: lucide.Hammer,
	HardDrive: lucide.HardDrive,
	Hash: lucide.Hash,
	Info: lucide.Info,
	Key: lucide.Key,
	KeyRound: lucide.KeyRound,
	Laptop: lucide.Laptop,
	Layers: lucide.Layers,
	LifeBuoy: lucide.LifeBuoy,
	Link2: lucide.Link2,
	Lock: lucide.Lock,
	Monitor: lucide.Monitor,
	Network: lucide.Network,
	Package: lucide.Package,
	PackageOpen: lucide.PackageOpen,
	Puzzle: lucide.Puzzle,
	Radio: lucide.Radio,
	RefreshCcw: lucide.RefreshCcw,
	RefreshCw: lucide.RefreshCw,
	Rocket: lucide.Rocket,
	RotateCcw: lucide.RotateCcw,
	Search: lucide.Search,
	Server: lucide.Server,
	Settings: lucide.Settings,
	Shield: lucide.Shield,
	Sliders: lucide.Sliders,
	Terminal: lucide.Terminal,
	Timer: lucide.Timer,
	Unplug: lucide.Unplug,
	UserPlus: lucide.UserPlus,
	Users: lucide.Users,
	Wifi: lucide.Wifi,
	WifiOff: lucide.WifiOff,
	Wrench: lucide.Wrench,
	Zap: lucide.Zap,
};

const IconLabelMap: Record<string, string> = {
	Activity: "Activity",
	AlertTriangle: "Warning",
	Blocks: "Blocks",
	Box: "Package",
	BrainCircuit: "AI",
	Building2: "Enterprise",
	Check: "Check",
	CheckCircle: "Verified",
	ChevronRight: "Navigate",
	CirclePlay: "Pipeline",
	Cloud: "Cloud",
	Code: "Code",
	Cpu: "CPU",
	Database: "Database",
	Download: "Download",
	ExternalLink: "External",
	FileText: "Audit Log",
	Fingerprint: "Identity",
	FlaskConical: "Testing",
	FolderGit: "Repository",
	GitBranch: "Repository",
	GitCommit: "Commit",
	GitFork: "Source Control",
	GitPullRequest: "Pull Request",
	Globe: "Web",
	Hammer: "Build",
	HardDrive: "Storage",
	Hash: "Hash",
	Info: "Info",
	Key: "Authentication",
	KeyRound: "Single Sign-On",
	Laptop: "Desktop App",
	Layers: "Layers",
	LifeBuoy: "Support",
	Link2: "Link",
	Lock: "Encryption",
	Monitor: "Device",
	Network: "Network",
	Package: "Package",
	PackageOpen: "Open Source",
	Puzzle: "Extensions",
	Radio: "Radio",
	RefreshCcw: "Hard Reset",
	RefreshCw: "Sync",
	Rocket: "Deploy",
	RotateCcw: "Undo",
	Search: "Search",
	Server: "Server",
	Settings: "Configuration",
	Shield: "Security",
	Sliders: "Settings",
	Terminal: "Terminal",
	Timer: "Timer",
	Unplug: "Disconnect",
	UserPlus: "Provisioning",
	Users: "Team",
	Wifi: "Connection",
	WifiOff: "Offline",
	Wrench: "Tooling",
	Zap: "Performance",
};

/**
 * Semantic icon color map - per-icon, domain-grouped, tier-independent.
 *
 * Each color group represents a function domain. Colors are chosen to be:
 *   - Visually distinct from each other
 *   - Visually distinct from the 4 tier border colors
 *     (Cloud #3b82f6, Provider #8b5cf6, LocalFirst #f97316, Enterprise #374151)
 *   - Readable at 16px on both light and dark surfaces
 *
 * Groups:
 *   Identity/crypto   → indigo   #6366f1
 *   Network/connect   → sky      #0ea5e9
 *   Storage/hardware  → slate    #64748b
 *   Build/code        → emerald  #10b981
 *   Git/VCS           → amber    #f59e0b
 *   Cloud/sync/deploy → blue     #3b82f6
 *   Auth/provision    → violet   #7c3aed
 *   Audit/docs        → teal     #14b8a6
 *   Settings/config   → slate-4  #94a3b8
 *   Connectivity misc → orange   #f97316
 *   AI                → purple   #a855f7
 *   Support/lifecycle → pink     #ec4899
 */
const IconColorMap: Record<string, string> = {
	// Identity / crypto - TierEnterprise (charcoal → SpineWASM for identity)
	Lock: "var(--SpineWASMFore)",
	Key: "var(--SpineWASMFore)",
	Fingerprint: "var(--SpineWASMFore)",
	Shield: "var(--SpineWASMFore)",

	// Network / connect - TierLocalFirst (TCP orange)
	Wifi: "var(--SpineTCPFore)",
	WifiOff: "var(--SpineTCPFore)",
	Globe: "var(--SpineIPCFore)",
	Network: "var(--SpineIPCFore)",
	Radio: "var(--SpineTCPFore)",
	Link2: "var(--SpineIPCFore)",

	// Storage / hardware - PlatformDesktop slate
	HardDrive: "var(--PlatformDesktopFore)",
	Server: "var(--PlatformDesktopFore)",
	Database: "var(--DatabasePostgresFore)",
	Cpu: "var(--PlatformDesktopFore)",
	Terminal: "var(--PlatformCLIFore)",

	// Build / code - ExtensionRust / LanguageRust emerald
	Code: "var(--SpinegRPCFore)",
	Wrench: "var(--SpinegRPCFore)",
	Hammer: "var(--SpinegRPCFore)",
	FlaskConical: "var(--SpinegRPCFore)",
	Package: "var(--SpinegRPCFore)",
	PackageOpen: "var(--SpinegRPCFore)",
	Box: "var(--SpinegRPCFore)",
	Puzzle: "var(--PlatformExtensionFore)",

	// Git / VCS - LanguageJavaScript amber
	GitBranch: "var(--LanguageJavaScriptFore)",
	GitFork: "var(--LanguageJavaScriptFore)",
	GitCommit: "var(--LanguageJavaScriptFore)",
	GitPullRequest: "var(--LanguageJavaScriptFore)",
	FolderGit: "var(--LanguageJavaScriptFore)",

	// Cloud / sync / deploy - TierCloud (SpineIPC blue)
	Cloud: "var(--TierCloudFore)",
	RefreshCw: "var(--TierCloudFore)",
	RefreshCcw: "var(--TierCloudFore)",
	RotateCcw: "var(--TierCloudFore)",
	Download: "var(--TierCloudFore)",
	Rocket: "var(--TierCloudFore)",
	Timer: "var(--TierCloudFore)",
	Zap: "var(--TierCloudFore)",

	// Auth / provisioning - TierProvider (SpineWASM violet)
	KeyRound: "var(--TierProviderFore)",
	UserPlus: "var(--TierProviderFore)",
	Users: "var(--TierProviderFore)",
	Building2: "var(--TierProviderFore)",
	Blocks: "var(--TierProviderFore)",

	// Audit / docs - DatabaseTurso teal
	FileText: "var(--DatabaseTursoFore)",
	Activity: "var(--DatabaseTursoFore)",
	AlertTriangle: "var(--DatabaseTursoFore)",
	Info: "var(--DatabaseTursoFore)",
	Search: "var(--DatabaseTursoFore)",

	// Settings / config - PlatformDesktop slate
	Settings: "var(--PlatformDesktop)",
	Sliders: "var(--PlatformDesktop)",
	CheckCircle: "var(--PlatformDesktop)",
	Check: "var(--PlatformDesktop)",
	ChevronRight: "var(--PlatformDesktop)",

	// Connectivity misc - TierLocalFirst (SpineTCP orange)
	Unplug: "var(--TierLocalFirstFore)",
	ExternalLink: "var(--TierLocalFirstFore)",
	Layers: "var(--TierLocalFirstFore)",
	Hash: "var(--TierLocalFirstFore)",

	// AI - SpineWASM purple
	BrainCircuit: "var(--SpineWASM)",

	// Support / lifecycle - PlatformMobile pink
	LifeBuoy: "var(--PlatformMobileFore)",
	CirclePlay: "var(--PlatformMobileFore)",
	Monitor: "var(--PlatformMobileFore)",
	Laptop: "var(--PlatformMobileFore)",
};

/**
 * Enterprise SSO form with organization domain input and Auth0 redirect buttons.
 * Routes through Auth0 Enterprise Connections (Okta, Azure AD, SAML).
 */
const EnterpriseSSOForm = ({ Content }: { Content: TierContent }) => {
	const [OrganizationDomain, SetOrganizationDomain] = useState("");
	const [OktaDomain, SetOktaDomain] = useState("");
	const [AzureTenant, SetAzureTenant] = useState("");
	const [SamlMetadata, SetSamlMetadata] = useState("");
	const { t: T } = useTranslation("account");

	const HandleEnterpriseLogin = (
		Connection: string,
		Extra?: Record<string, string>,
	) => {
		const Params = new URLSearchParams();
		Params.set("connection", Connection);
		if (OrganizationDomain.trim()) {
			Params.set("login_hint", OrganizationDomain.trim());
		}
		if (Extra) {
			for (const [Key, Value] of Object.entries(Extra)) {
				if (Value.trim()) {
					Params.set(Key, Value.trim());
				}
			}
		}
		window.location.href = `/Account/SignIn?${Params.toString()}`;
	};

	const HandleDomainSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (!OrganizationDomain.trim()) return;
		window.location.href = `/Account/SignIn?login_hint=${encodeURIComponent(
			OrganizationDomain.trim(),
		)}`;
	};

	return (
		<div
			className="space-y-4"
			aria-label={T("portal.enterprise.ariaLabel", {
				defaultValue: "Enterprise SSO",
			})}>
			<form onSubmit={HandleDomainSubmit} className="space-y-3">
				<DynamicInput
					Content={{
						Label: T("portal.enterprise.domainLabel", {
							defaultValue: "Work Email or Domain",
						}),
						Placeholder: T("portal.enterprise.domainPlaceholder", {
							defaultValue: "name@company.com",
						}),
						Type: "email",
						Required: false,
						OnChange: SetOrganizationDomain,
					}}
					Id="portal-enterprise-domain"
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
					<lucide.Building2 className="h-4 w-4" aria-hidden="true" />
				</Button>
			</form>

			<div className="PortalTierDivider StaccatoSeparator" />

			<DynamicInput
				Content={{
					Label: T("portal.enterprise.oktaDomainLabel", {
						defaultValue: "Okta Domain",
					}),
					Placeholder: T("portal.enterprise.oktaDomainPlaceholder", {
						defaultValue: "your-org.okta.com",
					}),
					Type: "text",
					Required: false,
					OnChange: SetOktaDomain,
				}}
				Id="portal-enterprise-okta-domain"
			/>
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() =>
					HandleEnterpriseLogin("okta", {
						okta_domain: OktaDomain,
					})
				}>
				{T("portal.enterprise.continueOkta", {
					defaultValue: "Continue with Okta",
				})}
				{"\u2001"}
				<img
					src="/Image/Okta.svg"
					alt="Okta"
					title="Okta"
					width="20"
					height="20"
					className="h-5 w-5"
				/>
			</Button>

			<DynamicInput
				Content={{
					Label: T("portal.enterprise.azureTenantLabel", {
						defaultValue: "Azure AD Tenant ID",
					}),
					Placeholder: T("portal.enterprise.azureTenantPlaceholder", {
						defaultValue: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
					}),
					Type: "text",
					Required: false,
					OnChange: SetAzureTenant,
				}}
				Id="portal-enterprise-azure-tenant"
			/>
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() =>
					HandleEnterpriseLogin("waad", {
						tenant: AzureTenant,
					})
				}>
				{T("portal.enterprise.continueAzure", {
					defaultValue: "Continue with Azure AD",
				})}
				{"\u2001"}
				<img
					src="/Image/Microsoft.svg"
					alt="Microsoft"
					title="Microsoft Azure AD"
					width="20"
					height="20"
					className="h-5 w-5"
				/>
			</Button>

			<DynamicInput
				Content={{
					Label: T("portal.enterprise.samlMetadataLabel", {
						defaultValue: "SAML Metadata URL",
					}),
					Placeholder: T(
						"portal.enterprise.samlMetadataPlaceholder",
						{
							defaultValue: "https://your-idp.com/metadata.xml",
						},
					),
					Type: "url",
					Required: false,
					OnChange: SetSamlMetadata,
				}}
				Id="portal-enterprise-saml-metadata"
			/>
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() =>
					HandleEnterpriseLogin("samlp", {
						saml_metadata_url: SamlMetadata,
					})
				}>
				{T("portal.enterprise.continueSAML", {
					defaultValue: "Continue with SAML",
				})}
				{"\u2001"}
				<lucide.Lock className="h-4 w-4" aria-hidden="true" />
			</Button>

			<div className="PortalTierDivider StaccatoSeparator" />
			<p className="text-center text-xs text-muted-foreground">
				{T("portal.enterprise.note", {
					defaultValue:
						"OIDC Discovery \u2001+\u2001 SAML 2.0 \u2001+\u2001 SCIM provisioning",
				})}
			</p>
		</div>
	);
};

/**
 * Single tier row: login form on the left, feature description on the right.
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
	const { t: T } = useTranslation("account");

	const IconComponent = Content.Icon
		? TierIconRegistry[Content.Icon] || lucide.Shield
		: lucide.Shield;

	const TierIconLabel = IconLabelMap[Content.Icon ?? ""] ?? Content.Title;

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
							{/* Tier header icon - tooltip shows tier identity label on hover */}
							<div className="PortalTierIconWrapper">
								<IconTooltip
									Label={TierIconLabel}
									Icon={IconComponent}
									Color={Content.Color}
									SizeClass="h-6 w-6"
									ClassName="StaccatoIcon"
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
									Content={{
										Label: T("portal.cloud.emailLabel", {
											defaultValue: "Email",
										}),
										Placeholder: T(
											"portal.cloud.emailPlaceholder",
											{
												defaultValue:
													"name@example.com",
											},
										),
										Type: "email",
										Required: true,
										OnChange: SetEmail,
									}}
									Id="portal-cloud-email"
								/>
								<DynamicInput
									Content={{
										Label: T("portal.cloud.passwordLabel", {
											defaultValue: "Password",
										}),
										Placeholder: T(
											"portal.cloud.passwordPlaceholder",
											{
												defaultValue:
													"Enter your password",
											},
										),
										Type: "password",
										Required: true,
										OnChange: SetPassword,
									}}
									Id="portal-cloud-password"
								/>
								<Button
									type="submit"
									className="StaccatoButton w-full"
									style={{
										backgroundColor: Content.Color,
										borderColor: Content.BorderColor,
										color: "#ffffff",
									}}>
									{T("portal.cloud.signIn", {
										defaultValue: "Secure Sign In",
									})}
									{"\u2001"}
									<lucide.Lock
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
									{T("portal.provider.continueGitHub", {
										defaultValue: "Continue with GitHub",
									})}
									{"\u2001"}
									<img
										src="/Image/GitHub.svg"
										alt="GitHub"
										title="GitHub"
										width="20"
										height="20"
										className="h-5 w-5"
									/>
								</Button>
								<Button
									className="StaccatoButton w-full"
									variant="outline"
									style={{ borderColor: Content.BorderColor }}
									onClick={() => OnAction?.()}>
									{T("portal.provider.continueGoogle", {
										defaultValue: "Continue with Google",
									})}
									{"\u2001"}
									<img
										src="/Image/Google.svg"
										alt="Google"
										title="Google"
										width="20"
										height="20"
										className="h-5 w-5"
									/>
								</Button>
								<Button
									className="StaccatoButton w-full"
									variant="outline"
									style={{ borderColor: Content.BorderColor }}
									onClick={() => OnAction?.()}>
									{T("portal.provider.continueGitLab", {
										defaultValue: "Continue with GitLab",
									})}
									{"\u2001"}
									<img
										src="/Image/GitLab.svg"
										alt="GitLab"
										title="GitLab"
										width="20"
										height="20"
										className="h-5 w-5"
									/>
								</Button>
								<div className="PortalTierDivider StaccatoSeparator" />
								<p className="text-center text-xs text-muted-foreground">
									{T("portal.provider.oauthNote", {
										defaultValue:
											"OAuth 2.0 \u00b7 Linked to your preferences",
									})}
								</p>
							</div>
						)}

						{IsLocalFirst && (
							<div
								className="space-y-4"
								aria-label="Local-first connection">
								<div className="PortalTierDaemonStatus StaccatoBreath">
									<span className="text-xs font-medium">
										{T("portal.localfirst.daemonLabel", {
											defaultValue: "Air Daemon",
										})}
									</span>
									<span className="ml-auto text-xs text-muted-foreground">
										{T("portal.localfirst.daemonStatus", {
											defaultValue: "Scanning...",
										})}
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
									{T("portal.localfirst.connect", {
										defaultValue: "Connect to Air Daemon",
									})}
									{"\u2001"}
									<lucide.Wifi
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<div className="PortalTierDivider StaccatoSeparator" />
								<p className="text-center text-xs text-muted-foreground">
									{T("portal.localfirst.note", {
										defaultValue:
											"Zero cloud dependency \u00b7 JWT certificates \u00b7 mTLS",
									})}
								</p>
							</div>
						)}

						{IsEnterprise && (
							<EnterpriseSSOForm Content={Content} />
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
					<h4 className="PortalTierFeatureHeading">
						{Labels?.Included ??
							T("portal.labels.included", {
								defaultValue: "Included",
							})}
					</h4>
					<ul className="PortalTierFeatureItems">
						{Content.Feature.map((Feature, FeatureIndex) => (
							<li
								key={FeatureIndex}
								className="PortalTierFeatureItem">
								<span className="text-sm font-medium">
									{Feature.Heading}
								</span>
								<span className="text-xs text-muted-foreground">
									{Feature.Description}
									{Feature.Icon &&
										Feature.Icon.length > 0 && (
											<span
												className="inline-flex items-center align-middle"
												role="img"
												aria-label={`${
													Feature.Heading
												} technology stack`}>
												{Feature.Icon.map(
													(IconName, IconIndex) => {
														// Derive label: SVG path → filename without extension;
														// Lucide key → IconLabelMap lookup.
														const IconLabel =
															IconName.startsWith(
																"/",
															)
																? (IconName.split(
																		"/",
																	)
																		.pop()
																		?.replace(
																			".svg",
																			"",
																		) ?? "")
																: (IconLabelMap[
																		IconName
																	] ??
																	IconName);

														const LucideColor =
															IconColorMap[
																IconName
															] ??
															"var(--PlatformDesktop)";

														return (
															<span
																key={IconIndex}
																className="inline-flex items-center">
																{IconIndex ===
																0 ? (
																	"\u2001"
																) : (
																	<>
																		{
																			"\u2001"
																		}
																		{"+"}
																		{
																			"\u2001"
																		}
																	</>
																)}
																{IconName.startsWith(
																	"/",
																) ? (
																	<IconTooltip
																		Label={
																			IconLabel
																		}>
																		<img
																			src={
																				IconName
																			}
																			alt={
																				IconLabel
																			}
																			title={
																				IconLabel
																			}
																			width="16"
																			height="16"
																			className="h-4 w-4"
																		/>
																	</IconTooltip>
																) : (
																	(() => {
																		const FeatureIcon =
																			TierIconRegistry[
																				IconName
																			];
																		return FeatureIcon ? (
																			<IconTooltip
																				Label={
																					IconLabel
																				}
																				Icon={
																					FeatureIcon
																				}
																				Color={
																					LucideColor
																				}
																				SizeClass="h-4 w-4"
																			/>
																		) : null;
																	})()
																)}
															</span>
														);
													},
												)}
											</span>
										)}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Capabilities list */}
				{Content.Capability.length > 0 && (
					<div className="PortalTierCapabilityList">
						<h4 className="PortalTierFeatureHeading">
							{Labels?.Capabilities ??
								T("portal.labels.capabilities", {
									defaultValue: "Capabilities",
								})}
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
										<IconTooltip
											Label="Security"
											Icon={lucide.Shield}
											Color={
												IconColorMap["Shield"] ??
												"var(--SpineWASMFore)"
											}
											SizeClass="h-3 w-3 shrink-0"
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

				<div className="PortalTierSettingsManaged StaccatoBorderShimmer">
					<span className="text-xs font-medium">
						{Labels?.SettingsManaged ?? "Settings Managed"}
					</span>
					{"\u2001"}
					<span className="text-xs text-muted-foreground">
						{Labels?.AllTiers ?? "Included in all tiers"}
					</span>
					{"\u2001"}
					<IconTooltip
						Label="Sync"
						Icon={lucide.RefreshCw}
						Color={
							IconColorMap["RefreshCw"] ?? "var(--TierCloudFore)"
						}
						SizeClass="h-3.5 w-3.5"
						ClassName="StaccatoIcon"
					/>
				</div>
			</div>
		</div>
	);
};

/**
 * DynamicPortal: Three-tier authentication portal.
 *
 * Three distinct rows, each color-coded by Protocol Spine:
 *   Cloud (IPC blue): Secure online login
 *   Provider (WASM purple): GitHub/OAuth authentication
 *   LocalFirst (TCP orange): Air Daemon local-first connection
 *   Enterprise (charcoal): OIDC/SAML/SCIM enterprise SSO
 *
 * Layout: Login box (left, white bg) | Feature description (right)
 * Staccato noise integration on all interactive elements.
 *
 * TierIconRegistry covers 59 icons spanning the full CEL technology stack.
 * Feature.Icon[] arrays accept both Lucide registry keys and /Image/*.svg paths.
 *
 * Icon accessibility (IconTooltip):
 *   Every icon in the tier header, feature stack, capability list, and
 *   settings footer is wrapped in <IconTooltip> - three layers:
 *     1. aria-label on the trigger <span>  - screen reader announcement
 *     2. title on the trigger <span>       - native browser tooltip fallback
 *     3. Radix TooltipContent              - styled hover tooltip (sighted users)
 *   DocHref prop is reserved for future doc-link integration.
 *   Button-chrome icons (Lock, Wifi, Building2) that follow visible button
 *   text are exempted and keep aria-hidden="true" - they are decorative there.
 */
const DynamicPortal = ({
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
}) => {
	const SectionReference = useRef<HTMLElement>(null);

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
				<div className="PortalHeader StaccatoBreath">
					<h1 className="PortalTitle">{Content.Title}</h1>
					<p className="PortalSubtitle">{Content.Subtitle}</p>
				</div>

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
};

export { DynamicPortal };
export default DynamicPortal;
