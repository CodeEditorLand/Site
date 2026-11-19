import { a as LinkFor } from "./Purpose_DgbipYwf.mjs";
// Source/Component/Trust/Facts.ts
/**
* The two routes that answer support, and the two that answer legal review.
*
* Read from the purpose table, not written here: the label and the destination
* come back together, so a row cannot print `/CONTACT/REACH` over a general
* inquiry or send a reader to a statutory form to ask a question.
*/
var SupportRoute = LinkFor("support");
var TalkRoute = LinkFor("talk");
var LegalRoute = LinkFor("legal");
/** Who stands behind the document, and where a reader goes next. */
var TrustInstitution = [
	{
		key: "LICENSE:",
		value: "Creative Commons CC0 1.0 Universal",
		note: "the core editor codebase"
	},
	{
		key: "MAINTAINER:",
		value: "PlayForm",
		note: "Sofia, Bulgaria - steward of the Code Editor Land open-source project"
	},
	{
		key: "SUPPORT:",
		value: `${SupportRoute.Href}, ${TalkRoute.Href}`,
		links: [{
			text: SupportRoute.Route,
			href: SupportRoute.Href
		}, {
			text: TalkRoute.Route,
			href: TalkRoute.Href
		}]
	},
	{
		key: "LEGAL:",
		value: LegalRoute.Href,
		links: [{
			text: LegalRoute.Route,
			href: LegalRoute.Href
		}]
	},
	{
		key: "SOURCE:",
		value: "github.com/CodeEditorLand/Land",
		links: [{
			text: "github.com/CodeEditorLand/Land",
			href: "https://github.com/CodeEditorLand/Land",
			target: "blank"
		}]
	}
];
/**
* A document's own rows, then the institutional rows it does not already carry.
*
* Deduplication is by key, case-insensitively: the data modules write their
* keys in two registers (`Effective Date:` in the Terms, `APPLIES TO:` in
* Privacy) and the stylesheet uppercases both, so the comparison has to be the
* one the reader sees.
*/
var ComposeFacts = (rows) => {
	const Present = new Set(rows.map((Row) => Row.key.trim().toUpperCase()));
	return [...rows, ...TrustInstitution.filter((Row) => !Present.has(Row.key.trim().toUpperCase()))];
};
export { ComposeFacts as t };
