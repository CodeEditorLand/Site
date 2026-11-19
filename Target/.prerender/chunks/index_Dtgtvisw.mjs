import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$ContactPage } from "./ContactPage_U0NHxsGj.mjs";
import { n as ContactProcess, r as RegisterEntries, t as ContactChannel } from "./Register_D7L0dB72.mjs";
import { t as $$RecordStage } from "./RecordStage_Gz3AmIfZ.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { ft as RegisterOf, h as ContactHubTrail, p as ContactDirect, pt as RegisterText, rt as GetI18n } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Contact/index.astro
var Contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	const MetaTitle = T("meta.contact.hub.title", { defaultValue: "Contact | Code Editor Land" });
	const MetaDescription = T("meta.contact.hub.description", { defaultValue: "Contact the Code Editor Land team: data requests, technical support, legal, and enterprise inquiries." });
	const Heading = T("common.contact.pageTitle", { defaultValue: "Contact" });
	const Statutory = RegisterEntries.filter((Entry) => Entry.basis).length;
	const Standfirst = T("common.contact.pageSubtitle", { defaultValue: `${RegisterEntries.length} routes, one register: data requests, technical support, legal and enterprise. Each prints its five-letter code and the window it answers in; the ${Statutory} statutory routes name the article they answer under.` });
	const BackToTop = T("common.button.backToTop", { defaultValue: "Back to top" });
	const ProcessRegister = RegisterOf("PROCESS", ContactProcess, { unit: "STEPS" });
	return renderTemplate`${renderComponent($$result, "ContactPage", $$ContactPage, {
		"metaTitle": MetaTitle,
		"metaDescription": MetaDescription,
		"trail": ContactHubTrail,
		"record": {
			code: "CONTACT",
			route: "/INDEX",
			count: RegisterEntries.length
		},
		"heading": Heading,
		"standfirst": Standfirst,
		"mode": "functional"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="contact-hub">  ${RegisterEntries.length > 0 ? renderTemplate`<div class="contact-hub__grid"> ${RegisterEntries.map((Entry) => renderTemplate`<a class="contact-hub__card"${addAttribute(Entry.href, "href")}> <p class="contact-hub__slug">${Entry.slug}</p> <h2 class="contact-hub__name">${Entry.title}</h2> <p class="contact-hub__note">${Entry.subtitle}</p> ${Entry.basis || Entry.window ? renderTemplate`<p class="contact-hub__foot"> ${Entry.basis ? renderTemplate`<span class="contact-hub__basis">
〈${Entry.basis}〉
</span>` : null} ${Entry.window ? renderTemplate`<span class="contact-hub__window">
SLA: ${Entry.window} </span>` : null} </p>` : null} </a>`)} </div>` : renderTemplate`${renderComponent($$result, "ShellState", $$ShellState, {
		"kind": "empty",
		"index": "REGISTER / 00",
		"statement": "The register is empty: no request route is filed, so there is no card to print.",
		"cause": "`Library/Contact/Data.ts` lists the routes the desk answers on, and this build carries none. Nothing failed - the hub has not been given a route yet, and the mailbox below is still read.",
		"next": {
			label: `WRITE TO ${ContactDirect.address}`,
			href: `mailto:${ContactDirect.address}`
		},
		"note": "SOURCE: Library/Contact/Data.ts"
	})}`} <section class="contact-hub__process" aria-labelledby="ContactProcessHeading"> <p class="contact-hub__process-kicker"> ${RegisterText(ProcessRegister)} </p> <h2 class="contact-hub__process-heading" id="ContactProcessHeading">
What happens after you send
</h2> <p class="contact-hub__process-note">
Every route above is filed under its income code and answered
				inside the window its own card prints. The four steps are the
				desk's process, not a promise about any one request: the window
				is the commitment.
</p> ${renderComponent($$result, "RecordStage", $$RecordStage, {
		"stages": [...ContactProcess],
		"variant": "plates"
	})} </section> <p class="contact-hub__direct"> <span class="contact-hub__direct-label">${ContactDirect.label}</span> <a class="contact-hub__address"${addAttribute(`mailto:${ContactDirect.address}`, "href")}> ${ContactDirect.address} </a> <span class="contact-hub__direct-label"> ${ContactChannel.label} </span> <a class="contact-hub__address"${addAttribute(ContactChannel.href, "href")} target="_blank" rel="noopener noreferrer"> ${ContactChannel.text} </a> </p> <div class="contact-hub__top"> <a class="StaccatoButton" href="#top"> ${BackToTop} <span class="InlineSeparator">↑</span> </a> </div> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/index.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Contact/index.astro";
var $$url = "/Contact";
// \0virtual:astro:page:Source/pages/Contact/index@_@astro
var page = () => Contact_exports;
export { page };
