"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import Auth0Provider from "../Provider/Auth0Provider";

export default ({
	Domain,
	ClientIdentifier,
}: {
	Domain?: string;
	ClientIdentifier?: string;
}) => (
	<Auth0Provider
		Children={<PrivacyRequestsInner />}
		{...(Domain ? { Domain } : {})}
		{...(ClientIdentifier ? { ClientIdentifier } : {})}
	/>
);

const ProviderLabel = (Sub?: string): string => {
	if (!Sub) return "Email / Password";
	if (Sub.startsWith("google-oauth2|")) return "Google";
	if (Sub.startsWith("github|")) return "GitHub";
	if (Sub.startsWith("gitlab|")) return "GitLab";
	if (Sub.startsWith("okta|")) return "Okta SSO";
	if (Sub.startsWith("samlp|")) return "SAML SSO";
	if (Sub.startsWith("waad|")) return "Azure AD";
	return "Auth0";
};

const RequestDate = (): string =>
	new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

const MailtoLink = (to: string, subject: string, body: string): string =>
	`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const GdprRights = [
	{
		id: "access",
		article: "GDPR Art. 15 + 20",
		title: "Access & Export Your Data",
		description:
			"Request a complete copy of all personal data we hold about you, in a structured, machine-readable format (JSON). Includes profile data, activity records, authentication history, and any stored preferences.",
		badge: "blue",
		to: "privacy@land.playform.cloud",
		subject: (email: string) => `Data Access & Export Request - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am formally requesting access to and a portable export of all personal data you hold about me, under GDPR Article 15 (Right of Access) and Article 20 (Right to Data Portability).

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Please provide:
  1. All personal data associated with my account in JSON format
  2. The categories of data processed and the purposes of processing
  3. The retention periods applied to each data category
  4. Any third parties your data has been shared with
  5. The source of data not provided directly by me

Response required within 30 days under GDPR Article 12.`,
	},
	{
		id: "rectification",
		article: "GDPR Art. 16",
		title: "Correct Your Data",
		description:
			"Request correction of inaccurate or incomplete personal data held about you. This covers profile fields, stored preferences, and any other personally identifiable information we maintain.",
		badge: "neutral",
		to: "privacy@land.playform.cloud",
		subject: (email: string) => `Data Rectification Request - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am requesting rectification of inaccurate personal data under GDPR Article 16 (Right to Rectification).

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Data to be corrected:
  [Please describe the specific data fields and the correct values]

Response required within 30 days under GDPR Article 12.`,
	},
	{
		id: "restriction",
		article: "GDPR Art. 18",
		title: "Restrict Processing",
		description:
			"Request that we limit how we process your personal data while a dispute about accuracy, lawfulness, or your objection is being assessed. Your data is stored but not actively processed during restriction.",
		badge: "yellow",
		to: "privacy@land.playform.cloud",
		subject: (email: string) =>
			`Data Processing Restriction Request - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am requesting restriction of processing of my personal data under GDPR Article 18 (Right to Restriction of Processing).

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Grounds for restriction (select applicable):
  [ ] The accuracy of the personal data is contested
  [ ] The processing is unlawful and I oppose erasure
  [ ] I require the data for legal claims despite no longer needing it
  [ ] I have objected under Article 21 pending verification

Please describe the specific processing activities you wish restricted:
  [Your description here]

Response required within 30 days under GDPR Article 12.`,
	},
	{
		id: "objection",
		article: "GDPR Art. 21",
		title: "Object to Processing",
		description:
			"Object to our processing of your personal data for specific purposes - including direct marketing, analytics, or processing based on our legitimate interests. We must stop unless we can demonstrate compelling grounds.",
		badge: "neutral",
		to: "privacy@land.playform.cloud",
		subject: (email: string) => `Data Processing Objection - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am formally objecting to the processing of my personal data under GDPR Article 21 (Right to Object).

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Processing activities I object to:
  [ ] Analytics and usage tracking (PostHog)
  [ ] Direct marketing communications
  [ ] Profiling for personalisation
  [ ] Processing based on legitimate interests

Grounds for objection:
  [Please describe your specific grounds or circumstances]

Response required within 30 days under GDPR Article 12.`,
	},
	{
		id: "consent",
		article: "GDPR Art. 7",
		title: "Withdraw Consent",
		description:
			"Withdraw consent for any processing activity that relies on your consent as its lawful basis. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.",
		badge: "neutral",
		to: "privacy@land.playform.cloud",
		subject: (email: string) => `Consent Withdrawal - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am formally withdrawing my consent to the processing of my personal data under GDPR Article 7(3).

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Consent I am withdrawing:
  [ ] Analytics and behavioural tracking
  [ ] Marketing and promotional communications
  [ ] Newsletter subscription
  [ ] All consent-based processing activities

I understand this withdrawal does not affect the lawfulness of processing carried out before this date, and that some services may no longer be available without consent.

