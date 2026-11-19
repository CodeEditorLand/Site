import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$ContactPage } from "./ContactPage_U0NHxsGj.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellRail } from "./ShellRail_OrhIFjE9.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { rt as GetI18n } from "./Base_BVG1wSoZ.mjs";
import { a as LinkFor } from "./Purpose_DgbipYwf.mjs";
// Source/pages/Contact/Sale.astro
var Sale_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Sale,
	file: () => $$file,
	url: () => $$url
});
var $$Sale = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	const Sales = LinkFor("sales");
	const MetaTitle = T("meta.contact.sales.title", { defaultValue: "Enterprise Inquiries | Code Editor Land" });
	const MetaDescription = T("meta.contact.sales.description", { defaultValue: "Contact the Code Editor Land team for enterprise licensing, support, and deployment options." });
	const PageTitle = T("common.sales.pageTitle", { defaultValue: "Enterprise Inquiries" });
	const PageSubtitle = T("common.sales.pageSubtitle", { defaultValue: "Enterprise adds support, an SLA and custom development. The code stays CC0. A request is filed as a GitHub issue, so the whole team reads it and the answer is public." });
	const OneLine = (Value) => Value.replace(/\s*\n\s*/g, " ");
	const Trail = [{
		label: `/${T("common.breadcrumb.home", { defaultValue: "Home" }).toUpperCase()}`,
		href: "/"
	}, { label: `/${PageTitle.toUpperCase()}` }];
	const BackToTop = T("common.button.backToTop", { defaultValue: "Back to top" });
	const Features = [
		T("common.sales.features.prioritySupport", { defaultValue: "Priority support and SLA" }),
		T("common.sales.features.customDeployment", { defaultValue: "Custom deployment options: cloud, on-prem, or air-gapped" }),
		T("common.sales.features.volumeLicensing", { defaultValue: "Volume licensing for large teams" }),
		T("common.sales.features.accountManagement", { defaultValue: "Direct contact with the maintainers" }),
		T("common.sales.features.securityReview", { defaultValue: "Security review and compliance documentation" }),
		T("common.sales.features.customIntegrations", { defaultValue: "Custom integrations and development work" })
	];
	const DirectAddress = "Community@PlayForm.Cloud";
	const HowToReachUs = T("common.sales.contact.heading", { defaultValue: "How to Reach Us" });
	const GithubNote = OneLine(T("common.sales.contact.githubNote", { defaultValue: "Enterprise requests are filed as GitHub issues: the thread is the record, the whole team reads it, and the answer stays public." }));
	const OpenIssueHeading = T("common.sales.contact.openIssueHeading", { defaultValue: "Open a GitHub Issue" });
	const OpenIssueDescription = OneLine(T("common.sales.contact.openIssueDescription", { defaultValue: "Open an issue on the Land repository with the organisation, the team size, the use case and the deployment target.\n\nA request that names those four can be answered in one reply; one that does not needs a thread." }));
	const IssueIncludeLabel = T("common.sales.contact.issueIncludeLabel", { defaultValue: "What to include in your issue:" });
	const IssueIncludeText = T("common.sales.contact.issueIncludeText", { defaultValue: "Company name, team size, intended use case, deployment environment, timeline, and any specific support or compliance requirements." });
	const DirectContactHeading = T("common.sales.contact.directHeading", { defaultValue: "Direct Contact" });
	const DirectContactNote = T("common.sales.contact.description", { defaultValue: "Prefer email? Reach us directly:" });
	const OperatedBy = T("common.sales.contact.operatedBy", { defaultValue: "Operated by PlayForm, Sofia, Bulgaria" });
	const OpenSourceHeading = T("common.sales.openSource.heading", { defaultValue: "Still Open Source" });
	const OpenSourceDescription = OneLine(T("common.sales.openSource.description", { defaultValue: "Enterprise plans add support, SLA, and custom development.\n\nThe code itself remains CC0. Fork it, read it, ship it." }));
	const SaleRail = [
		{
			mark: "01",
			label: T("common.sales.contact.heading", { defaultValue: "How to Reach Us" }).toUpperCase(),
			href: "#reach"
		},
		{
			mark: "02",
			label: OpenIssueHeading.toUpperCase(),
			href: "#open-issue"
		},
		{
			mark: "03",
			label: T("common.sales.features.heading", { defaultValue: "What Enterprise Includes" }).toUpperCase(),
			href: "#includes"
		},
		{
			mark: "04",
			label: DirectContactHeading.toUpperCase(),
			href: "#direct"
		},
		{
			mark: "05",
			label: OpenSourceHeading.toUpperCase(),
			href: "#open-source"
		}
	];
	return renderTemplate`${renderComponent($$result, "ContactPage", $$ContactPage, {
		"metaTitle": MetaTitle,
		"metaDescription": MetaDescription,
		"trail": Trail,
		"record": {
			code: "SALE",
			article: "ENTERPRISE",
			route: "/CONTACT"
		},
		"heading": PageTitle,
		"standfirst": PageSubtitle,
		"width": "wide"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageShell", $$PageShell, {
		"index": "# READING_04",
		"label": "THE ENTERPRISE DESK",
		"class": "PageShell--inset"
	}, {
		"default": ($$result) => renderTemplate`   ${maybeRenderHead($$result)}<div class="contact-sale"> <div class="contact-sale__panel StaccatoBorderShimmer StaccatoCard" id="reach"> <div class="contact-sale__rule"> <p class="contact-sale__rule-label">${HowToReachUs}</p> <p class="contact-sale__prose">${GithubNote}</p> </div> <a class="contact-sale__action emphasis-expressive" href="https://github.com/CodeEditorLand/Land/issues/new?title=Enterprise+Inquiry&labels=enterprise" target="_blank" rel="noopener noreferrer"> ${T("common.sales.contact.openIssueButton", { defaultValue: "Open GitHub Issue" })} <span class="InlineSeparator">→</span> </a> <h2 class="contact-sale__heading" id="open-issue"> ${OpenIssueHeading} </h2> <p class="contact-sale__prose">${OpenIssueDescription}</p> <div class="contact-sale__inset"> <p class="contact-sale__inset-text"> <strong>${IssueIncludeLabel}</strong> ${IssueIncludeText} </p> </div> </div> <div class="PageShell__row" style="--row-tracks:3"> <div class="contact-sale__card StaccatoBorderShimmer StaccatoCard" id="includes"> <h3 class="contact-sale__subheading"> ${T("common.sales.features.heading", { defaultValue: "What Enterprise Includes" })} </h3> <ul class="contact-sale__features"> ${Features.map((Feature) => renderTemplate`<li>${Feature}</li>`)} </ul> </div> <div class="contact-sale__card StaccatoBorderShimmer StaccatoCard" id="direct"> <a class="contact-sale__route"${addAttribute(Sales.Href, "href")}> ${T("common.sales.contact.dealsButton", { defaultValue: Sales.Label })} <span class="InlineSeparator">&#9993;</span> </a> <h3 class="contact-sale__subheading"> ${DirectContactHeading} </h3> <p class="contact-sale__prose">${DirectContactNote}</p> <p class="contact-sale__prose"> <a class="contact-sale__address"${addAttribute(`mailto:${DirectAddress}`, "href")}> ${DirectAddress} </a> </p> <p class="contact-sale__prose">${OperatedBy}</p> </div> <div class="contact-sale__card StaccatoBorderShimmer StaccatoCard" id="open-source"> <h3 class="contact-sale__subheading"> ${OpenSourceHeading} </h3> <p class="contact-sale__prose">${OpenSourceDescription}</p> </div> </div> <div class="contact-sale__top"> <a class="StaccatoButton" href="#top"> ${BackToTop} <span class="InlineSeparator">↑</span> </a> </div> </div> `,
		"rail": ($$result) => renderTemplate`${renderComponent($$result, "ShellRail", $$ShellRail, {
			"slot": "rail",
			"label": "ON THIS PAGE",
			"count": SaleRail.length,
			"items": SaleRail
		})}`,
		"margin": ($$result) => renderTemplate`${renderComponent($$result, "ShellState", $$ShellState, {
			"kind": "partial",
			"index": "TERMS / 01",
			"slot": "margin",
			"statement": T("layout.sale.partial.statement", { defaultValue: "The plan's terms are agreed per agreement: what an enterprise deployment costs, and what its SLA states in figures, are not published on this page." }),
			"cause": T("layout.sale.partial.cause", { defaultValue: "COST is UNAVAILABLE rather than 0. A published zero would be a claim that the plan is free, and an invented figure would be the one number on this page with no source." }),
			"next": {
				label: T("layout.sale.partial.next", { defaultValue: "OPEN AN ENTERPRISE ISSUE" }),
				href: "https://github.com/CodeEditorLand/Land/issues/new?title=Enterprise+Inquiry&labels=enterprise"
			},
			"rows": [
				{
					key: "COST:",
					value: "UNAVAILABLE"
				},
				{
					key: "SLA:",
					value: "AGREED PER AGREEMENT"
				},
				{
					key: "LICENCE:",
					value: "CC0 1.0",
					code: true
				},
				{
					key: "DESK:",
					value: DirectAddress,
					code: true
				}
			],
			"note": "SOURCE: THIS PAGE'S OWN COPY"
		})}`
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Sale.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Sale.astro";
var $$url = "/Contact/Sale";
// \0virtual:astro:page:Source/pages/Contact/Sale@_@astro
var page = () => Sale_exports;
export { page };
