(/* @__PURE__ */ new Date()).getFullYear();
const Requests = {
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        required: false,
        prefill: "sub",
        hint: "Your Auth0 user ID - pre-filled when signed in."
      },
      {
        id: "format",
        label: "Preferred Export Format",
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
        label: "Additional Notes",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        prefill: "sub",
        hint: "Pre-filled when signed in.",
        required: false
      },
      {
        id: "field",
        label: "Field to Correct",
        type: "text",
        placeholder: "e.g. Display Name, Email Address",
        required: true
      },
      {
        id: "current",
        label: "Current (Incorrect) Value",
        type: "text",
        placeholder: "What is currently stored",
        required: true
      },
      {
        id: "correct",
        label: "Correct Value",
        type: "text",
        placeholder: "What it should be",
        required: true
      },
      {
        id: "reason",
        label: "Reason for Correction",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        prefill: "sub",
        required: false
      },
      {
        id: "ground",
        label: "Grounds for Restriction",
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
        label: "Processing Activities to Restrict",
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
        label: "Additional Details",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        prefill: "sub",
        required: false
      },
      {
        id: "activities",
        label: "Processing Activities I Object To",
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
        label: "Grounds for Objection",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        prefill: "sub",
        required: false
      },
      {
        id: "consent",
        label: "Consent I Am Withdrawing",
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
        label: "Additional Notes",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "sub",
        label: "Account ID",
        type: "text",
        prefill: "sub",
        required: false
      },
      {
        id: "prior",
        label: "Have you contacted us about this before?",
        type: "select",
        options: ["No, this is first contact", "Yes - reference: "],
        required: true
      },
      {
        id: "nature",
        label: "Nature of Complaint",
        type: "textarea",
        placeholder: "Describe the issue, including relevant dates and any prior communication.",
        required: true
      },
      {
        id: "outcome",
        label: "Desired Outcome",
        type: "textarea",
        placeholder: "What resolution are you seeking?",
        required: true
      }
    ],
    BodyPreamble: `I am lodging a formal complaint regarding the handling of my personal data under GDPR Article 77.`,
    ResponseDays: 30,
    ConversationHref: "https://www.cpdp.bg"
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
        label: "Full Name",
        type: "text",
        required: false,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
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
          "Other"
        ],
        required: true
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
          "Other"
        ],
        required: false
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "What is happening?",
        required: true
      },
      {
        id: "steps",
        label: "Steps to Reproduce",
        type: "textarea",
        placeholder: "1. Open... 2. Click... 3. Observe...",
        required: false
      },
      {
        id: "expected",
        label: "Expected vs Actual Behaviour",
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
        label: "Full Name (optional - anonymous reports accepted)",
        type: "text",
        required: false,
        prefill: "name"
      },
      {
        id: "email",
        label: "Contact Email (optional)",
        type: "email",
        required: false,
        prefill: "email"
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
          "Other"
        ],
        required: true
      },
      {
        id: "component",
        label: "Affected Component",
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
        label: "Estimated Severity",
        type: "select",
        options: ["Critical", "High", "Medium", "Low", "Informational"],
        required: true
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe the vulnerability and its potential impact.",
        required: true
      },
      {
        id: "steps",
        label: "Steps to Reproduce",
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
        label: "Full Name (copyright owner or authorised agent)",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "work",
        label: "Description of Copyrighted Work",
        type: "textarea",
        placeholder: "Describe the work you claim has been infringed, including URL or copy if applicable.",
        required: true
      },
      {
        id: "location",
        label: "Location of Infringing Material",
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
        label: "Full Name",
        type: "text",
        required: true,
        prefill: "name"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        prefill: "email"
      },
      {
        id: "organisation",
        label: "Organisation (if applicable)",
        type: "text",
        placeholder: "Company, agency, or institution name",
        required: false
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
          "Other legal matter"
        ],
        required: true
      },
      {
        id: "subject",
        label: "Subject",
        type: "text",
        placeholder: "Brief subject line",
        required: true
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Full description of the legal matter.",
        required: true
      }
    ],
    BodyPreamble: `I am submitting a legal or compliance enquiry regarding Code Editor Land.`,
    ResponseDays: 14
  }};
const GeneratePairId = () => {
  const Chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let Id = "";
  for (let I = 0; I < 5; I++) {
    Id += Chars[Math.floor(Math.random() * Chars.length)];
  }
  return Id;
};
const BuildEmailBody = (Config, Values, Year2, PairId) => {
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
  return Lines.join("\r\n");
};
const BuildMailtoHref = (Config, Values, Year2, PairId) => {
  const Subject = `[${Config.Code}-${PairId}] ${Config.Title} Request${Values["email"] ? ` - ${Values["email"]}` : ""}`;
  const Body = BuildEmailBody(Config, Values, Year2, PairId);
  const EncodedBody = Body.split("\r\n").map((Line) => encodeURIComponent(Line)).join("%0D%0A");
  return `mailto:${Config.To}?subject=${encodeURIComponent(Subject)}&body=${EncodedBody}`;
};

export { BuildEmailBody as B, GeneratePairId as G, Requests as R, BuildMailtoHref as a };
//# sourceMappingURL=Request.Dux_TM63.js.map