Response required within 30 days under GDPR Article 12.`,
	},
	{
		id: "complaint",
		article: "GDPR Art. 77",
		title: "Lodge a Complaint",
		description:
			"If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with us directly or with a supervisory authority. We are registered in Bulgaria under the CPDP.",
		badge: "neutral",
		to: "privacy@land.playform.cloud",
		subject: (email: string) => `GDPR Complaint - ${email}`,
		body: (
			name: string,
			email: string,
			sub: string,
			provider: string,
		) => `I am lodging a formal complaint regarding the handling of my personal data under GDPR Article 77.

Account Details
  Full Name: ${name}
  Email Address: ${email}
  Account ID: ${sub}
  Identity Provider: ${provider}
  Request Date: ${RequestDate()}

Nature of complaint:
  [Please describe the issue, including relevant dates and any prior communication]

Desired outcome:
  [Please describe what resolution you are seeking]

Note: You may also lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP) at www.cpdp.bg, or with the supervisory authority in your country of residence.

Response required within 30 days under GDPR Article 12.`,
	},
] as const;

const SupportRequests = [
	{
		id: "technical",
		title: "Technical Support",
		description:
			"Build failures, editor crashes, extension issues, performance problems, or anything not working as expected.",
		to: "support@land.playform.cloud",
		subject: "Technical Support Request",
		label: "support@land.playform.cloud",
	},
	{
		id: "security",
		title: "Security & Privacy",
		description:
			"Report a vulnerability, suspected data breach, unauthorized access, or any security concern requiring immediate attention.",
		to: "security@land.playform.cloud",
		subject: "Security Report",
		label: "security@land.playform.cloud",
	},
	{
		id: "copyright",
		title: "Copyright & DMCA",
		description:
			"Copyright infringement claims, DMCA takedown notices, or disputes about content licensing and intellectual property.",
		to: "copyright@land.playform.cloud",
		subject: "Copyright / DMCA Notice",
		label: "copyright@land.playform.cloud",
	},
	{
		id: "legal",
		title: "Legal & Compliance",
		description:
			"Legal notices, regulatory enquiries, compliance questions, law enforcement requests, and matters requiring legal review.",
		to: "legal@land.playform.cloud",
		subject: "Legal Enquiry",
		label: "legal@land.playform.cloud",
	},
] as const;

const BadgeClass: Record<string, string> = {
	blue: "border border-blue-200 bg-blue-50 text-blue-700",
	yellow: "border border-yellow-200 bg-yellow-50 text-yellow-700",
	neutral: "bg-[var(--Mute)] text-muted-foreground",
};

const PrivacyRequestsInner = () => {
	const { isAuthenticated: IsAuthenticated, user: User } = useAuth0();

	const [DeleteStep, SetDeleteStep] = useState<"idle" | "confirm" | "ready">(
		"idle",
	);

	const Name = User?.name || User?.nickname || "Unknown";
	const Email = User?.email || "";
	const Sub = User?.sub || "unknown";
	const Provider = ProviderLabel(User?.sub);

	const DeleteBody = `I am formally requesting the permanent deletion of my Code Editor Land account and all associated personal data under GDPR Article 17 (Right to Erasure / Right to be Forgotten).

Account Details
  Full Name: ${Name}
  Email Address: ${Email}
  Account ID: ${Sub}
  Identity Provider: ${Provider}
  Request Date: ${RequestDate()}

I request written confirmation that the following has been completed:

  1. All personal data associated with my account deleted from primary systems
  2. All backup and secondary copies scheduled for deletion per your retention policy
  3. Auth0 / Okta authentication record, tokens, and session history deleted
  4. PostHog analytics data anonymised or deleted
  5. Cloudflare edge logs and cached data purged where applicable
  6. Any third-party processors notified of this erasure request

I understand this action is irreversible and constitutes permanent loss of access to my account and all associated data.

