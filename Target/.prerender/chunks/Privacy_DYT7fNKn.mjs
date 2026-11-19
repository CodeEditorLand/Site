import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Xt as renderScript, Zt as createAstro, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { n as $$ReadingDocument, t as $$TrustClause } from "./TrustClause_UOPkhFiy.mjs";
import { t as $$BandFoot } from "./BandFoot_BGOxIJt3.mjs";
import { t as ComposeFacts } from "./Facts_DxRmgaUe.mjs";
import { t as $$Trail } from "./Trail_Btt_p1Ie.mjs";
// Source/Library/Document/Privacy/Data.ts
var Ledger = [
	{
		key: "Effective Date:",
		value: "March 26, 2026"
	},
	{
		key: "Last Updated:",
		value: "May 29, 2026"
	},
	{
		key: "APPLIES TO:",
		value: "Code Editor Land, operated by PlayForm in Sofia, Bulgaria",
		note: "the Code Editor Land project"
	}
];
var Index = [
	{
		number: "01",
		label: "Introduction",
		href: "#introduction"
	},
	{
		number: "02",
		label: "Definitions",
		href: "#definitions"
	},
	{
		number: "03",
		label: "Information Collection and Use",
		href: "#information-collection-and-use"
	},
	{
		number: "04",
		label: "Types of Data Collected",
		href: "#types-of-data-collected"
	},
	{
		number: "05",
		label: "Use of Data",
		href: "#use-of-data"
	},
	{
		number: "06",
		label: "Retention of Data",
		href: "#retention-of-data"
	},
	{
		number: "07",
		label: "Transfer of Data",
		href: "#transfer-of-data"
	},
	{
		number: "08",
		label: "Disclosure of Data",
		href: "#disclosure-of-data"
	},
	{
		number: "09",
		label: "Security of Data",
		href: "#security-of-data"
	},
	{
		number: "10",
		label: "Your Data Protection Rights Under General Data Protection Regulation (GDPR)",
		href: "#your-data-protection-rights-under-general-data-protection-regulation-gdpr"
	},
	{
		number: "11",
		label: "Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)",
		href: "#your-data-protection-rights-under-the-california-privacy-protection-act-caloppa"
	},
	{
		number: "12",
		label: "Your Data Protection Rights under the California Consumer Privacy Act (CCPA)",
		href: "#your-data-protection-rights-under-the-california-consumer-privacy-act-ccpa"
	},
	{
		number: "13",
		label: "Service Providers",
		href: "#service-providers"
	},
	{
		number: "14",
		label: "Payments",
		href: "#payments"
	},
	{
		number: "15",
		label: "Links to Other Sites",
		href: "#links-to-other-sites"
	},
	{
		number: "16",
		label: "Children's Privacy",
		href: "#childrens-privacy"
	},
	{
		number: "17",
		label: "Changes to This Privacy Policy",
		href: "#changes-to-this-privacy-policy"
	},
	{
		number: "18",
		label: "Contact Us",
		href: "#contact-us"
	}
];
// Source/pages/Legal/Privacy.astro
var Privacy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Privacy,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Privacy = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Privacy;
	const T = GetI18n();
	const MetaTitle = T("meta.legal.privacy.title", { defaultValue: "Privacy Policy | Code Editor Land" });
	const MetaDescription = T("meta.legal.privacy.description", { defaultValue: "Privacy Policy for Code Editor Land - Learn how we collect, use, and protect your personal data in connection with our website, editor, and related services." });
	const EffectiveDate = "March 26, 2026";
	const LastUpdated = "May 29, 2026";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"Url": Astro.url.href,
		"lang": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="trust-page"> ${renderComponent($$result, "Trail", $$Trail, {
			"class": "LegalPrintHide trust-page__trail",
			"trail": [{
				label: "/HOME",
				href: "/"
			}, { label: "/PRIVACY POLICY" }]
		})} ${renderComponent($$result, "ReadingDocument", $$ReadingDocument, {
			"kicker": "/LEGAL",
			"heading": "Privacy Policy",
			"standfirst": "How we collect, use, and protect your personal data in connection with our website, editor, and related services.",
			"rows": ComposeFacts(Ledger),
			"index": Index,
			"indexLabel": "Clauses",
			"layout": "rail",
			"ledgerSurface": "standard",
			"ledgerColumns": 2,
			"bodyClass": "LegalCard"
		}, { "default": ($$result) => renderTemplate` <p class="reading-document__title" id="privacy-policy">PRIVACY POLICY</p> <p> <strong>Effective date:</strong> ${EffectiveDate}<br> <strong>Last updated:</strong> ${LastUpdated} </p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "01",
			"id": "introduction"
		}, { "default": ($$result) => renderTemplate`Introduction` })} <p>Welcome to Code Editor Land.</p> <p>
Code Editor Land, operated by PlayForm in Sofia, Bulgaria ("<strong>us</strong>", "<strong>we</strong>", or "<strong>our</strong>"), operates
<a href="/">https://editor.land</a>, the Land desktop editor, related APIs, account systems,
				synchronization features, documentation, downloads, and
				associated services (collectively, the "<strong>Service</strong>").
</p> <p>
This Privacy Policy governs your use of our Service and explains
				how we collect, safeguard, use, and disclose information that
				results from your use of the Service.
</p> <p>
We use your data to provide and improve Service. By using
				Service, you agree to the collection and use of information in
				accordance with this policy. Unless otherwise defined in this
				Privacy Policy, the terms used in this Privacy Policy have the
				same meanings as in our Terms of Service.
</p> <p>
Our Terms of Service govern all use of our Service and together
				with this Privacy Policy constitute your agreement with us.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "02",
			"id": "definitions"
		}, { "default": ($$result) => renderTemplate`Definitions` })} <p> <strong>SERVICE</strong> means the <a href="/">https://editor.land</a> website, the Code Editor Land desktop application, and related services
				operated by PlayForm for the Code Editor Land project.
</p> <p> <strong>PERSONAL DATA</strong> means data about a living individual
				who can be identified from those data, or from those data together
				with other information either in our possession or likely to come
				into our possession.
</p> <p> <strong>USAGE DATA</strong> is data collected automatically either
				generated by the use of Service or from Service infrastructure itself,
				such as page visits, feature usage, performance signals, or diagnostic
				information.
</p> <p> <strong>COOKIES</strong> are small files stored on your device that
				help remember preferences, maintain sessions, or support analytics
				and security functions.
</p> <p> <strong>DATA CONTROLLER</strong> means the natural or legal person
				who determines the purposes for which and the manner in which any
				personal data are processed. For the purpose of this Privacy Policy,
				we are the Data Controller of your data.
</p> <p> <strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong> means any
				natural or legal person who processes the data on behalf of the Data
				Controller. We may use the services of various Service Providers in
				order to process your data more effectively.
</p> <p> <strong>DATA SUBJECT</strong> is any living individual who is the
				subject of Personal Data.
</p> <p> <strong>USER</strong> means the individual using our Service. The
				User corresponds to the Data Subject, who is the subject of Personal
				Data.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "03",
			"id": "information-collection-and-use"
		}, { "default": ($$result) => renderTemplate`
Information Collection and Use
` })} <p>
We collect several different types of information for various
				purposes to provide, maintain, secure, and improve our Service
				to you.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "04",
			"id": "types-of-data-collected"
		}, { "default": ($$result) => renderTemplate`Types of Data Collected` })} <p><strong>Personal Data</strong></p> <p>
While using our Service, we may ask you to provide us with
				certain personally identifiable information that can be used to
				contact or identify you ("<strong>Personal Data</strong>").
				Personally identifiable information may include, but is not
				limited to:
</p> <ol class="LegalList"> <li>Email address.</li> <li>
Username, display name, and account profile information.
</li> <li>
Authentication details and linked identity provider data.
</li> <li>
Communications you send to us, including support messages,
					legal notices, feedback, and bug reports.
</li> <li>
Optional profile details such as avatar, biography, or other
					information you choose to provide.
</li> </ol> <p>
When you sign in using a social identity provider (GitHub,
				Google, GitLab, Okta, SAML, or Azure AD), the sign-in flow is
				handled by
<strong>Auth0</strong> (see Service Providers below). Auth0 acts as
				the OAuth intermediary: it receives your identity data from the third-party
				provider and returns a standardized profile to us. The data we receive
				typically includes your email address, display name, and avatar URL
				provided by the identity source. We do not receive or request access
				to private repositories, private files, or write-access scopes unless
				we separately and explicitly disclose such a request.
</p> <p>
We may use your Personal Data to contact you with service
				notices, security alerts, account information, newsletters,
				marketing or promotional materials, and other information that
				may be of interest to you. You may opt out of receiving any, or
				all, of these communications from us by following the
				unsubscribe link or by using the <a href="/Contact/Leave">Withdraw Consent form</a> (income code LEAVE) or emailing <a href="mailto:support@editor.land">support@editor.land</a>.
</p> <p><strong>Usage Data</strong></p> <p>
We may also collect information that your browser, device, or
				application sends whenever you visit our Service or when you
				access Service by or through a desktop or mobile device ("<strong>Usage Data</strong>").
</p> <p>
This Usage Data may include information such as your Internet
				Protocol address (for example, IP address), browser type,
				browser version, operating system, device type, language
				settings, the pages of our Service that you visit, the time and
				date of your visit, the time spent on those pages, unique device
				identifiers, crash diagnostics, performance information, feature
				usage, and other diagnostic data.
</p> <p>
When you access Service with the desktop application or another
				device, this Usage Data may include information such as device
				type, device unique ID, IP address, operating system, app
				version, extension activity, startup performance, memory usage,
				error logs, and other diagnostic data related to Service
				operation.
</p> <p><strong>Tracking Data</strong></p> <p>
We use cookies and similar tracking technologies to track the
				activity on our Service and hold certain information.
</p> <p>
Tracking technologies used may include cookies, local storage,
				beacons, tags, scripts, or similar technologies to collect and
				track information and to improve and analyze our Service.
</p> <p>
We may use essential cookies for authentication and security,
				preference cookies to remember settings such as theme or editor
				preferences, and analytics cookies or similar technologies to
				understand how the Service is used.
</p> <p>
You can instruct your browser to refuse all cookies or to
				indicate when a cookie is being sent. However, if you do not
				accept some cookies, you may not be able to use some portions of
				our Service.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "05",
			"id": "use-of-data"
		}, { "default": ($$result) => renderTemplate`Use of Data` })} <p>
Code Editor Land uses the collected data for various purposes:
</p> <ol class="LegalList"> <li>to provide and maintain our Service;</li> <li>to create and manage user accounts;</li> <li>to authenticate users and maintain account security;</li> <li>
to provide synchronization, settings storage, and related
					cloud features where enabled;
</li> <li>to notify you about changes to our Service;</li> <li>
to allow you to participate in interactive features of our
					Service when you choose to do so;
</li> <li>to provide customer support;</li> <li>
to gather analysis or valuable information so that we can
					improve our Service;
</li> <li>to monitor the usage of our Service;</li> <li>
to detect, prevent, and address technical issues, fraud,
					abuse, and security incidents;
</li> <li>to fulfill any other purpose for which you provide it;</li> <li>
to carry out our obligations and enforce our rights arising
					from any contracts entered into between you and us,
					including for subscriptions, billing, or collection where
					applicable;
</li> <li>
to provide you with notices about your account and/or
					subscription, including expiration and renewal notices,
					email-instructions, and support messages;
</li> <li>
to provide you with news, special offers and general
					information about other goods, services, and events which we
					offer that are similar to those that you have already used
					or enquired about unless you have opted not to receive such
					information;
</li> <li>
in any other way we may describe when you provide the
					information;
</li> <li>for any other purpose with your consent.</li> </ol> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "06",
			"id": "retention-of-data"
		}, { "default": ($$result) => renderTemplate`Retention of Data` })} <p>
We will retain your Personal Data only for as long as is
				necessary for the purposes set out in this Privacy Policy. We
				will retain and use your Personal Data to the extent necessary
				to comply with our legal obligations, resolve disputes, enforce
				our legal agreements and policies, maintain security records,
				and support the continued operation of the Service.
</p> <p>
We will also retain Usage Data for internal analysis purposes.
				Usage Data is generally retained for a shorter period, except
				when this data is used to strengthen the security or to improve
				the functionality of our Service, or when we are legally
				obligated to retain this data for longer time periods.
</p> <p>
Where technically feasible, we may delete, aggregate, or
				anonymize data once it is no longer needed for identifiable
				processing purposes.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "07",
			"id": "transfer-of-data"
		}, { "default": ($$result) => renderTemplate`Transfer of Data` })} <p>
Your information, including Personal Data, may be transferred to
				- and maintained on - computers located outside of your state,
				province, country, or other governmental jurisdiction where the
				data protection laws may differ from those of your jurisdiction.
</p> <p>
Our infrastructure and service providers may process data in
				multiple jurisdictions, including the European Union, the United
				States, and other countries where our providers operate.
</p> <p>
If you are located outside Bulgaria and choose to provide
				information to us, please note that we may transfer the data,
				including Personal Data, to other countries and process it
				there.
</p> <p>
Your consent to this Privacy Policy followed by your submission
				of such information represents your agreement to that transfer.
</p> <p>
We will take all steps reasonably necessary to ensure that your
				data is treated securely and in accordance with this Privacy
				Policy and no transfer of your Personal Data will take place to
				an organization or a country unless there are adequate controls
				in place including the security of your data and other personal
				information.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "08",
			"id": "disclosure-of-data"
		}, { "default": ($$result) => renderTemplate`Disclosure of Data` })} <p>
We may disclose personal information that we collect, or you
				provide:
</p> <ol class="LegalList"> <li> <strong>Disclosure for Law Enforcement.</strong> Under certain
					circumstances, we may be required to disclose your Personal Data
					if required to do so by law or in response to valid requests by
					public authorities.
</li> <li> <strong>Business Transaction.</strong> If we or our affiliates
					are involved in a merger, acquisition, financing due diligence,
					reorganization, bankruptcy, dissolution, or asset sale, your Personal
					Data may be transferred as part of that transaction.
</li> <li> <strong>Other cases. We may disclose your information also:</strong> <ol class="LegalListRoman"> <li>
to our service providers and infrastructure
							partners;
</li> <li>
to fulfill the purpose for which you provide it;
</li> <li>with your consent in any other cases;</li> <li>
if we believe disclosure is necessary or appropriate
							to protect the rights, property, or safety of the
							Company, our users, or others;
</li> <li>
to enforce our Terms of Service or other agreements;
</li> <li>
to detect, prevent, or otherwise address fraud,
							abuse, security, or technical issues.
</li> </ol> </li> </ol> <p>
We do not describe our practices as selling personal data for
				monetary consideration in this policy.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "09",
			"id": "security-of-data"
		}, { "default": ($$result) => renderTemplate`Security of Data` })} <p>
The security of your data is important to us, but remember that
				no method of transmission over the Internet or method of
				electronic storage is 100% secure. While we strive to use
				commercially acceptable means to protect your Personal Data, we
				cannot guarantee its absolute security.
</p> <p>
We may use safeguards such as encryption in transit, access
				controls, authentication protections, logging, rate limiting,
				infrastructure security controls, and periodic reviews designed
				to reduce security risk.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "10",
			"id": "your-data-protection-rights-under-general-data-protection-regulation-gdpr"
		}, { "default": ($$result) => renderTemplate`
Your Data Protection Rights Under General Data Protection
				Regulation (GDPR)
` })} <p>
If you are a resident of the European Union or European Economic
				Area, you have certain data protection rights under GDPR. We aim
				to take reasonable steps to allow you to correct, amend, delete,
				or limit the use of your Personal Data.
</p> <p>
If you wish to be informed what Personal Data we hold about you
				and if you want it to be removed from our systems, use the <a href="/Contact/Reach">Data Access form</a> (REACH) or the <a href="/Contact/Erase">Account Deletion form</a> (ERASE).
</p> <p>
In certain circumstances, you have the following data protection
				rights:
</p> <ol class="LegalList"> <li>
the right to access, update, or delete the information we
					have on you;
</li> <li>
the right of rectification. You have the right to have your
					information rectified if that information is inaccurate or
					incomplete;
</li> <li>
the right to object. You have the right to object to our
					processing of your Personal Data;
</li> <li>
the right of restriction. You have the right to request that
					we restrict the processing of your personal information;
</li> <li>
the right to data portability. You have the right to be
					provided with a copy of your Personal Data in a structured,
					machine-readable, and commonly used format;
</li> <li>
the right to withdraw consent. You also have the right to
					withdraw your consent at any time where we rely on your
					consent to process your personal information.
</li> </ol> <p>
Please note that we may ask you to verify your identity before
				responding to such requests. Please also note that we may not be
				able to provide some portions of Service without certain
				necessary data.
</p> <p>
You have the right to complain to a data protection authority
				about our collection and use of your Personal Data. For more
				information, please contact your local data protection
				authority.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "11",
			"id": "your-data-protection-rights-under-the-california-privacy-protection-act-caloppa"
		}, { "default": ($$result) => renderTemplate`
Your Data Protection Rights under the California Privacy
				Protection Act (CalOPPA)
` })} <p>
CalOPPA requires commercial websites and online services that
				collect personally identifiable information from California
				consumers to post a conspicuous privacy policy describing the
				information being collected and how it is shared.
</p> <p>According to CalOPPA, we agree to the following:</p> <ol class="LegalList"> <li>
users can visit our public website pages anonymously where
					account access is not required;
</li> <li>
our Privacy Policy link includes the word "Privacy", and can
					easily be found on the page specified above on the home page
					of our website;
</li> <li>
users will be notified of any privacy policy changes on this
					Privacy Policy page;
</li> <li>
users are able to change or request correction of personal
					information using the <a href="/Contact/Amend">Data Correction form</a> (AMEND) or by emailing <a href="mailto:privacy@editor.land">privacy@editor.land</a>.
</li> </ol> <p><strong>Our Policy on "Do Not Track" Signals:</strong></p> <p>
Some browsers incorporate a Do Not Track feature that signals to
				websites that you visit that you do not want your online
				activity tracked. Because there is not yet a common
				understanding of how to interpret Do Not Track signals, our
				Service may not respond uniformly to all such signals.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "12",
			"id": "your-data-protection-rights-under-the-california-consumer-privacy-act-ccpa"
		}, { "default": ($$result) => renderTemplate`
Your Data Protection Rights under the California Consumer
				Privacy Act (CCPA)
` })} <p>
If you are a California resident, you may be entitled to learn
				what data we collect about you, request deletion of your data,
				and request information about how your personal information is
				disclosed, subject to applicable exceptions and verification
				requirements.
</p> <p>
To exercise your data protection rights, you can make certain
				requests and ask us:
</p> <ol class="LegalList"> <li> <strong>What personal information we have about you.</strong>
If you make this request, we may provide the categories of personal
					information we collected about you, the categories of sources
					from which we collected that information, the business purpose
					for collecting it, the categories of third parties with whom we
					share it, and the specific pieces of personal information we hold
					about you as required by applicable law.
</li> <li> <strong>To delete your personal information.</strong> If you make
					this request, we will delete the personal information we hold
					about you from our records, subject to applicable exceptions,
					and direct service providers to do the same where required.
</li> <li> <strong>To correct inaccurate personal information.</strong> If
					you believe information we maintain about you is inaccurate, you
					may request correction.
</li> <li> <strong>To limit certain uses or disclosures where applicable.</strong> We do not describe this Service as selling personal information
					for monetary consideration, but you may still contact us regarding
					your privacy choices and any applicable rights.
</li> </ol> <p>
Please note that if you ask us to delete or restrict certain
				data, it may impact your experience with us, and you may not be
				able to use certain functions that require your personal
				information to operate. We will not discriminate against you for
				exercising your privacy rights.
</p> <p>
To exercise your California privacy rights described above,
				please use the <a href="/Contact/Reach">Data Access form</a> (REACH),
<a href="/Contact/Erase">Account Deletion form</a> (ERASE), or email
<a href="mailto:privacy@editor.land">privacy@editor.land</a>.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "13",
			"id": "service-providers"
		}, { "default": ($$result) => renderTemplate`Service Providers` })} <p>
We may employ third-party companies and individuals to
				facilitate our Service ("<strong>Service Providers</strong>"),
				provide Service on our behalf, perform Service-related services,
				or assist us in analyzing how our Service is used.
</p> <p>
These third parties may have access to your Personal Data only
				to perform these tasks on our behalf and are obligated not to
				disclose or use it for any other purpose, subject to their own
				legal and contractual obligations.
</p> <p>
The following third-party service providers process personal
				data on our behalf as part of operating the Service. Each
				provider is bound by its own privacy policy and data processing
				terms.
</p> <p> <strong>Auth0 (by Okta)</strong> - Authentication and identity management<br>
Auth0 powers all user authentication on the Service, including sign-in,
				sign-up, session management, and identity federation with third-party
				providers (GitHub, Google, GitLab, Okta Workforce, SAML 2.0, and Azure
				AD). When you create an account or sign in, Auth0 processes your email
				address, display name, profile picture, and linked identity data.
				Our Auth0 tenant is hosted in the European Union (<code>eu.auth0.com</code>). Auth0 uses PKCE-based OAuth 2.0 - no client secret is
				exposed to the browser. Auth0 may set session cookies or tokens
				in your browser to maintain your authenticated state. Auth0
				privacy policy:
<a href="https://www.okta.com/privacy-policy/" target="_blank" rel="noopener noreferrer">okta.com/privacy-policy</a>.
</p> <p> <strong>Cloudflare</strong> - Infrastructure, CDN, and edge APIs<br>
The Service is hosted on Cloudflare Pages. Backend APIs (account management,
				downloads, status, analytics ingestion) run as Cloudflare Workers.
				Cloudflare may process your IP address, request headers, geographic
				region, and usage metadata for routing, security, and DDoS mitigation.
				Cloudflare privacy policy:
<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">cloudflare.com/privacypolicy</a>.
</p> <p> <strong>PostHog</strong> - Product analytics<br>
We use PostHog to collect anonymized usage analytics including page
				views, feature interactions, and performance signals. PostHog does
				not receive your name or email address through this integration. Data
				collected via PostHog is used solely to improve the Service. PostHog
				privacy policy:
<a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">posthog.com/privacy</a>.
</p> <p> <strong>GitHub</strong> - Source code and issue tracking<br>
Our source code and issue tracker are hosted on GitHub. If you submit
				an issue or pull request on GitHub, that interaction is governed by
				the
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "14",
			"id": "payments"
		}, { "default": ($$result) => renderTemplate`Payments` })} <p>
We may provide paid products and/or services within Service.
					In that case, we may use third-party services for payment
					processing.
</p> <p>
We will not knowingly store or collect your full payment
					card details ourselves when a third-party payment processor
					is used. That information is provided directly to our
					third-party payment processors whose use of your personal
					information is governed by their own privacy policies.
</p> <p>
If paid products are offered, the applicable payment
					processor and its privacy terms will be identified at the
					time of payment.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "15",
			"id": "links-to-other-sites"
		}, { "default": ($$result) => renderTemplate`Links to Other Sites` })} <p>
Our Service may contain links to other sites that are not
					operated by us. If you click a third-party link, you will be
					directed to that third party's site. We strongly advise you
					to review the Privacy Policy of every site you visit.
</p> <p>
We have no control over and assume no responsibility for the
					content, privacy policies, or practices of any third-party
					sites or services.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "16",
			"id": "childrens-privacy"
		}, { "default": ($$result) => renderTemplate`Children's Privacy` })} <p>
Our Service is not directed to children under the age of 13,
					or a higher age where required by applicable law. We do not
					knowingly collect personally identifiable information from
					children without the legally required consent.
</p> <p>
If you become aware that a child has provided us with
					Personal Data, please contact us. If we become aware that we
					have collected Personal Data from a child without
					appropriate consent, we take steps to remove that
					information from our systems.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "17",
			"id": "changes-to-this-privacy-policy"
		}, { "default": ($$result) => renderTemplate`
Changes to This Privacy Policy
` })} <p>
We may update our Privacy Policy from time to time. We will
					notify you of any changes by posting the new Privacy Policy
					on this page and updating the effective or last updated date
					at the top of this Privacy Policy.
