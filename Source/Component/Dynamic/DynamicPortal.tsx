import {
	Activity,
	AlertTriangle,
	Blocks,
	Box,
	BrainCircuit,
	Building2,
	Check,
	CheckCircle,
	ChevronRight,
	CirclePlay,
	Cloud,
	Code,
	Cpu,
	Database,
	Download,
	ExternalLink,
	FileText,
	Fingerprint,
	FlaskConical,
	FolderGit,
	GitBranch,
	GitCommit,
	GitFork,
	GitPullRequest,
	Globe,
	Hammer,
	HardDrive,
	Hash,
	Info,
	Key,
	KeyRound,
	Laptop,
	Layers,
	LifeBuoy,
	Link2,
	Lock,
	Monitor,
	Network,
	Package,
	PackageOpen,
	Puzzle,
	Radio,
	RefreshCcw,
	RefreshCw,
	Rocket,
	RotateCcw,
	Search,
	Server,
	Settings,
	Shield,
	Sliders,
	Terminal,
	Timer,
	Unplug,
	UserPlus,
	Users,
	Wifi,
	WifiOff,
	Wrench,
	Zap,
	type LucideIcon,
} from "lucide-react";
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
 *   — Core runtime:        Cpu, Zap, Layers, Network, Radio, Timer
 *   — Platform/OS:         Laptop, Monitor, HardDrive, Server, Terminal
 *   — Language/build:      Code, Wrench, Package, PackageOpen, Hammer, FlaskConical
 *   — Git/VCS:             GitBranch, GitFork, GitCommit, GitPullRequest, FolderGit
 *   — Identity/crypto:     Key, KeyRound, Lock, Hash, Fingerprint, Shield
 *   — Cloud/sync:          Cloud, RefreshCw, RefreshCcw, RotateCcw, Database
 *   — Auth/provisioning:   UserPlus, Users, Building2, Blocks
 *   — Extensions/plugins:  Puzzle, Box, CirclePlay, Rocket
 *   — Connectivity:        Wifi, WifiOff, Globe, Unplug, Link2, ExternalLink
 *   — Audit/docs:          FileText, Activity, AlertTriangle, Info
 *   — Settings/config:     Settings, Sliders, CheckCircle, Check, ChevronRight
 *   — AI/intelligence:     BrainCircuit
 *   — Support/lifecycle:   LifeBuoy, Download, Search
 */
