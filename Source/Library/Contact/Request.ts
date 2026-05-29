"use client";

/**
 * Income code registry.
 *
 * Each incoming contact request is tagged with a 5-letter code
 * (old telephone exchange style - every letter unambiguous when
 * spoken aloud). The code appears in the email subject so the
 * receiving team can filter and prioritise at a glance.
 *
 * Format in email subject:  [REACH-2026] Data Access Request - user@example.com
 */

export type IncomeCode =
	| "REACH"
	| "AMEND"
	| "PAUSE"
	| "QUERY"
	| "LEAVE"
	| "LODGE"
	| "ERASE"
	| "SCOUT"
	| "GUARD"
	| "CLAIM"
	| "LEGAL"
	| "HAILS"
	| "DEALS";

export interface FormField {
	id: string;
	label: string;
	type: "text" | "email" | "textarea" | "select" | "checkbox" | "checkboxes";
	placeholder?: string;
	options?: string[];
	required?: boolean;
	prefill?: "name" | "email" | "sub" | "provider";
	hint?: string;
}

export interface RequestConfig {
	Code: IncomeCode;
	Title: string;
	Subtitle: string;
	Article?: string;
	To: string;
	Slug: string;
	Fields: FormField[];
	BodyPreamble: string;
	ResponseDays: number;
	ConversationHref?: string;
	Destructive?: boolean;
}

const Year = new Date().getFullYear();

