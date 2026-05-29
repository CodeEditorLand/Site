import { c as createComponent } from './astro-component_BZQgjcIA.mjs';
import 'piccolore';
import { w as renderComponent, B as renderTemplate, v as maybeRenderHead } from './prerender_tA-vfw3g.mjs';
import { H as Header } from './Header_Bnn3YZ4O.mjs';
import { G as GetI18n, $ as $$Base } from './Base_Bw3w2cEv.mjs';

const $$Sale = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.contact.sales.title", {
    defaultValue: "Enterprise Inquiries | Code Editor Land"
  });
  const MetaDescription = T("meta.contact.sales.description", {
    defaultValue: "Contact the Code Editor Land team for enterprise licensing, support, and deployment options."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://land.playform.cloud/Contact/Sale", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.sales.pageTitle", {
    defaultValue: "Enterprise Inquiries"
  })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl"> ${T("common.sales.pageTitle", {
    defaultValue: "Enterprise Inquiries"
  })} </h1> <p class="whitespace-pre-line text-[var(--MuteForeground)]"> ${T("common.sales.pageSubtitle", {
    defaultValue: "Deploying Land across your organization? Get in touch and we'll work out the details together."
  })} </p> </header> <div class="grid grid-cols-1 gap-12 lg:grid-cols-3"> <!-- Contact via GitHub Issues --> <div class="lg:col-span-2"> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-8"> <div class="mb-6 border-l-4 border-[var(--Primary)] pl-4"> <p class="mb-1 font-medium text-[var(--Primary)]"> ${T("common.sales.contact.heading", {
    defaultValue: "How to Reach Us"
  })} </p> <p class="whitespace-pre-line text-muted-foreground"> ${T("common.sales.contact.githubNote", {
    defaultValue: "We handle enterprise inquiries through GitHub Issues.\n\nThis ensures your request is tracked, visible to the full team, and responded to promptly."
  })} </p> </div> <a href="https://github.com/CodeEditorLand/Land/issues/new?title=Enterprise+Inquiry&labels=enterprise" target="_blank" rel="noopener noreferrer" class="StaccatoButton mb-4 inline-flex items-center bg-[var(--Primary)] px-8 py-2 font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">${T("common.sales.contact.openIssueButton", {
    defaultValue: "Open GitHub Issue"
  })}<span class="InlineSeparator">→</span></a> <h2 class="mb-4 text-xl font-semibold"> ${T("common.sales.contact.openIssueHeading", {
    defaultValue: "Open a GitHub Issue"
  })} </h2> <p class="whitespace-pre-line text-muted-foreground"> ${T("common.sales.contact.openIssueDescription", {
    defaultValue: "Create an issue on our GitHub repository describing your organization's needs.\n\nInclude your company name, team size, use case, and deployment requirements.\n\nWe monitor issues daily."
  })} </p> <div class="mt-8 bg-[var(--Secondary)] p-4"> <p class="text-muted-foreground"> <strong>${T(
    "common.sales.contact.issueIncludeLabel",
    {
      defaultValue: "What to include in your issue:"
    }
  )}</strong> ${T("common.sales.contact.issueIncludeText", {
    defaultValue: "Company name, team size, intended use case, deployment environment, timeline, and any specific support or compliance requirements."
  })} </p> </div> </div> </div> <!-- Sidebar --> <div class="space-y-6"> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <h3 class="mb-3 font-semibold"> ${T("common.sales.features.heading", {
    defaultValue: "What Enterprise Includes"
  })} </h3> <ul class="space-y-2 text-muted-foreground"> <li> ${T("common.sales.features.prioritySupport", {
    defaultValue: "Priority support and guaranteed SLA"
  })} </li> <li> ${T("common.sales.features.customDeployment", {
    defaultValue: "Custom deployment options: cloud, on-prem, or air-gapped"
  })} </li> <li> ${T("common.sales.features.volumeLicensing", {
    defaultValue: "Volume licensing for large teams"
  })} </li> <li> ${T("common.sales.features.accountManagement", {
    defaultValue: "Dedicated account manager for your organization"
  })} </li> <li> ${T("common.sales.features.securityReview", {
    defaultValue: "Security review and compliance documentation"
  })} </li> <li> ${T("common.sales.features.customIntegrations", {
    defaultValue: "Custom integrations and development work"
  })} </li> </ul> </div> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <a href="/Contact/Deals" class="StaccatoButton font-medium text-[var(--Primary)] hover:underline">Enterprise Sales form (DEALS)<span class="InlineSeparator">✉</span></a> <h3 class="mb-3 mt-2 font-semibold"> ${T("common.sales.contact.directHeading", {
    defaultValue: "Direct Contact"
  })} </h3> <p class="mb-2 whitespace-pre-line text-muted-foreground"> ${T("common.sales.contact.description", {
    defaultValue: "Prefer email? Reach us directly:"
  })} </p> <p class="text-muted-foreground"> ${T("common.sales.contact.operatedBy", {
    defaultValue: "Operated by PlayForm, Sofia, Bulgaria"
  })} </p> </div> <div class="StaccatoCard StaccatoBorderShimmer bg-white p-6"> <h3 class="mb-3 font-semibold"> ${T("common.sales.openSource.heading", {
    defaultValue: "Still Open Source"
  })} </h3> <p class="whitespace-pre-line text-muted-foreground"> ${T("common.sales.openSource.description", {
    defaultValue: "Enterprise plans add support, SLA, and custom development.\n\nThe code itself remains CC0. Fork it, read it, ship it."
  })} </p> </div> </div> </div> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-primary hover:underline">${T("common.button.backToTop", {
    defaultValue: "Back to top"
  })}<span class="InlineSeparator">↑</span></a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Sale.astro", void 0);

const $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/Sale.astro";
const $$url = "/Contact/Sale";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Sale,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