</p> <p>
Where required, we may also let you know via email, account
					notice, or another prominent notice on our Service before
					the change becomes effective.
</p> <p>
You are advised to review this Privacy Policy periodically
					for any changes. Changes to this Privacy Policy are
					effective when they are posted on this page.
</p> ${renderComponent($$result, "TrustClause", $$TrustClause, {
			"number": "18",
			"id": "contact-us"
		}, { "default": ($$result) => renderTemplate`Contact Us` })} <p>
If you have any questions about this Privacy Policy, please
					contact us:
</p> <p>
By form: <a href="/Contact/Hails">General Inquiry</a> (HAILS),
<a href="/Contact/Reach">Data Access</a> (REACH), or <a href="/Contact/Erase">Account Deletion</a> (ERASE).
</p> <p>
By email: <a href="mailto:privacy@editor.land">privacy@editor.land</a>, <a href="mailto:legal@editor.land">legal@editor.land</a>, or <a href="mailto:support@editor.land">support@editor.land</a>.
</p> <p>
By GitHub Issues: <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer">https://github.com/CodeEditorLand/Land/issues</a>.
</p> <p>By mail: PlayForm / Code Editor Land, Sofia, Bulgaria.</p> <div class="LegalPrintHide trust-page__close"> <a href="#top" class="StaccatoButton text-primary hover:underline">Back to top<span class="InlineSeparator">↑</span></a> </div> <script crossorigin=\"anonymous\" type="application/ld+json">
				{
					"@context": "https://schema.org",
					"@type": "WebPage",
					"name": "Privacy Policy",
					"description": "Privacy Policy for Code Editor Land",
					"url": Astro.url.href,
								"publisher": {
						"@type": "Organization",
						"name": "Code Editor Land",
						"url": Astro.site?.href ?? "",
						"logo": {
							"@type": "ImageObject",
							"url": \`\${Astro.site?.href ?? ""}Favicon/favicon.svg\`
						}
					},
					"inLanguage": "en",
					"isPartOf": {
						"@type": "WebSite",
						"name": "Code Editor Land",
						"url": Astro.site?.href ?? ""
					}
				}
			<\/script> ${renderComponent($$result, "BandFoot", $$BandFoot, {
			"surface": "card",
			"index": "06",
			"part": "/THE BACK MATTER",
			"see": [
				{
					route: "/LEGAL/TERM",
					href: "/Legal/Term",
					reason: "the terms of use that sit beside this policy"
				},
				{
					route: "/CONTACT/REACH",
					href: "/Contact/Reach",
					reason: "the request route for access to your data, and for a copy of it (GDPR Art. 15 + 20)"
				},
				{
					route: "/CONTACT/ERASE",
					href: "/Contact/Erase",
					reason: "the request route for erasure, when this policy's retention no longer applies"
				}
			],
			"figure": {
				value: "18",
				unit: "CLAUSES"
			},
			"asOf": LastUpdated,
			"source": "SOURCE/PAGES/LEGAL/PRIVACY.ASTRO"
		})} ` })} </div> `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Privacy.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Privacy.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Privacy.astro";
var $$url = "/Legal/Privacy";
// \0virtual:astro:page:Source/pages/Legal/Privacy@_@astro
var page = () => Privacy_exports;
export { page };