const TierIconRegistry: Record<string, LucideIcon> = {
	Activity,
	AlertTriangle,
	Blocks,
	Box,
	BrainCircuit,
	Building2,
	Check,
	CheckCircle,
	ChevronRight,
	CirclePlay,
	Cloud,
	Code,
	Cpu,
	Database,
	Download,
	ExternalLink,
	FileText,
	Fingerprint,
	FlaskConical,
	FolderGit,
	GitBranch,
	GitCommit,
	GitFork,
	GitPullRequest,
	Globe,
	Hammer,
	HardDrive,
	Hash,
	Info,
	Key,
	KeyRound,
	Laptop,
	Layers,
	LifeBuoy,
	Link2,
	Lock,
	Monitor,
	Network,
	Package,
	PackageOpen,
	Puzzle,
	Radio,
	RefreshCcw,
	RefreshCw,
	Rocket,
	RotateCcw,
	Search,
	Server,
	Settings,
	Shield,
	Sliders,
	Terminal,
	Timer,
	Unplug,
	UserPlus,
	Users,
	Wifi,
	WifiOff,
	Wrench,
	Zap,
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
 * Semantic icon color map — per-icon, domain-grouped, tier-independent.
 *
 * Each color group represents a function domain. Colors are chosen to be:
 *   — Visually distinct from each other
 *   — Visually distinct from the 4 tier border colors
 *     (Cloud #3b82f6, Provider #8b5cf6, LocalFirst #f97316, Enterprise #374151)
 *   — Readable at 16px on both light and dark surfaces
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
	// Identity / crypto — indigo
	Lock: "#6366f1",
	Key: "#6366f1",
	Fingerprint: "#6366f1",
	Shield: "#6366f1",

	// Network / connect — sky
	Wifi: "#0ea5e9",
	WifiOff: "#0ea5e9",
	Globe: "#0ea5e9",
	Network: "#0ea5e9",
	Radio: "#0ea5e9",
	Link2: "#0ea5e9",

	// Storage / hardware — slate
	HardDrive: "#64748b",
	Server: "#64748b",
	Database: "#64748b",
	Cpu: "#64748b",
	Terminal: "#64748b",

	// Build / code — emerald
	Code: "#10b981",
	Wrench: "#10b981",
	Hammer: "#10b981",
	FlaskConical: "#10b981",
	Package: "#10b981",
	PackageOpen: "#10b981",
	Box: "#10b981",
	Puzzle: "#10b981",

	// Git / VCS — amber
	GitBranch: "#f59e0b",
	GitFork: "#f59e0b",
	GitCommit: "#f59e0b",
	GitPullRequest: "#f59e0b",
	FolderGit: "#f59e0b",

	// Cloud / sync / deploy — blue
	Cloud: "#3b82f6",
	RefreshCw: "#3b82f6",
	RefreshCcw: "#3b82f6",
	RotateCcw: "#3b82f6",
	Download: "#3b82f6",
	Rocket: "#3b82f6",
	Timer: "#3b82f6",
	Zap: "#3b82f6",

	// Auth / provisioning — violet
	KeyRound: "#7c3aed",
	UserPlus: "#7c3aed",
	Users: "#7c3aed",
	Building2: "#7c3aed",
	Blocks: "#7c3aed",

	// Audit / docs — teal
	FileText: "#14b8a6",
	Activity: "#14b8a6",
	AlertTriangle: "#14b8a6",
	Info: "#14b8a6",
	Search: "#14b8a6",

	// Settings / config — slate-400
	Settings: "#94a3b8",
	Sliders: "#94a3b8",
	CheckCircle: "#94a3b8",
	Check: "#94a3b8",
	ChevronRight: "#94a3b8",

	// Connectivity misc — orange
	Unplug: "#f97316",
	ExternalLink: "#f97316",
	Layers: "#f97316",
	Hash: "#f97316",

	// AI — purple
	BrainCircuit: "#a855f7",

	// Support / lifecycle — pink
	LifeBuoy: "#ec4899",
	CirclePlay: "#ec4899",
	Monitor: "#ec4899",
	Laptop: "#ec4899",
};

/**
 * Enterprise SSO form with organization domain input and Auth0 redirect buttons.
 * Routes through Auth0 Enterprise Connections (Okta, Azure AD, SAML).
 */
const EnterpriseSSOForm = ({ Content }: { Content: TierContent }) => {
	const [OrganizationDomain, SetOrganizationDomain] = useState("");
	const { t: T } = useTranslation("account");

	const HandleEnterpriseLogin = (Connection: string) => {
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
					content={{
						label: T("portal.enterprise.domainLabel", {
							defaultValue: "Work Email or Domain",
						}),
						placeholder: T("portal.enterprise.domainPlaceholder", {
							defaultValue: "name@company.com",
						}),
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
					{"+"}
					{"\u2001"}
					<Building2 className="h-4 w-4" aria-hidden="true" />
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
				{"+"}
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
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() => HandleEnterpriseLogin("waad")}>
				{T("portal.enterprise.continueAzure", {
					defaultValue: "Continue with Azure AD",
				})}
				{"\u2001"}
				{"+"}
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
			<Button
				className="StaccatoButton w-full"
				variant="outline"
				style={{ borderColor: Content.BorderColor }}
				onClick={() => HandleEnterpriseLogin("samlp")}>
				{T("portal.enterprise.continueSAML", {
					defaultValue: "Continue with SAML",
				})}
				{"\u2001"}
				{"+"}
				{"\u2001"}
				<Lock className="h-4 w-4" aria-hidden="true" />
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

	const IconComponent = Content.Icon
		? TierIconRegistry[Content.Icon] || Shield
		: Shield;

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
							{/* Tier header icon — tooltip shows tier identity label on hover */}
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
									content={{
										label: "Email",
										placeholder: "name@example.com",
										type: "email",
										required: true,
										onChange: SetEmail,
									}}
									id="portal-cloud-email"
								/>
								<DynamicInput
									content={{
										label: "Password",
										placeholder: "Enter your password",
										type: "password",
										required: true,
										onChange: SetPassword,
									}}
									id="portal-cloud-password"
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
									{"+"}
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
									{"+"}
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
									Continue with Google
									{"\u2001"}
									{"+"}
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
									Continue with GitLab
									{"\u2001"}
									{"+"}
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
									{"OAuth 2.0"}
									{"\u2001"}
									{"+"}
									{"\u2001"}
									{"Linked to your preferences"}
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
									{"+"}
									{"\u2001"}
									<Wifi
										className="h-4 w-4"
										aria-hidden="true"
									/>
								</Button>
								<div className="PortalTierDivider StaccatoSeparator" />
								<p className="text-center text-xs text-muted-foreground">
									{"Zero cloud dependency"}
									{"\u2001"}
									{"+"}
									{"\u2001"}
									{"JWT certificates"}
									{"\u2001"}
									{"+"}
									{"\u2001"}
									{"mTLS"}
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
						{Labels?.Included ?? "Included"}
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
															IconName.startsWith("/")
																? (IconName.split("/")
																		.pop()
																		?.replace(".svg", "") ??
																	"")
																: (IconLabelMap[IconName] ??
																		IconName);

														const LucideColor =
															IconColorMap[IconName] ??
															"#94a3b8";

														return (
															<span
																key={IconIndex}
																className="inline-flex items-center">
																{"\u2001"}
																{"+"}
																{"\u2001"}
																{IconName.startsWith("/") ? (
																	<IconTooltip Label={IconLabel}>
																		<img
																			src={IconName}
																			alt={IconLabel}
																			title={IconLabel}
																			width="16"
																			height="16"
																			className="h-4 w-4"
																		/>
																	</IconTooltip>
																) : (() => {
																	const FeatureIcon =
																		TierIconRegistry[IconName];
																	return FeatureIcon ? (
																		<IconTooltip
																			Label={IconLabel}
																			Icon={FeatureIcon}
																			Color={LucideColor}
																			SizeClass="h-4 w-4"
																		/>
																	) : null;
																})()
																}
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
										{"+"}
										{"\u2001"}
										<IconTooltip
											Label="Security"
											Icon={Shield}
											Color={IconColorMap["Shield"] ?? "#6366f1"}
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
					{"+"}
					{"\u2001"}
					<span className="text-xs text-muted-foreground">
						{Labels?.AllTiers ?? "Included in all tiers"}
					</span>
					{"\u2001"}
					{"+"}
					{"\u2001"}
					<IconTooltip
						Label="Sync"
						Icon={RefreshCw}
						Color={IconColorMap["RefreshCw"] ?? "#3b82f6"}
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
 *   settings footer is wrapped in <IconTooltip> — three layers:
 *     1. aria-label on the trigger <span>  — screen reader announcement
 *     2. title on the trigger <span>       — native browser tooltip fallback
 *     3. Radix TooltipContent              — styled hover tooltip (sighted users)
 *   DocHref prop is reserved for future doc-link integration.
 *   Button-chrome icons (Lock, Wifi, Building2) that follow visible button
 *   text are exempted and keep aria-hidden="true" — they are decorative there.
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