Response confirming completion required within 30 days under GDPR Article 12.`;

	const DeleteMailto = MailtoLink(
		"privacy@land.playform.cloud",
		`Account Deletion Request - ${Email}`,
		DeleteBody,
	);

	if (!IsAuthenticated || !User) {
		return (
			<div className="py-8 text-center text-muted-foreground">
				Sign in to manage your privacy and data rights.
			</div>
		);
	}

	return (
		<div className="space-y-12">
			{/* GDPR Rights */}
			<div>
				<h3 className="mb-2 text-lg font-semibold">
					Your Rights Under GDPR
				</h3>
				<p className="mb-6 text-muted-foreground">
					As a resident of the EU/EEA or a user of our service, you
					hold the following rights. Each request is pre-populated
					with your account details and sent directly to our privacy
					team.
				</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{GdprRights.map((Right) => (
						<div
							key={Right.id}
							className="StaccatoCard StaccatoBorderShimmer flex flex-col bg-white p-5">
							<div className="mb-3 flex items-start justify-between gap-2">
								<h4 className="font-medium leading-snug">
									{Right.title}
								</h4>
								<span
									className={`shrink-0 px-2 py-0.5 font-mono text-xs ${BadgeClass[Right.badge]}`}>
									{Right.article}
								</span>
							</div>
							<p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
								{Right.description}
							</p>
							<a
								href={MailtoLink(
									Right.to,
									Right.subject(Email),
									Right.body(Name, Email, Sub, Provider),
								)}
								className="StaccatoButton inline-flex items-center justify-center bg-white px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--Secondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
								Send Request{" "}→
							</a>
						</div>
					))}
				</div>
			</div>

			{/* Support Requests */}
			<div>
				<h3 className="mb-2 text-lg font-semibold">
					Support & Assistance
				</h3>
				<p className="mb-6 text-muted-foreground">
					Direct channels for technical issues, security reports,
					copyright claims, and legal enquiries.
				</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{SupportRequests.map((Req) => (
						<div
							key={Req.id}
							className="StaccatoCard StaccatoBorderShimmer flex flex-col bg-white p-5">
							<h4 className="mb-2 font-medium">{Req.title}</h4>
							<p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
								{Req.description}
							</p>
							<a
								href={`mailto:${Req.to}?subject=${encodeURIComponent(Req.subject)}`}
								className="text-sm text-[var(--Primary)] hover:underline">
								{Req.label}
							</a>
						</div>
					))}
				</div>
			</div>

			{/* Delete Account */}
			<div>
				<h3 className="mb-2 text-lg font-semibold">Delete Account</h3>
				<p className="mb-6 text-muted-foreground">
					Permanently delete your account and all associated personal
					data under GDPR Article 17. This action is irreversible.
				</p>
				<div className="StaccatoCard border border-red-200 bg-white p-6">
					<div className="mb-4 flex items-start gap-4">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-200 bg-red-50 text-red-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true">
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								<line x1="10" y1="11" x2="10" y2="17" />
								<line x1="14" y1="11" x2="14" y2="17" />
							</svg>
						</div>
						<div className="flex-1">
							<h4 className="font-semibold text-red-700">
								Permanent Account Deletion
							</h4>
							<p className="mt-1 text-sm text-muted-foreground">
								This will submit a formal GDPR Article 17
								erasure request. Our privacy team will
								permanently delete your account, Auth0
								authentication record, analytics data, and all
								associated personal data within 30 days.
							</p>
							<ul className="mt-3 space-y-1 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<span className="text-red-500">×</span>
									Account and profile data permanently deleted
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">×</span>
									Authentication record removed from Auth0
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">×</span>
									Analytics data anonymised or deleted
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">×</span>
									Cannot be undone - access lost immediately
								</li>
							</ul>
						</div>
					</div>

					{DeleteStep === "idle" && (
						<button
							type="button"
							onClick={() => SetDeleteStep("confirm")}
							className="StaccatoButton inline-flex items-center justify-center border border-red-300 bg-red-50 px-5 py-2 font-medium text-red-700 transition-all hover:bg-red-100 focus:outline-2 focus:outline-offset-2 focus:outline-red-400">
							Request Account Deletion
						</button>
					)}

					{DeleteStep === "confirm" && (
						<div className="space-y-4 border-t border-red-100 pt-4">
							<p className="text-sm font-medium text-red-700">
								Confirm you understand this is irreversible:
							</p>
							<label className="flex cursor-pointer items-start gap-3 text-sm">
								<input
									type="checkbox"
									className="mt-0.5 accent-red-600"
									onChange={(e) =>
										SetDeleteStep(
											e.target.checked
												? "ready"
												: "confirm",
										)
									}
								/>
								<span className="text-muted-foreground">
									I understand that deleting my account
									permanently removes all my data from Code
									Editor Land and this action cannot be
									undone. I confirm that{" "}
									<strong className="text-foreground">
										{Email}
									</strong>{" "}
									is the account I wish to delete.
								</span>
							</label>
							<button
								type="button"
								onClick={() => SetDeleteStep("idle")}
								className="text-sm text-muted-foreground hover:underline">
								Cancel
							</button>
						</div>
					)}

					{DeleteStep === "ready" && (
						<div className="space-y-3 border-t border-red-100 pt-4">
							<p className="text-sm text-muted-foreground">
								Your deletion request is ready. Clicking below
								will open a pre-filled email to our privacy
								team. Send it to submit your formal erasure
								request.
							</p>
							<div className="flex flex-wrap items-center gap-3">
								<a
									href={DeleteMailto}
									className="StaccatoButton inline-flex items-center justify-center bg-red-600 px-5 py-2 font-medium text-white transition-all hover:bg-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-400">
									Send Deletion Request{" "}→
								</a>
								<button
									type="button"
									onClick={() => SetDeleteStep("idle")}
									className="text-sm text-muted-foreground hover:underline">
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
