import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_DGQ8XLTY.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_intPnryP.mjs';
import { H as Header } from './Header_B14fNQtY.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Term = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.legal.terms.title", {
    defaultValue: "Terms of Service | Code Editor Land"
  });
  const MetaDescription = T("meta.legal.terms.description", {
    defaultValue: "Terms of Service for Code Editor Land - Governing your use of our open-source code editor and related services."
  });
  const EffectiveDate = "March 26, 2026";
  const LastUpdated = "March 26, 2026";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Legal/Term", "lang": "en" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", '<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">Home</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">Terms of Service</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 class="mb-4 text-4xl font-bold tracking-tight">\nTerms of Service\n</h1> <div class="space-y-1 text-sm text-muted-foreground"> <p><strong>Effective Date:</strong> ', "</p> <p><strong>Last Updated:</strong> ", `</p> </div> </header> <!-- Content --> <article class="prose prose-slate max-w-none"> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
1. Acceptance of Terms
</h2> <p class="mb-4">
These Terms of Service ("Terms") govern your access to and
					use of the Code Editor Land desktop application, website
					(https://editor.land), APIs, Cloudflare Workers, and all
					related services (collectively, the "Service"). The Service
					is operated by PlayForm, a company based in Sofia, Bulgaria,
					acting as the steward of the Code Editor Land open-source
					project ("PlayForm", "Code Editor Land", "we", "our", or
					"us").
</p> <p class="mb-4">
By accessing, downloading, installing, or using the Service,
					you agree to be bound by these Terms and our Privacy Policy.
					If you do not agree to these Terms, you may not access or
					use the Service.
</p> <p class="mb-4">
You represent and warrant that you are at least 18 years of
					age or have reached the age of majority in your
					jurisdiction, or that you have obtained parental or guardian
					consent to use the Service if you are under 18. If you are
					using the Service on behalf of an organization, you
					represent and warrant that you have authority to bind that
					organization to these Terms.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
2. Service Description
</h2> <p class="mb-4">
Code Editor Land is an open-source, free-of-charge code
					editor built with Rust, Tauri, and Effect-TS. The Service
					provides:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
A desktop code editor application compatible with VS
						Code extensions and themes
</li> <li>
Cloud-based services for account management, settings
						synchronization, and analytics (optional)
</li> <li>
Public documentation, downloads, and community resources
</li> <li>APIs and developer tools for extending the platform</li> </ul> <p class="mb-4">
The Service is provided "as-is" without warranties of any
					kind. While we strive for reliability and performance, we
					cannot guarantee uninterrupted or error-free operation.
</p> <p>
We reserve the right to modify, suspend, or discontinue any
					part of the Service at any time, with or without notice. We
					will not be liable to you or any third party for any
					modification, suspension, or discontinuation of the Service.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
3. User Accounts and Responsibilities
</h2> <p class="mb-4">
Certain features of the Service require you to create an
					account. When you register, you agree to:
</p> <h3 class="mb-3 text-xl font-semibold">
3.1 Account Registration
</h3> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>Provide accurate, complete, and current information</li> <li>
Maintain the confidentiality of your account credentials
						(password, access tokens)
</li> <li>
Promptly update any changes to your account information
</li> <li>
Use a strong, unique password and enable two-factor
						authentication when available
</li> <li>
Not share your account credentials with any third party
</li> </ul> <h3 class="mb-3 text-xl font-semibold">3.2 Account Security</h3> <p class="mb-3">
You are responsible for all activities that occur under your
					account, whether or not authorized by you. You agree to:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Notify us immediately at security@editor.land if you
						suspect unauthorized access to your account
</li> <li>
Accept responsibility for all actions taken by anyone
						using your account
</li> <li>
Cooperate with us in investigating any unauthorized use
</li> </ul> <h3 class="mb-3 text-xl font-semibold">3.3 Age and Capacity</h3> <p class="mb-4">
You must be at least 13 years old (or the age of digital
					consent in your jurisdiction) to use the Service. If you are
					under 18, you must have parental or guardian consent to
					these Terms. By using the Service, you represent that you
					meet these requirements.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
4. User Conduct and Prohibited Activities
</h2> <p class="mb-4">
You agree not to engage in any of the following prohibited
					activities:
</p> <h3 class="mb-3 text-xl font-semibold">
4.1 Illegal and Harmful Activities
</h3> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Using the Service for any unlawful purpose or in
						violation of any applicable law
</li> <li>
Distributing malware, viruses, spyware, ransomware, or
						other malicious code
</li> <li>
Attempting to gain unauthorized access to our systems,
						networks, or user accounts
</li> <li>
Interfering with or disrupting the integrity,
						performance, or availability of the Service
</li> <li>
Engaging in any form of harassment, abuse, or harm
						towards other users or Code Editor Land personnel
</li> </ul> <h3 class="mb-3 text-xl font-semibold">
4.2 Content and Intellectual Property Violations
</h3> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Uploading, posting, or transmitting content that
						infringes upon intellectual property rights (copyright,
						trademark, patent) of any third party
</li> <li>
Sharing content that is defamatory, obscene,
						pornographic, or promotes violence
</li> <li>
Using the Service to send unsolicited advertising, spam,
						or promotional messages
</li> <li>
Falsifying your identity, affiliation, or the origin of
						any content
</li> </ul> <h3 class="mb-3 text-xl font-semibold">4.3 Technical Misuse</h3> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Reverse engineering, decompiling, or attempting to
						extract source code from the Service's proprietary
						backend infrastructure (Cloudflare Workers, APIs, and
						backend services). Note: The open-source editor
						codebase, licensed under CC0, may be freely studied,
						modified, and distributed
</li> <li>
Scraping, data mining, or extracting data from the
						Service for commercial purposes without our written
						consent
</li> <li>
Using bots, automated scripts, or other means to access
						the Service in ways that overload or abuse our
						infrastructure
</li> <li>
Bypassing or attempting to bypass rate limits, security
						controls, or access restrictions
</li> <li>
Modifying, adapting, or creating derivative works of the
						Service, except as explicitly permitted under the
						applicable license
</li> </ul> <h3 class="mb-3 text-xl font-semibold">
4.4 Abuse of Support Resources
</h3> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Submitting false or misleading bug reports or support
						requests
</li> <li>
Harassing or abusing Code Editor Land team members or
						community volunteers
</li> <li>
Using support channels for purposes other than
						legitimate issues related to the Service
</li> </ul> <p class="mb-4">
We reserve the right, but not the obligation, to monitor,
					suspend, or terminate accounts and content that violate
					these Terms, at our sole discretion and without prior
					notice.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
5. Intellectual Property Rights
</h2> <p class="mb-4">
The Service contains materials owned by Code Editor Land,
					its contributors, and third parties. All intellectual
					property rights are reserved.
</p> <h3 class="mb-3 text-xl font-semibold">
5.1 Code Editor Land Proprietary Assets
</h3> <p class="mb-3">
The following are the property of Code Editor Land and are
					protected by copyright, trademark, and other laws:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
The "Code Editor Land" and "Land" names, logos, and
						trademarks
</li> <li>
The visual design and user interface elements unique to
						the Service
</li> <li>
Documentation, help resources, and marketing materials
						created by Code Editor Land
</li> <li>
Server-side code, Cloudflare Workers, and backend
						infrastructure (where applicable license permits)
</li> <li>
Any compiled binaries distributed under the CC0 license
						remain subject to trademark rights
</li> </ul> <h3 class="mb-3 text-xl font-semibold">
5.2 Open Source License (CC0)
</h3> <p class="mb-3">
The core editor codebase, including Rust, Tauri, and
					Effect-TS components, is licensed under the <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">Creative Commons CC0 1.0 Universal</a> license. This means:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
To the fullest extent permitted by law, the authors have
						waived all copyright and related rights
</li> <li>
You are free to use, modify, distribute, and use the
						code for any purpose, including commercial purposes
</li> <li>
No attribution is required, though it is appreciated
</li> <li>You may apply your own license to derivative works</li> <li>
The CC0 license applies only to project code explicitly
						marked with CC0. Other components (e.g., third-party
						libraries) remain under their respective licenses
</li> </ul> <p>
For complete license text, see the <a href="/License">License page</a>.
</p> <h3 class="mb-3 text-xl font-semibold">
5.3 Third-Party Components
</h3> <p class="mb-3">
The Service incorporates third-party open-source components,
					each with its own license. These include but are not limited
					to:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Rust crates (various licenses, see Cargo.toml for
						details)
</li> <li>VS Code extension compatibility layer (MIT License)</li> <li>
Tauri framework (Apache 2.0 or MIT, per Tauri license)
</li> <li>Effect-TS libraries (MIT License)</li> <li>
Various UI component libraries (see package.json for npm
						dependencies)
</li> </ul> <p>
Your use of these third-party components is governed solely
					by their respective licenses. Code Editor Land is not
					responsible for third-party licenses.
</p> <p class="mb-3 mt-4"> <strong>Trademark Notices:</strong> VS Code is a trademark of
					Microsoft Corporation. Code Editor Land is not affiliated with
					or endorsed by Microsoft. VS Code extension compatibility is provided
					through the Cocoon extension host, based on the open-source VS
					Code API (MIT License). Tauri is a trademark of the Tauri Programme
					within the Commons Conservancy.
</p> <h3 class="mb-3 text-xl font-semibold">5.4 User Content</h3> <p class="mb-3">
You retain all intellectual property rights in content you
					create, edit, or store using the Service ("User Content").
					This includes your code, configuration files, documents, and
					other creative works. By using the Service, you grant us a
					limited, non-exclusive, royalty-free license to:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Process User Content solely to provide and improve the
						Service (e.g., for settings sync, crash reporting, and
						feature improvements)
</li> <li>
Analyze User Content in aggregate, anonymized form for
						research and development purposes
</li> <li>
Store User Content on our servers or third-party cloud
						infrastructure as necessary for functionality
</li> </ul> <p class="mb-3">
This license is limited to operating the Service and does
					not grant us any rights to your code or creative works
					beyond what is necessary to deliver functionality. We do not
					claim ownership of your User Content.
</p> <p class="mb-3">
You are solely responsible for your User Content and the
					consequences of sharing it. You represent that you have all
					necessary rights to upload and store your User Content on
					our Service.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
6. Disclaimer of Warranties
</h2> <p class="mb-4">
THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
					WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
					NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
					FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
					NON-INFRINGEMENT.
</p> <p class="mb-4">WE DO NOT WARRANT THAT:</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
The Service will meet your specific requirements or
						expectations
</li> <li>
The Service will be uninterrupted, timely, secure, or
						error-free
</li> <li>
The quality, accuracy, reliability, or effectiveness of
						the Service will meet your needs
</li> <li>Any errors or defects will be corrected</li> <li>
The Service is compatible with all hardware, software,
						or operating systems
</li> <li>
Your use of the Service will be lawful or not infringe
						third-party rights
</li> </ul> <p class="mb-4 font-medium text-amber-600">
Some jurisdictions do not allow disclaimer of implied
					warranties, so portions of this disclaimer may not apply to
					you. You may have additional rights depending on your
					country.&#x2001;⚠️
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
7. Limitation of Liability
</h2> <p class="mb-4">
TO THE MAXIMUM EXTENT PERMITTED BY LAW, CODE EDITOR LAND,
					ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRIBUTORS, AND AGENTS
					SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
					CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED
					TO YOUR ACCESS TO OR USE OF THE SERVICE, INCLUDING BUT NOT
					LIMITED TO:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>Loss of profits, revenue, or data</li> <li>
Loss of business opportunities, goodwill, or reputation
</li> <li>Business interruption or loss of use</li> <li>Damages for loss of data or corruption</li> <li>
Damages for any security incidents, data breaches, or
						unauthorized access
</li> <li>
Any damages arising from Third-Party Services integrated
						with the Service
</li> </ul> <h3 class="mb-3 text-xl font-semibold">
7.1 Aggregate Liability Cap
</h3> <p class="mb-3">
OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIMS ARISING
					FROM YOUR USE OF THE SERVICE SHALL NOT EXCEED THE GREATER
					OF:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>One Hundred Dollars ($100.00) USD</li> <li>
The amount you paid us in the past twelve (12) months
						(which is typically $0, as the Service is free)
</li> </ul> <p class="mb-4">
This limitation applies regardless of the theory of
					liability (contract, tort, negligence, strict liability, or
					otherwise) and even if we have been advised of the
					possibility of such damages.
</p> <p class="mb-4 font-medium text-amber-600">
Some jurisdictions do not allow limitation of liability for
					consequential or incidental damages, so the above limitation
					may not apply to you in full. You may have additional
					statutory rights depending on your country.&#x2001;⚠️
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">8. Indemnification</h2> <p class="mb-4">
You agree to defend, indemnify, and hold harmless Code
					Editor Land and its officers, directors, employees,
					contributors, and agents from and against any claims,
					damages, losses, liabilities, and expenses (including
					reasonable attorneys' fees) arising out of or related to:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>Your access to or use of the Service</li> <li>Your violation of these Terms or any applicable law</li> <li>
Your User Content, including any infringement of
						third-party rights
</li> <li>
Any third-party claims arising from your actions or
						inactions
</li> </ul> <p class="mb-4">
We reserve the right, at our own expense, to assume the
					exclusive defense and control of any matter otherwise
					subject to indemnification by you. You will cooperate fully
					with us in asserting any available defenses.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">9. Termination</h2> <p class="mb-4">
We may terminate or suspend your access to the Service at
					any time, without prior notice or liability, for any reason,
					including but not limited to:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Violation of these Terms or our community guidelines
</li> <li>
Engaging in fraudulent, abusive, or illegal activities
</li> <li>Requesting termination or deletion of your account</li> <li>
Suspension or discontinuation of the Service (in whole
						or in part)
</li> <li>Technical or security concerns</li> </ul> <h3 class="mb-3 text-xl font-semibold">
9.1 Effect of Termination
</h3> <p class="mb-3">Upon termination:</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Your right to access and use the Service immediately
						ceases
</li> <li>
We may delete your account and associated data (subject
						to our data retention policy and legal obligations)
</li> <li>
Provisions of these Terms that should survive
						termination (e.g., intellectual property, disclaimers,
						liability limitations, indemnification) remain in effect
</li> </ul> <h3 class="mb-3 text-xl font-semibold">
9.2 Account Deletion by User
</h3> <p class="mb-4">
You may delete your account at any time through account
					settings or by contacting us at support@editor.land. Upon
					deletion, we will permanently remove your personal
					information within 30 days, subject to backup retention
					policies and legal obligations. Some information may be
					retained in anonymized form for analytics.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
10. Governing Law and Dispute Resolution
</h2> <p class="mb-4">
These Terms shall be governed by and construed in accordance
					with the laws of the Republic of Bulgaria, without regard to
					its conflict of law principles. The operator of this Service
					is PlayForm, a company incorporated in Sofia, Bulgaria.
</p> <p class="mb-4">
Any dispute arising from these Terms or your use of the
					Service shall be resolved as follows:
</p> <h3 class="mb-3 text-xl font-semibold">
10.1 Informal Resolution
</h3> <p class="mb-3">
Before initiating formal proceedings, you agree to contact
					us via <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="text-[var(--Primary)] hover:underline">GitHub Issues</a>
or at legal@editor.land to attempt to resolve any dispute amicably
					through good-faith negotiation.
</p> <h3 class="mb-3 text-xl font-semibold">10.2 Jurisdiction</h3> <p class="mb-3">
Any unresolved dispute shall be subject to the exclusive
					jurisdiction of the competent courts of Sofia, Bulgaria. If
					you are a consumer resident in the European Union, you may
					also have the right to use the EU Online Dispute Resolution
					platform at
<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" class="text-[var(--Primary)] hover:underline">
https://ec.europa.eu/consumers/odr</a>.
</p> <h3 class="mb-3 text-xl font-semibold">
10.3 EU Consumer Rights
</h3> <p class="mb-3">
Nothing in these Terms affects your statutory rights as a
					consumer under applicable European Union or national
					consumer protection law. If any provision of these Terms
					conflicts with mandatory consumer protection laws in your
					jurisdiction, the applicable law shall prevail.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
11. Modifications to These Terms
</h2> <p class="mb-4">
We reserve the right to modify these Terms from time to
					time. When we make material changes, we will:
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li>
Update the "Last Updated" date at the top of these Terms
</li> <li>
Provide prominent notice through our website, in-app
						notifications, or email at least 30 days before changes
						take effect
</li> <li>
Offer you the opportunity to review the revised Terms
						before continuing to use the Service
</li> <li>
For changes that materially increase your obligations or
						decrease your rights, provide a clear mechanism to
						reject the changes (which may include account deletion)
</li> </ul> <p class="mb-4">
If you continue to use the Service after the effective date
					of revised Terms, you accept and agree to the changes. If
					you do not agree to the revised Terms, you must stop using
					the Service and may delete your account.
</p> <p>
We encourage you to review these Terms periodically. Your
					continued use of the Service after any modification
					constitutes your acceptance of the new Terms.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">12. Severability</h2> <p class="mb-4">
If any provision of these Terms is found to be unenforceable
					or invalid under applicable law, that provision shall be
					deemed severable and will not affect the validity and
					enforceability of the remaining provisions. The invalid or
					unenforceable provision will be modified to the minimum
					extent necessary to make it enforceable while preserving the
					original intent.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
13. Entire Agreement
</h2> <p class="mb-4">
These Terms, together with our Privacy Policy and any
					additional terms we may provide for specific features,
					constitute the entire agreement between you and Code Editor
					Land regarding your use of the Service, superseding any
					prior agreements or communications.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
14. Contact Information and Legal Notices
</h2> <p class="mb-4">
For any questions, concerns, or legal notices regarding
					these Terms of Service, please contact us:
</p> <div class="mb-4"> <p class="mb-2"> <strong>Company:</strong> PlayForm
</p> <p class="mb-2"> <strong>Location:</strong> Sofia, Bulgaria
</p> <p class="mb-2"> <strong>Email:</strong> <a href="mailto:legal@editor.land" class="StaccatoButton text-primary hover:underline">legal@editor.land<span class="InlineSeparator">✉</span></a> </p> <p class="mb-2"> <strong>GitHub Issues:</strong> <a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="StaccatoButton text-primary hover:underline">github.com/CodeEditorLand/Land/issues<span class="InlineSeparator">→</span></a> </p> <p> <strong>For Copyright Notices:</strong> Please open a
<a href="https://github.com/CodeEditorLand/Land/issues" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">GitHub Issue</a>
or send details to copyright@editor.land.
</p> </div> <p class="mb-4">
We will make reasonable efforts to respond to your inquiries
					promptly. For general support questions, please use our <a href="https://github.com/CodeEditorLand/Land#readme">documentation</a> or <a href="https://github.com/CodeEditorLand/Land/issues">issue tracker</a>.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">15. Force Majeure</h2> <p class="mb-4">
We shall not be liable for any failure or delay in
					performance under these Terms caused by circumstances beyond
					our reasonable control, including but not limited to acts of
					God, war, terrorism, riots, embargoes, acts of civil or
					military authorities, fires, floods, earthquakes, or
					internet/telecommunications failures.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">16. Assignment</h2> <p class="mb-4">
You may not assign or transfer these Terms or your rights
					hereunder without our prior written consent. We may assign
					or transfer these Terms, in whole or in part, without your
					consent, in connection with a merger, acquisition,
					restructuring, or sale of assets, or for any other reason.
					These Terms shall bind and inure to the benefit of the
					parties and their respective successors and permitted
					assigns.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">17. No Waiver</h2> <p class="mb-4">
Our failure to enforce any right or provision of these Terms
					shall not be deemed a waiver of such right or provision. Any
					waiver must be in writing and signed by an authorized
					representative of Code Editor Land.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">18. Survival</h2> <p class="mb-4">
Sections 5, 6, 7, 8, 10, 11, 12, 13, and 14 of these Terms
					shall survive termination or expiration of these Terms and
					your use of the Service.
</p> </section> <section class="mb-10"> <h2 class="mb-4 text-2xl font-semibold">
19. Summary of Key Terms
</h2> <p class="mb-4">
This summary highlights key points but does not replace the
					full Terms. In case of conflict, the full Terms prevail.
</p> <ul class="mb-4 list-disc space-y-2 pl-8"> <li> <strong>Free to use:</strong> Code Editor Land is provided
						free of charge under the CC0 license
</li> <li> <strong>Open source:</strong> You may use, modify, and distribute
						the code without restriction
</li> <li> <strong>Your content:</strong> You retain ownership of code
						and files you create
</li> <li> <strong>Respect others:</strong> Do not misuse the Service
						or harm other users
</li> <li> <strong>No warranties:</strong> Service is provided "as-is"
						without guarantees
</li> <li> <strong>Limited liability:</strong> Our liability is capped
						at $100 or amount paid (typically $0)
</li> <li> <strong>Indemnify:</strong> You are responsible for your actions
						and content
</li> <li> <strong>Arbitration:</strong> Disputes resolved through binding
						arbitration, not court
</li> <li> <strong>Class action waiver:</strong> You may not participate
						in class actions
</li> <li> <strong>Governing law:</strong> California law applies, regardless
						of your location
</li> </ul> <p class="text-sm text-muted-foreground">
Please read the complete Terms for full details and
					obligations.
</p> </section> </article> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-sm text-primary hover:underline">Back to top<span class="InlineSeparator">↑</span></a> </div> </div>  <script crossorigin=\"anonymous\" type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Terms of Service",
			"description": "Terms of Service for Code Editor Land",
			"url": "https://editor.land/legal/terms",
			"datePublished": "2026-03-26T00:00:00Z",
			"dateModified": "2026-03-26T00:00:00Z",
			"publisher": {
				"@type": "Organization",
				"name": "Code Editor Land",
				"url": "https://editor.land",
				"logo": {
					"@type": "ImageObject",
					"url": "https://editor.land/Favicon/favicon.svg"
				}
			},
			"license": "https://creativecommons.org/publicdomain/zero/1.0/",
			"inLanguage": "en",
			"isPartOf": {
				"@type": "WebSite",
				"name": "Code Editor Land",
				"url": "https://editor.land"
			}
		}
	<\/script> `])), renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" }), maybeRenderHead(), EffectiveDate, LastUpdated) })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Term.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Legal/Term.astro";
const $$url = "/Legal/Term";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Term,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
