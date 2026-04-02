import { c as createComponent, G as GetI18n, $ as $$Base } from './Base_DMf2Ciav.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_DmvbPVCR.mjs';
import { H as Header } from './Header_DT5JaKy6.mjs';

const $$Sale = createComponent(($$result, $$props, $$slots) => {
  const T = GetI18n();
  const MetaTitle = T("meta.contact.sales.title", {
    defaultValue: "Enterprise Inquiries | Code Editor Land"
  });
  const MetaDescription = T("meta.contact.sales.description", {
    defaultValue: "Contact the Code Editor Land team about enterprise licensing, custom deployments, and volume pricing."
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "Title": MetaTitle, "Description": MetaDescription, "Url": "https://editor.land/Contact/Sale", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<div class="container mx-auto max-w-4xl px-4 py-16"> <!-- Breadcrumbs --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground"> <li> <a href="/" class="transition-colors hover:text-foreground">${T("common.breadcrumb.home", {
    defaultValue: "Home"
  })}</a> </li> <li class="mx-2">/</li> <li> <span class="font-medium text-foreground">${T("common.sales.pageTitle", {
    defaultValue: "Enterprise Inquiries"
  })}</span> </li> </ol> </nav> <!-- Page Header --> <header class="mb-12"> <h1 class="mb-4 text-4xl font-bold tracking-tight"> ${T("common.sales.pageTitle", {
    defaultValue: "Enterprise Inquiries"
  })} </h1> <p class="text-lg text-muted-foreground"> ${T("common.sales.pageSubtitle", {
    defaultValue: "Interested in deploying Code Editor Land across your organization? Get in touch with our team."
  })} </p> </header> <div class="grid grid-cols-1 gap-12 lg:grid-cols-3"> <!-- Contact via GitHub Issues --> <div class="lg:col-span-2"> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-8"> <div class="mb-6 border-l-4 border-[var(--Primary)] pl-4"> <p class="mb-1 text-sm font-medium text-[var(--Primary)]"> ${T("common.sales.contact.heading", {
    defaultValue: "How to reach us"
  })} </p> <p class="text-sm text-muted-foreground"> ${T("common.sales.contact.githubNote", {
    defaultValue: "We handle enterprise inquiries through GitHub Issues. This ensures your request is tracked, visible to the team, and responded to promptly."
  })} </p> </div> <a href="https://github.com/CodeEditorLand/Land/issues/new?title=Enterprise+Inquiry&labels=enterprise" target="_blank" rel="noopener noreferrer" class="StaccatoButton mb-4 inline-flex items-center border border-[var(--Border)] bg-[var(--Primary)] px-8 py-2 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">${T("common.sales.contact.openIssueButton", {
    defaultValue: "Open GitHub Issue"
  })}<span class="InlineSeparator">→</span></a> <h2 class="mb-4 text-xl font-semibold"> ${T("common.sales.contact.openIssueHeading", {
    defaultValue: "Open a GitHub Issue"
  })} </h2> <p class="text-sm text-muted-foreground"> ${T("common.sales.contact.openIssueDescription", {
    defaultValue: "Create an issue on our GitHub repository describing your organization's needs. Include your company name, team size, use case, and any deployment requirements. Our team monitors issues daily."
  })} </p> <div class="mt-8 border border-[var(--Border)] bg-[var(--Secondary)] p-4"> <p class="text-xs text-muted-foreground"> <strong>${T(
    "common.sales.contact.issueIncludeLabel",
    {
      defaultValue: "What to include in your issue:"
    }
  )}</strong> ${T("common.sales.contact.issueIncludeText", {
    defaultValue: "Company name, team size, intended use case, deployment environment (cloud/on-prem), timeline, and any specific support or compliance requirements."
  })} </p> </div> </div> </div> <!-- Sidebar --> <div class="space-y-6"> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <h3 class="mb-3 font-semibold"> ${T("common.sales.features.heading", {
    defaultValue: "Enterprise Features"
  })} </h3> <ul class="space-y-2 text-sm text-muted-foreground"> <li> ${T("common.sales.features.prioritySupport", {
    defaultValue: "Priority support and SLA"
  })} </li> <li> ${T("common.sales.features.customDeployment", {
    defaultValue: "Custom deployment options"
  })} </li> <li> ${T("common.sales.features.volumeLicensing", {
    defaultValue: "Volume licensing"
  })} </li> <li> ${T("common.sales.features.accountManagement", {
    defaultValue: "Dedicated account management"
  })} </li> <li> ${T("common.sales.features.securityReview", {
    defaultValue: "Security and compliance review"
  })} </li> <li> ${T("common.sales.features.customIntegrations", {
    defaultValue: "Custom integrations"
  })} </li> </ul> </div> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <a href="mailto:enterprise@editor.land" class="StaccatoButton font-medium text-[var(--Primary)] hover:underline">enterprise@editor.land<span class="InlineSeparator">✉</span></a> <h3 class="mb-3 mt-2 font-semibold"> ${T("common.sales.contact.directHeading", {
    defaultValue: "Direct Contact"
  })} </h3> <p class="mb-2 text-sm text-muted-foreground"> ${T("common.sales.contact.description", {
    defaultValue: "Prefer email? Reach us directly."
  })} </p> <p class="text-xs text-muted-foreground"> ${T("common.sales.contact.operatedBy", {
    defaultValue: "Operated by PlayForm, Sofia, Bulgaria"
  })} </p> </div> <div class="StaccatoCard StaccatoBorderShimmer border border-[var(--Border)] bg-white p-6"> <h3 class="mb-3 font-semibold"> ${T("common.sales.openSource.heading", {
    defaultValue: "Open Source"
  })} </h3> <p class="text-sm text-muted-foreground"> ${T("common.sales.openSource.description", {
    defaultValue: "Not access to the code itself. Code Editor Land is open source under CC0. Enterprise plan provide support, SLA, and custom development."
  })} </p> </div> </div> </div> <!-- Back to top --> <div class="mt-12 border-t pt-8"> <a href="#top" class="StaccatoButton text-sm text-primary hover:underline">${T("common.button.backToTop", {
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