export const Requests: Record<IncomeCode, RequestConfig> = {
	REACH: {
		Code: "REACH",
		Title: "Data Access & Export",
		Subtitle:
			"Request a structured copy of all personal data we hold about you under GDPR Article 15 and the Right to Data Portability (Article 20).",
		Article: "GDPR Art. 15 + 20",
		To: "privacy@land.playform.cloud",
		Slug: "reach",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				required: false,
				prefill: "sub",
				hint: "Your Auth0 user ID - pre-filled when signed in.",
			},
			{
				id: "format",
				label: "Preferred Export Format",
				type: "select",
				options: [
					"JSON (machine-readable)",
					"Plain text summary",
					"No preference",
				],
				required: false,
			},
			{
				id: "notes",
				label: "Additional Notes",
				type: "textarea",
				placeholder:
					"Specific data categories you want to focus on (optional).",
				required: false,
			},
		],
		BodyPreamble: `I am formally requesting access to and a portable export of all personal data you hold about me under GDPR Article 15 (Right of Access) and Article 20 (Right to Data Portability).`,
		ResponseDays: 30,
		ConversationHref: "https://github.com/CodeEditorLand/Land/discussions",
	},

	AMEND: {
		Code: "AMEND",
		Title: "Correct Your Data",
		Subtitle:
			"Request rectification of inaccurate or incomplete personal data under GDPR Article 16.",
		Article: "GDPR Art. 16",
		To: "privacy@land.playform.cloud",
		Slug: "amend",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				prefill: "sub",
				hint: "Pre-filled when signed in.",
				required: false,
			},
			{
				id: "field",
				label: "Field to Correct",
				type: "text",
				placeholder: "e.g. Display Name, Email Address",
				required: true,
			},
			{
				id: "current",
				label: "Current (Incorrect) Value",
				type: "text",
				placeholder: "What is currently stored",
				required: true,
			},
			{
				id: "correct",
				label: "Correct Value",
				type: "text",
				placeholder: "What it should be",
				required: true,
			},
			{
				id: "reason",
				label: "Reason for Correction",
				type: "textarea",
				placeholder: "Optional context.",
				required: false,
			},
		],
		BodyPreamble: `I am requesting rectification of inaccurate personal data held about me under GDPR Article 16 (Right to Rectification).`,
		ResponseDays: 30,
	},

	PAUSE: {
		Code: "PAUSE",
		Title: "Restrict Processing",
		Subtitle:
			"Request that we limit how we process your personal data while a dispute is being assessed, under GDPR Article 18.",
		Article: "GDPR Art. 18",
		To: "privacy@land.playform.cloud",
		Slug: "pause",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				prefill: "sub",
				required: false,
			},
			{
				id: "ground",
				label: "Grounds for Restriction",
				type: "select",
				options: [
					"Accuracy of data is contested",
					"Processing is unlawful and I oppose erasure",
					"I require data for legal claims",
					"Pending verification of an Article 21 objection",
				],
				required: true,
			},
			{
				id: "activities",
				label: "Processing Activities to Restrict",
				type: "checkboxes",
				options: [
					"Analytics and usage tracking",
					"Marketing communications",
					"Profile updates from identity provider",
					"All processing",
				],
				required: false,
			},
			{
				id: "details",
				label: "Additional Details",
				type: "textarea",
				placeholder:
					"Describe the specific processing you want restricted.",
				required: false,
			},
		],
		BodyPreamble: `I am requesting restriction of processing of my personal data under GDPR Article 18 (Right to Restriction of Processing).`,
		ResponseDays: 30,
	},

	QUERY: {
		Code: "QUERY",
		Title: "Object to Processing",
		Subtitle:
			"Formally object to our processing of your personal data for specific purposes under GDPR Article 21.",
		Article: "GDPR Art. 21",
		To: "privacy@land.playform.cloud",
		Slug: "query",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				prefill: "sub",
				required: false,
			},
			{
				id: "activities",
				label: "Processing Activities I Object To",
				type: "checkboxes",
				options: [
					"Analytics and usage tracking (PostHog)",
					"Direct marketing communications",
					"Profiling for personalisation",
					"Processing based on legitimate interests",
				],
				required: true,
			},
			{
				id: "grounds",
				label: "Grounds for Objection",
				type: "textarea",
				placeholder:
					"Describe your specific grounds or circumstances for this objection.",
				required: true,
			},
		],
		BodyPreamble: `I am formally objecting to the processing of my personal data under GDPR Article 21 (Right to Object).`,
		ResponseDays: 30,
	},

	LEAVE: {
		Code: "LEAVE",
		Title: "Withdraw Consent",
		Subtitle:
			"Withdraw consent for processing activities that rely on your consent as the lawful basis, under GDPR Article 7.",
		Article: "GDPR Art. 7",
		To: "privacy@land.playform.cloud",
		Slug: "leave",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				prefill: "sub",
				required: false,
			},
			{
				id: "consent",
				label: "Consent I Am Withdrawing",
				type: "checkboxes",
				options: [
					"Analytics and behavioural tracking",
					"Marketing and promotional communications",
					"Newsletter subscription",
					"All consent-based processing",
				],
				required: true,
			},
			{
				id: "notes",
				label: "Additional Notes",
				type: "textarea",
				placeholder: "Optional context.",
				required: false,
			},
		],
		BodyPreamble: `I am formally withdrawing my consent to the processing of my personal data under GDPR Article 7(3) (Right to Withdraw Consent).`,
		ResponseDays: 30,
	},

	LODGE: {
		Code: "LODGE",
		Title: "Lodge a Complaint",
		Subtitle:
			"Lodge a formal complaint about how we have handled your personal data under GDPR Article 77. You may also contact the Bulgarian CPDP supervisory authority directly.",
		Article: "GDPR Art. 77",
		To: "privacy@land.playform.cloud",
		Slug: "lodge",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				prefill: "sub",
				required: false,
			},
			{
				id: "prior",
				label: "Have you contacted us about this before?",
				type: "select",
				options: ["No, this is first contact", "Yes - reference: "],
				required: true,
			},
			{
				id: "nature",
				label: "Nature of Complaint",
				type: "textarea",
				placeholder:
					"Describe the issue, including relevant dates and any prior communication.",
				required: true,
			},
			{
				id: "outcome",
				label: "Desired Outcome",
				type: "textarea",
				placeholder: "What resolution are you seeking?",
				required: true,
			},
		],
		BodyPreamble: `I am lodging a formal complaint regarding the handling of my personal data under GDPR Article 77.`,
		ResponseDays: 30,
		ConversationHref: "https://www.cpdp.bg",
	},

	ERASE: {
		Code: "ERASE",
		Title: "Delete Your Account",
		Subtitle:
			"Permanently delete your account and all associated personal data under GDPR Article 17 (Right to Erasure). This action is irreversible.",
		Article: "GDPR Art. 17",
		To: "privacy@land.playform.cloud",
		Slug: "erase",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "sub",
				label: "Account ID",
				type: "text",
				required: true,
				prefill: "sub",
				hint: "Required - used to locate and delete your account.",
			},
			{
				id: "provider",
				label: "Identity Provider",
				type: "text",
				prefill: "provider",
				hint: "Pre-filled when signed in.",
				required: false,
			},
			{
				id: "confirm",
				label: "I understand this permanently deletes my account and all associated data and cannot be undone",
				type: "checkbox",
				required: true,
			},
			{
				id: "notes",
				label: "Additional Notes",
				type: "textarea",
				placeholder: "Optional - any context you want to provide.",
				required: false,
			},
		],
		BodyPreamble: `I am formally requesting the permanent deletion of my Code Editor Land account and all associated personal data under GDPR Article 17 (Right to Erasure / Right to be Forgotten).`,
		ResponseDays: 30,
		Destructive: true,
	},

	SCOUT: {
		Code: "SCOUT",
		Title: "Technical Support",
		Subtitle:
			"Report a build failure, editor crash, extension issue, performance problem, or anything not working as expected.",
		To: "support@land.playform.cloud",
		Slug: "scout",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: false,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "category",
				label: "Category",
				type: "select",
				options: [
					"Build / compilation failure",
					"Editor crash or freeze",
					"Extension not loading",
					"Performance issue",
					"IPC / gRPC error",
					"Website issue",
					"Other",
				],
				required: true,
			},
			{
				id: "platform",
				label: "Platform",
				type: "select",
				options: [
					"macOS - Apple Silicon",
					"macOS - Intel",
					"Windows 10",
					"Windows 11",
					"Other",
				],
				required: false,
			},
			{
				id: "description",
				label: "Description",
				type: "textarea",
				placeholder: "What is happening?",
				required: true,
			},
			{
				id: "steps",
				label: "Steps to Reproduce",
				type: "textarea",
				placeholder: "1. Open... 2. Click... 3. Observe...",
				required: false,
			},
			{
				id: "expected",
				label: "Expected vs Actual Behaviour",
				type: "textarea",
				placeholder: "Expected: ...\nActual: ...",
				required: false,
			},
		],
		BodyPreamble: `I am reporting a technical issue with Code Editor Land.`,
		ResponseDays: 7,
		ConversationHref: "https://github.com/CodeEditorLand/Land/issues",
	},

	GUARD: {
		Code: "GUARD",
		Title: "Security Report",
		Subtitle:
			"Report a vulnerability, suspected data breach, unauthorised access, or any security concern. You may report anonymously.",
		To: "security@land.playform.cloud",
		Slug: "guard",
		Fields: [
			{
				id: "name",
				label: "Full Name (optional - anonymous reports accepted)",
				type: "text",
				required: false,
				prefill: "name",
			},
			{
				id: "email",
				label: "Contact Email (optional)",
				type: "email",
				required: false,
				prefill: "email",
			},
			{
				id: "type",
				label: "Vulnerability Type",
				type: "select",
				options: [
					"Authentication / authorisation bypass",
					"Data exposure or leak",
					"Injection (SQL, XSS, command)",
					"Broken access control",
					"Cryptographic weakness",
					"Third-party dependency",
					"Other",
				],
				required: true,
			},
			{
				id: "component",
				label: "Affected Component",
				type: "select",
				options: [
					"Website (land.playform.cloud)",
					"Editor application (Mountain)",
					"Extension host (Cocoon)",
					"API / Workers",
					"Authentication (Auth0)",
					"Unknown",
				],
				required: true,
			},
			{
				id: "severity",
				label: "Estimated Severity",
				type: "select",
				options: ["Critical", "High", "Medium", "Low", "Informational"],
				required: true,
			},
			{
				id: "description",
				label: "Description",
				type: "textarea",
				placeholder:
					"Describe the vulnerability and its potential impact.",
				required: true,
			},
			{
				id: "steps",
				label: "Steps to Reproduce",
				type: "textarea",
				placeholder: "Proof of concept or reproduction steps.",
				required: false,
			},
			{
				id: "disclosure",
				label: "I consent to coordinated public disclosure after the issue is resolved",
				type: "checkbox",
				required: false,
			},
		],
		BodyPreamble: `I am reporting a security vulnerability or concern affecting Code Editor Land.`,
		ResponseDays: 3,
	},

	CLAIM: {
		Code: "CLAIM",
		Title: "Copyright & DMCA",
		Subtitle:
			"Submit a copyright infringement claim or DMCA takedown notice under 17 U.S.C. 512(c)(3).",
		To: "copyright@land.playform.cloud",
		Slug: "claim",
		Fields: [
			{
				id: "name",
				label: "Full Name (copyright owner or authorised agent)",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "work",
				label: "Description of Copyrighted Work",
				type: "textarea",
				placeholder:
					"Describe the work you claim has been infringed, including URL or copy if applicable.",
				required: true,
			},
			{
				id: "location",
				label: "Location of Infringing Material",
				type: "text",
				placeholder: "URL where the infringing content appears",
				required: true,
			},
			{
				id: "authority",
				label: "I have a good faith belief that the disputed use is not authorised by the copyright owner, its agent, or the law",
				type: "checkbox",
				required: true,
			},
			{
				id: "perjury",
				label: "The information in this notice is accurate and I am the copyright owner or authorised to act on the copyright owner's behalf, under penalty of perjury",
				type: "checkbox",
				required: true,
			},
		],
		BodyPreamble: `I am submitting a copyright infringement notice pursuant to the Digital Millennium Copyright Act (DMCA), 17 U.S.C. 512(c)(3).`,
		ResponseDays: 14,
	},

	LEGAL: {
		Code: "LEGAL",
		Title: "Legal & Compliance",
		Subtitle:
			"Legal notices, regulatory enquiries, compliance questions, law enforcement requests, and matters requiring legal review.",
		To: "legal@land.playform.cloud",
		Slug: "legal",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "organisation",
				label: "Organisation (if applicable)",
				type: "text",
				placeholder: "Company, agency, or institution name",
				required: false,
			},
			{
				id: "nature",
				label: "Nature of Enquiry",
				type: "select",
				options: [
					"Terms of Service question",
					"Licensing enquiry",
					"Regulatory / compliance request",
					"Law enforcement request",
					"Contract or partnership",
					"Other legal matter",
				],
				required: true,
			},
			{
				id: "subject",
				label: "Subject",
				type: "text",
				placeholder: "Brief subject line",
				required: true,
			},
			{
				id: "description",
				label: "Description",
				type: "textarea",
				placeholder: "Full description of the legal matter.",
				required: true,
			},
		],
		BodyPreamble: `I am submitting a legal or compliance enquiry regarding Code Editor Land.`,
		ResponseDays: 14,
	},

	HAILS: {
		Code: "HAILS",
		Title: "General Inquiry",
		Subtitle:
			"General questions, feedback, partnership proposals, or anything that doesn't fit another category.",
		To: "support@land.playform.cloud",
		Slug: "hails",
		Fields: [
			{
				id: "name",
				label: "Full Name",
				type: "text",
				required: false,
				prefill: "name",
			},
			{
				id: "email",
				label: "Email Address",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "subject",
				label: "Subject",
				type: "text",
				placeholder: "Brief subject line",
				required: true,
			},
			{
				id: "category",
				label: "Category",
				type: "select",
				options: [
					"General question",
					"Feature suggestion",
					"Partnership or collaboration",
					"Press or media",
					"Other",
				],
				required: false,
			},
			{
				id: "message",
				label: "Message",
				type: "textarea",
				placeholder: "Your message.",
				required: true,
			},
		],
		BodyPreamble: `I am reaching out with a general enquiry regarding Code Editor Land.`,
		ResponseDays: 14,
		ConversationHref: "https://github.com/CodeEditorLand/Land/discussions",
	},

	DEALS: {
		Code: "DEALS",
		Title: "Enterprise Sales",
		Subtitle:
			"Enquiries about enterprise deployments, custom integrations, support contracts, and volume licensing.",
		To: "enterprise@land.playform.cloud",
		Slug: "deals",
		Fields: [
			{
				id: "name",
				label: "Contact Name",
				type: "text",
				required: true,
				prefill: "name",
			},
			{
				id: "email",
				label: "Work Email",
				type: "email",
				required: true,
				prefill: "email",
			},
			{
				id: "company",
				label: "Company Name",
				type: "text",
				required: true,
			},
			{
				id: "size",
				label: "Company Size",
				type: "select",
				options: [
					"1-10 employees",
					"11-50 employees",
					"51-200 employees",
					"201-1000 employees",
					"1000+ employees",
				],
				required: true,
			},
			{
				id: "usecase",
				label: "Use Case",
				type: "textarea",
				placeholder:
					"What are you building or evaluating? How would you use Code Editor Land?",
				required: true,
			},
			{
				id: "timeline",
				label: "Evaluation Timeline",
				type: "select",
				options: [
					"Immediately",
					"Within 1 month",
					"1-3 months",
					"3-6 months",
					"Just exploring",
				],
				required: false,
			},
		],
		BodyPreamble: `I am enquiring about enterprise deployment or licensing of Code Editor Land.`,
		ResponseDays: 3,
	},
};

