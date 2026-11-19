// Source/Library/Contact/Request.ts
(/* @__PURE__ */ new Date()).getFullYear();
var Requests = {
	REACH: {
		Code: "REACH",
		Title: "Data Access & Export",
		Subtitle: "Request a structured copy of all personal data we hold about you under GDPR Article 15 and the Right to Data Portability (Article 20).",
		Article: "GDPR Art. 15 + 20",
		To: "privacy@editor.land",
		Slug: "reach",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				required: false,
				prefill: "sub",
				hint: "Your Auth0 user ID - pre-filled when signed in."
			},
			{
				id: "format",
				label: "Preferred Export Format:",
				type: "select",
				options: [
					"JSON (machine-readable)",
					"Plain text summary",
					"No preference"
				],
				required: false
			},
			{
				id: "notes",
				label: "Additional Notes:",
				type: "textarea",
				placeholder: "Specific data categories you want to focus on (optional).",
				required: false
			}
		],
		BodyPreamble: `I am formally requesting access to and a portable export of all personal data you hold about me under GDPR Article 15 (Right of Access) and Article 20 (Right to Data Portability).`,
		ResponseDays: 30,
		ConversationHref: "https://github.com/CodeEditorLand/Land/discussions"
	},
	AMEND: {
		Code: "AMEND",
		Title: "Correct Your Data",
		Subtitle: "Request rectification of inaccurate or incomplete personal data under GDPR Article 16.",
		Article: "GDPR Art. 16",
		To: "privacy@editor.land",
		Slug: "amend",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				prefill: "sub",
				hint: "Pre-filled when signed in.",
				required: false
			},
			{
				id: "field",
				label: "Field to Correct:",
				type: "text",
				placeholder: "e.g. Display Name, Email Address",
				required: true
			},
			{
				id: "current",
				label: "Current (Incorrect) Value:",
				type: "text",
				placeholder: "What is currently stored",
				required: true
			},
			{
				id: "correct",
				label: "Correct Value:",
				type: "text",
				placeholder: "What it should be",
				required: true
			},
			{
				id: "reason",
				label: "Reason for Correction:",
				type: "textarea",
				placeholder: "Optional context.",
				required: false
			}
		],
		BodyPreamble: `I am requesting rectification of inaccurate personal data held about me under GDPR Article 16 (Right to Rectification).`,
		ResponseDays: 30
	},
	PAUSE: {
		Code: "PAUSE",
		Title: "Restrict Processing",
		Subtitle: "Request that we limit how we process your personal data while a dispute is being assessed, under GDPR Article 18.",
		Article: "GDPR Art. 18",
		To: "privacy@editor.land",
		Slug: "pause",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				prefill: "sub",
				required: false
			},
			{
				id: "ground",
				label: "Grounds for Restriction:",
				type: "select",
				options: [
					"Accuracy of data is contested",
					"Processing is unlawful and I oppose erasure",
					"I require data for legal claims",
					"Pending verification of an Article 21 objection"
				],
				required: true
			},
			{
				id: "activities",
				label: "Processing Activities to Restrict:",
				type: "checkboxes",
				options: [
					"Analytics and usage tracking",
					"Marketing communications",
					"Profile updates from identity provider",
					"All processing"
				],
				required: false
			},
			{
				id: "details",
				label: "Additional Details:",
				type: "textarea",
				placeholder: "Describe the specific processing you want restricted.",
				required: false
			}
		],
		BodyPreamble: `I am requesting restriction of processing of my personal data under GDPR Article 18 (Right to Restriction of Processing).`,
		ResponseDays: 30
	},
	QUERY: {
		Code: "QUERY",
		Title: "Object to Processing",
		Subtitle: "Formally object to our processing of your personal data for specific purposes under GDPR Article 21.",
		Article: "GDPR Art. 21",
		To: "privacy@editor.land",
		Slug: "query",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				prefill: "sub",
				required: false
			},
			{
				id: "activities",
				label: "Processing Activities I Object To:",
				type: "checkboxes",
				options: [
					"Analytics and usage tracking (PostHog)",
					"Direct marketing communications",
					"Profiling for personalisation",
					"Processing based on legitimate interests"
				],
				required: true
			},
			{
				id: "grounds",
				label: "Grounds for Objection:",
				type: "textarea",
				placeholder: "Describe your specific grounds or circumstances for this objection.",
				required: true
			}
		],
		BodyPreamble: `I am formally objecting to the processing of my personal data under GDPR Article 21 (Right to Object).`,
		ResponseDays: 30
	},
	LEAVE: {
		Code: "LEAVE",
		Title: "Withdraw Consent",
		Subtitle: "Withdraw consent for processing activities that rely on your consent as the lawful basis, under GDPR Article 7.",
		Article: "GDPR Art. 7",
		To: "privacy@editor.land",
		Slug: "leave",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				prefill: "sub",
				required: false
			},
			{
				id: "consent",
				label: "Consent I Am Withdrawing:",
				type: "checkboxes",
				options: [
					"Analytics and behavioural tracking",
					"Marketing and promotional communications",
					"Newsletter subscription",
					"All consent-based processing"
				],
				required: true
			},
			{
				id: "notes",
				label: "Additional Notes:",
				type: "textarea",
				placeholder: "Optional context.",
				required: false
			}
		],
		BodyPreamble: `I am formally withdrawing my consent to the processing of my personal data under GDPR Article 7(3) (Right to Withdraw Consent).`,
		ResponseDays: 30
	},
	LODGE: {
		Code: "LODGE",
		Title: "Lodge a Complaint",
		Subtitle: "Lodge a formal complaint about how we have handled your personal data under GDPR Article 77. You may also contact the Bulgarian CPDP supervisory authority directly.",
		Article: "GDPR Art. 77",
		To: "privacy@editor.land",
		Slug: "lodge",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				prefill: "sub",
				required: false
			},
			{
				id: "prior",
				label: "Prior Contact:",
				type: "select",
				hint: "Have you contacted us about this before?",
				options: ["No, this is first contact", "Yes - reference in the description"],
				required: true
			},
			{
				id: "nature",
				label: "Nature of Complaint:",
				type: "textarea",
				placeholder: "Describe the issue, including relevant dates and any prior communication.",
				required: true
			},
			{
				id: "outcome",
				label: "Desired Outcome:",
				type: "textarea",
				placeholder: "What resolution are you seeking?",
				required: true
			}
		],
		BodyPreamble: `I am lodging a formal complaint regarding the handling of my personal data under GDPR Article 77.`,
		ResponseDays: 30,
		ConversationHref: "https://www.cpdp.bg"
	},
	ERASE: {
		Code: "ERASE",
		Title: "Delete Your Account",
		Subtitle: "Permanently delete your account and all associated personal data under GDPR Article 17 (Right to Erasure). This action is irreversible.",
		Article: "GDPR Art. 17",
		To: "privacy@editor.land",
		Slug: "erase",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "sub",
				label: "Account ID:",
				type: "text",
				required: true,
				prefill: "sub",
				hint: "Required - used to locate and delete your account."
			},
			{
				id: "provider",
				label: "Identity Provider:",
				type: "text",
				prefill: "provider",
				hint: "Pre-filled when signed in.",
				required: false
			},
			{
				id: "confirm",
				label: "I understand this permanently deletes my account and all associated data and cannot be undone",
				type: "checkbox",
				required: true
			},
			{
				id: "notes",
				label: "Additional Notes:",
				type: "textarea",
				placeholder: "Optional - any context you want to provide.",
				required: false
			}
		],
		BodyPreamble: `I am formally requesting the permanent deletion of my Code Editor Land account and all associated personal data under GDPR Article 17 (Right to Erasure / Right to be Forgotten).`,
		ResponseDays: 30,
		Destructive: true
	},
	SCOUT: {
		Code: "SCOUT",
		Title: "Technical Support",
		Subtitle: "Report a build failure, editor crash, extension issue, performance problem, or anything not working as expected.",
		To: "support@editor.land",
		Slug: "scout",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: false,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "category",
				label: "Category:",
				type: "select",
				options: [
					"Build / compilation failure",
					"Editor crash or freeze",
					"Extension not loading",
					"Performance issue",
					"IPC / gRPC error",
					"Website issue",
					"Other"
				],
				required: true
			},
			{
				id: "platform",
				label: "Platform:",
				type: "select",
				options: [
					"macOS - Apple Silicon",
					"macOS - Intel",
					"Windows 10",
					"Windows 11",
					"Other"
				],
				required: false
			},
			{
				id: "description",
				label: "Description:",
				type: "textarea",
				placeholder: "What is happening?",
				required: true
			},
			{
				id: "steps",
				label: "Steps to Reproduce:",
				type: "textarea",
				placeholder: "1. Open... 2. Click... 3. Observe...",
				required: false
			},
			{
				id: "expected",
				label: "Expected vs Actual Behaviour:",
				type: "textarea",
				placeholder: "Expected: ...\nActual: ...",
				required: false
			}
		],
		BodyPreamble: `I am reporting a technical issue with Code Editor Land.`,
		ResponseDays: 7,
		ConversationHref: "https://github.com/CodeEditorLand/Land/issues"
	},
	GUARD: {
		Code: "GUARD",
		Title: "Security Report",
		Subtitle: "Report a vulnerability, suspected data breach, unauthorised access, or any security concern. You may report anonymously.",
		To: "security@editor.land",
		Slug: "guard",
		Fields: [
			{
				id: "name",
				label: "Full Name (optional - anonymous reports accepted):",
				type: "text",
				required: false,
				prefill: "name"
			},
			{
				id: "email",
				label: "Contact Email (optional):",
				type: "email",
				required: false,
				prefill: "email"
			},
			{
				id: "type",
				label: "Vulnerability Type:",
				type: "select",
				options: [
					"Authentication / authorisation bypass",
					"Data exposure or leak",
					"Injection (SQL, XSS, command)",
					"Broken access control",
					"Cryptographic weakness",
					"Third-party dependency",
					"Other"
				],
				required: true
			},
			{
				id: "component",
				label: "Affected Component:",
				type: "select",
				options: [
					"Website (editor.land)",
					"Editor application (Mountain)",
					"Extension host (Cocoon)",
					"API / Workers",
					"Authentication (Auth0)",
					"Unknown"
				],
				required: true
			},
			{
				id: "severity",
				label: "Estimated Severity:",
				type: "select",
				options: [
					"Critical",
					"High",
					"Medium",
					"Low",
					"Informational"
				],
				required: true
			},
			{
				id: "description",
				label: "Description:",
				type: "textarea",
				placeholder: "Describe the vulnerability and its potential impact.",
				required: true
			},
			{
				id: "steps",
				label: "Steps to Reproduce:",
				type: "textarea",
				placeholder: "Proof of concept or reproduction steps.",
				required: false
			},
			{
				id: "disclosure",
				label: "I consent to coordinated public disclosure after the issue is resolved",
				type: "checkbox",
				required: false
			}
		],
		BodyPreamble: `I am reporting a security vulnerability or concern affecting Code Editor Land.`,
		ResponseDays: 3
	},
	CLAIM: {
		Code: "CLAIM",
		Title: "Copyright & DMCA",
		Subtitle: "Submit a copyright infringement claim or DMCA takedown notice under 17 U.S.C. 512(c)(3).",
		To: "copyright@editor.land",
		Slug: "claim",
		Fields: [
			{
				id: "name",
				label: "Full Name (copyright owner or authorised agent):",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "work",
				label: "Description of Copyrighted Work:",
				type: "textarea",
				placeholder: "Describe the work you claim has been infringed, including URL or copy if applicable.",
				required: true
			},
			{
				id: "location",
				label: "Location of Infringing Material:",
				type: "text",
				placeholder: "URL where the infringing content appears",
				required: true
			},
			{
				id: "authority",
				label: "I have a good faith belief that the disputed use is not authorised by the copyright owner, its agent, or the law",
				type: "checkbox",
				required: true
			},
			{
				id: "perjury",
				label: "The information in this notice is accurate and I am the copyright owner or authorised to act on the copyright owner's behalf, under penalty of perjury",
				type: "checkbox",
				required: true
			}
		],
		BodyPreamble: `I am submitting a copyright infringement notice pursuant to the Digital Millennium Copyright Act (DMCA), 17 U.S.C. 512(c)(3).`,
		ResponseDays: 14
	},
	LEGAL: {
		Code: "LEGAL",
		Title: "Legal & Compliance",
		Subtitle: "Legal notices, regulatory enquiries, compliance questions, law enforcement requests, and matters requiring legal review.",
		To: "legal@editor.land",
		Slug: "legal",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "organisation",
				label: "Organisation (if applicable):",
				type: "text",
				placeholder: "Company, agency, or institution name",
				required: false
			},
			{
				id: "nature",
				label: "Nature of Enquiry:",
				type: "select",
				options: [
					"Terms of Service question",
					"Licensing enquiry",
					"Regulatory / compliance request",
					"Law enforcement request",
					"Contract or partnership",
					"Other legal matter"
				],
				required: true
			},
			{
				id: "subject",
				label: "Subject:",
				type: "text",
				placeholder: "Brief subject line",
				required: true
			},
			{
				id: "description",
				label: "Description:",
				type: "textarea",
				placeholder: "Full description of the legal matter.",
				required: true
			}
		],
		BodyPreamble: `I am submitting a legal or compliance enquiry regarding Code Editor Land.`,
		ResponseDays: 14
	},
	HAILS: {
		Code: "HAILS",
		Title: "General Inquiry",
		Subtitle: "General questions, feedback, partnership proposals, or anything that doesn't fit another category.",
		To: "support@editor.land",
		Slug: "hails",
		Fields: [
			{
				id: "name",
				label: "Full Name:",
				type: "text",
				required: false,
				prefill: "name"
			},
			{
				id: "email",
				label: "Email Address:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "subject",
				label: "Subject:",
				type: "text",
				placeholder: "Brief subject line",
				required: true
			},
			{
				id: "category",
				label: "Category:",
				type: "select",
				options: [
					"General question",
					"Feature suggestion",
					"Partnership or collaboration",
					"Press or media",
					"Other"
				],
				required: false
			},
			{
				id: "message",
				label: "Message:",
				type: "textarea",
				placeholder: "Your message.",
				required: true
			}
		],
		BodyPreamble: `I am reaching out with a general enquiry regarding Code Editor Land.`,
		ResponseDays: 14,
		ConversationHref: "https://github.com/CodeEditorLand/Land/discussions"
	},
	DEALS: {
		Code: "DEALS",
		Title: "Enterprise Sales",
		Subtitle: "Enquiries about enterprise deployments, custom integrations, support contracts, and volume licensing.",
		To: "enterprise@editor.land",
		Slug: "deals",
		Fields: [
			{
				id: "name",
				label: "Contact Name:",
				type: "text",
				required: true,
				prefill: "name"
			},
			{
				id: "email",
				label: "Work Email:",
				type: "email",
				required: true,
				prefill: "email"
			},
			{
				id: "company",
				label: "Company Name:",
				type: "text",
				required: true
			},
			{
				id: "size",
				label: "Company Size:",
				type: "select",
				options: [
					"1-10 employees",
					"11-50 employees",
					"51-200 employees",
					"201-1000 employees",
					"1000+ employees"
				],
				required: true
			},
			{
				id: "usecase",
				label: "Use Case:",
				type: "textarea",
				placeholder: "What are you building or evaluating? How would you use Code Editor Land?",
				required: true
			},
			{
				id: "timeline",
				label: "Evaluation Timeline:",
				type: "select",
				options: [
					"Immediately",
					"Within 1 month",
					"1-3 months",
					"3-6 months",
					"Just exploring"
				],
				required: false
			}
		],
		BodyPreamble: `I am enquiring about enterprise deployment or licensing of Code Editor Land.`,
		ResponseDays: 3
	}
};
/**
* Generate a 5-character uppercase alphanumeric instance ID.
* Paired with the income code it forms a unique reference per submission:
*   DEALS-K7X2M  /  REACH-3FPQ9  /  ERASE-NM4JW
* Call once per form session and store in React state so it stays stable.
*/
var GeneratePairId = () => {
	const Chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let Id = "";
	for (let I = 0; I < 5; I++) Id += Chars[Math.floor(Math.random() * 32)];
	return Id;
};
/**
* Build a plain-text email body from the form values and request config.
* Uses CRLF line endings (RFC 2822) and no HTML - clean plain text only.
*/
var BuildEmailBody = (Config, Values, Year, PairId) => {
	const Ref = `${Config.Code}-${PairId}`;
	const Lines = [
		Config.BodyPreamble,
		"",
		`Reference:    ${Ref}`,
		`Income Code:  ${Config.Code}`,
		`Instance ID:  ${PairId}`,
		`Request Type: ${Config.Title}`,
		`Date:         ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`,
		"",
		"--- Submitted Details ---",
		""
	];
	for (const Field of Config.Fields) {
		if (Field.type === "checkbox") continue;
		const Value = Values[Field.id];
		if (!Value || Array.isArray(Value) && Value.length === 0) continue;
		const Display = Array.isArray(Value) ? Value.join(", ") : Value;
		Lines.push(`${Field.label} ${Display}`);
	}
	Lines.push("", "--- Confirmations ---");
	for (const Field of Config.Fields) {
		if (Field.type !== "checkbox") continue;
		const Value = Values[Field.id];
		if (Value === "true" || Value === "yes") Lines.push(`[x] ${Field.label}`);
	}
	if (Config.Article) Lines.push("", `Statutory basis: ${Config.Article}`);
	Lines.push(`Response required within ${Config.ResponseDays} days.`);
	return Lines.join("\r\n");
};
/**
* Build a mailto: href with properly encoded plain-text subject and body.
* Subject format: [CODE-XXXXX] Title Request - sender@example.com
* Uses %0D%0A (CRLF) for line breaks - avoids mail clients treating the
* body as a single HTML line.
*/
var BuildMailtoHref = (Config, Values, Year, PairId) => {
	const Subject = `[${Config.Code}-${PairId}] ${Config.Title} Request${Values["email"] ? ` - ${Values["email"]}` : ""}`;
	const EncodedBody = BuildEmailBody(Config, Values, Year, PairId).split("\r\n").map((Line) => encodeURIComponent(Line)).join("%0D%0A");
	return `mailto:${Config.To}?subject=${encodeURIComponent(Subject)}&body=${EncodedBody}`;
};
// Source/Library/Contact/Purpose.ts
/**
* Purpose - what each Contact route is *for*, as data.
*
* ─── WHY THIS FILE EXISTS ─────────────────────────────────────────────────
* The desk answers on fifteen routes and every one of them is a different
* request. A slug cannot say what a route is for: `/Contact/Reach` reads like
* "reach us" and is the subject-access request, `/Contact/Query` reads like a
* question and is an objection to processing. A link picked by the nearest
* `/Contact/...` path therefore promises something the form does not do.
*
* So the reason is data here, not an inference. Each route carries five facts a
* link needs and cannot guess:
*
*   Intent    a closed vocabulary word - *why* a reader is going (`talk`,
*             `support`, `access`, ...). A page asks by intent, never by slug.
*   Purpose   the sentence the page itself declares, read out of `Request.ts`
*             so a link cannot describe the route differently from the route.
*   Audience  who should be sent there, in one clause.
*   Label     the words a link to it carries: `<title> form (<CODE>)`.
*   Statutory whether it is a right filed under an article, and which one.
*
* ─── THE RULE ─────────────────────────────────────────────────────────────
* A link to a Contact route is built here - `LinkFor("talk")`, never
* `href="/Contact/Hails"` written by hand. The label and the destination come
* from one record, so the two cannot disagree, and a route that is a statutory
* request cannot be reached through an affordance that promises a conversation.
*
* `LinkFor` throws when an intent has no canonical route, and
* `Function/Route/Registry.ts` throws when a `/Contact` route has no entry here.
* A future route therefore cannot be added without saying what it is for, and a
* future page cannot pick one by name alone.
*
* ─── WHERE THE SENTENCES COME FROM ────────────────────────────────────────
* Nothing in this file is invented prose about a route. `Purpose` is
* `Requests[code].Subtitle` - the sentence the route's own page prints and the
* one its share card carries. `Title`, `Basis` and `Days` are the same record's
* fields. Only `Intent` and `Audience` are written here, because they are the
* two facts the registry never had: why a reader would go, and who they are.
*/
/** `REACH` -> `Reach`: the spelling the route file uses. */
var Cased = (Code) => `${Code.charAt(0)}${Code.slice(1).toLowerCase()}`;
/** The path a code is published on: `/Contact/Reach`. */
var HrefOf = (Code) => `/Contact/${Cased(Code)}`;
/** The route as the grammar prints it: `/CONTACT/REACH`. */
var ContactRouteOf = (Code) => `/CONTACT/${Code}`;
/**
* One income code, with the four facts its page already declares.
*
* `Purpose`, `Title`, `Basis` and `Days` are read, not retyped: the route's page,
* its share card and its hub record all print the same `Requests[code]`, and a
* link that described the route in its own words would be the fourth copy.
*/
var FromCode = (Code, Intent, Audience) => {
	const Config = Requests[Code];
	return {
		Intent,
		Href: HrefOf(Code),
		Route: ContactRouteOf(Code),
		Code: Config.Code,
		Title: Config.Title,
		Purpose: Config.Subtitle,
		Audience,
		Label: `${Config.Title} form (${Config.Code})`,
		Statutory: Config.Article !== void 0,
		...Config.Article === void 0 ? {} : { Basis: Config.Article },
		Days: Config.ResponseDays,
		Canonical: true
	};
};
/**
* The table. Order is the hub's own reading order - the register first, then the
* routes alphabetically by slug - so a reader of this file meets the routes in
* the order a reader of the site does.
*/
var Purposes = {
	"/Contact": {
		Intent: "choose",
		Href: "/Contact",
		Route: "/CONTACT",
		Code: "REGISTER",
		Title: "Contact",
		Purpose: "Fourteen routes, one register: data requests, technical support, legal and enterprise. Each prints its five-letter code and the window it answers in.",
		Audience: "a reader who does not yet know which of the fourteen requests is theirs",
		Label: "Contact - the register of routes",
		Statutory: false,
		Canonical: true
	},
	"/Contact/Amend": FromCode("AMEND", "correct", "a reader whose stored details are wrong or incomplete"),
	"/Contact/Claim": FromCode("CLAIM", "copyright", "a copyright owner, or an agent acting for one, whose work was copied"),
	"/Contact/Deals": FromCode("DEALS", "sales", "a company buying for a team: deployment, integrations, support contracts, volume licensing"),
	"/Contact/Erase": FromCode("ERASE", "erase", "a reader who wants their account and its data permanently gone"),
	"/Contact/Guard": FromCode("GUARD", "security", "anyone reporting a vulnerability, a breach or unauthorised access - anonymously if they prefer"),
	"/Contact/Hails": FromCode("HAILS", "talk", "anyone who wants to talk to the team and whose reason is not one of the other thirteen"),
	"/Contact/Leave": FromCode("LEAVE", "consent", "a reader withdrawing consent for processing that relies on it"),
	"/Contact/Legal": FromCode("LEGAL", "legal", "a lawyer, a regulator, or a partner whose matter needs legal review"),
	"/Contact/Lodge": FromCode("LODGE", "complaint", "a reader complaining about how we have handled their personal data"),
	"/Contact/Pause": FromCode("PAUSE", "restrict", "a reader in a dispute who wants processing limited while it is assessed"),
	"/Contact/Query": FromCode("QUERY", "object", "a reader objecting to a particular purpose we process their data for"),
	"/Contact/Reach": FromCode("REACH", "access", "a reader exercising subject access: what we hold, and a portable copy of it"),
	"/Contact/Sale": {
		Intent: "sales",
		Href: "/Contact/Sale",
		Route: "/CONTACT/SALE",
		Code: "SALE",
		Title: "Enterprise Inquiries",
		Purpose: "Enterprise adds support, an SLA and custom development. The code stays CC0. A request is filed as a GitHub issue, so the whole team reads it and the answer is public.",
		Audience: "a company reading what the enterprise offer includes before it makes contact",
		Label: "Enterprise inquiries (SALE)",
		Statutory: false,
		Canonical: false,
		DuplicateOf: "/Contact/Deals"
	},
	"/Contact/Scout": FromCode("SCOUT", "support", "a user with something broken: a build, a crash, an extension, performance")
};
/** Every route, in reading order. */
var ContactPurposes = Object.values(Purposes);
Object.keys(Purposes);
/** One route by path, or `undefined` when the path is not a contact route. */
var ContactPurposeOf = (Path) => Object.prototype.hasOwnProperty.call(Purposes, Path) ? Purposes[Path] : void 0;
/**
* One route by path, for a caller that has the path in hand.
*
* Throws rather than returning `undefined`: the registry calls this once per
* `/Contact` entry at module load, so a route with no purpose fails the build
* with its own name in the message instead of shipping a link that cannot say
* what it leads to.
*/
var ContactPurposeAt = (Path) => {
	const Entry = ContactPurposeOf(Path);
	if (Entry === void 0) throw new Error(`Contact/Purpose: ${Path} is not a route this table describes.`);
	return Entry;
};
/** One route by income code. */
var ContactPurposeFor = (Code) => ContactPurposeAt(HrefOf(Code));
/**
* The route a link should use for a purpose.
*
* This is the only way a page should reach a Contact route. `talk` is HAILS, the
* general inquiry; `access` is REACH, the subject-access request; `sales` is
* DEALS, the form, not SALE, the page. A page that asks for an intent cannot land
* a reader on a form whose purpose contradicts the label, because the label comes
* back from the same record as the destination.
*/
var LinkFor = (Intent) => {
	const Match = ContactPurposes.filter((Entry) => Entry.Intent === Intent && Entry.Canonical);
	const Only = Match.length === 1 ? Match[0] : void 0;
	if (Only === void 0) throw new Error(`Contact/Purpose: ${Match.length} canonical routes answer "${Intent}" - exactly one must.`);
	return Only;
};
export { LinkFor as a, GeneratePairId as c, HrefOf as i, Requests as l, ContactPurposeFor as n, BuildEmailBody as o, ContactPurposeOf as r, BuildMailtoHref as s, ContactPurposeAt as t };