/**
 * Build a plain-text email body from the form values and request config.
 * Uses CRLF line endings (RFC 2822) and no HTML - clean plain text only.
 */
export const BuildEmailBody = (
	Config: RequestConfig,
	Values: Record<string, string | string[]>,
	Year: number,
): string => {
	const Code = `[${Config.Code}-${Year}]`;
	const Lines: string[] = [
		Config.BodyPreamble,
		"",
		`Income Code: ${Code}`,
		`Request Type: ${Config.Title}`,
		`Date: ${new Date().toISOString().split("T")[0]}`,
		"",
		"--- Submitted Details ---",
		"",
	];

	for (const Field of Config.Fields) {
		if (Field.type === "checkbox") continue; // confirmations don't go in body
		const Value = Values[Field.id];
		if (!Value || (Array.isArray(Value) && Value.length === 0)) continue;
		const Display = Array.isArray(Value) ? Value.join(", ") : Value;
		Lines.push(`${Field.label}: ${Display}`);
	}

	Lines.push("", "--- Confirmations ---");
	for (const Field of Config.Fields) {
		if (Field.type !== "checkbox") continue;
		const Value = Values[Field.id];
		if (Value === "true" || Value === "yes") {
			Lines.push(`[x] ${Field.label}`);
		}
	}

	if (Config.Article) {
		Lines.push("", `Statutory basis: ${Config.Article}`);
	}
	Lines.push(`Response required within ${Config.ResponseDays} days.`);

	// CRLF for SMTP compliance, \n fallback for mailto
	return Lines.join("\r\n");
};

/**
 * Build a mailto: href with properly encoded plain-text subject and body.
 * Uses %0D%0A (CRLF) for line breaks - required by some mail clients
 * to avoid the body being treated as a single HTML line.
 */
export const BuildMailtoHref = (
	Config: RequestConfig,
	Values: Record<string, string | string[]>,
	Year: number,
): string => {
	const Subject = `[${Config.Code}-${Year}] ${Config.Title} Request${Values["email"] ? ` - ${Values["email"]}` : ""}`;
	const Body = BuildEmailBody(Config, Values, Year);
	const EncodedBody = Body.split("\r\n")
		.map((Line) => encodeURIComponent(Line))
		.join("%0D%0A");
	return `mailto:${Config.To}?subject=${encodeURIComponent(Subject)}&body=${EncodedBody}`;
};
