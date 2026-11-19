// Source/Content/Artifact/Stamp.ts
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/**
* The release's edition mark.
*
* `VERSION` and `ISSUED` are `UNAVAILABLE` rather than a plausible number: no
* public release exists, so there is no version to stamp and no date on which one
* was issued. The three facts the record *does* hold - what is being held, the
* targets it reaches and the channel - are printed in full, because a stamp with
* nothing in it is a decoration.
*/
var ReleaseStamp = {
	index: "STAMP_01",
	label: "EDITION",
	mark: "〈EDITION 01〉",
	route: "/CHANNEL:PUBLIC",
	rows: [
		{
			key: "VERSION",
			value: "UNAVAILABLE"
		},
		{
			key: "ISSUED",
			value: "UNAVAILABLE"
		},
		{
			key: "HOLDING",
			value: "NONE PUBLISHED"
		},
		{
			key: "REACHES",
			value: `MACOS${Quad}WINDOWS${Quad}LINUX`
		},
		{
			key: "CHANNEL",
			value: "PUBLIC"
		}
	],
	authority: "/VERIFY - THE PAGE PRINTS A CHECKSUM AND A SIGNATURE FOR EVERY ARTIFACT THE RELEASE SHIPS, AND CHECKS THE TEMPLATE IT WOULD USE.",
	state: "preparing",
	note: "The mark authenticates the record, not an artifact: no public artifact exists for it to be stamped on. VERSION and ISSUED stay UNAVAILABLE until one does."
};
/**
* The document's own mark, printed on the index.
*
* Four of the six rows are the register's totals - routes, documents, blocks and
* the declared modules outside bulk - passed in rather than restated, so the
* stamp cannot drift from the table it marks; the other two are the edition and
* the build's date. It prints what it was handed, exactly as the register band
* does.
*/
var DocumentStamp = (Totals, AsOf) => ({
	index: "STAMP_01",
	label: "DOCUMENT",
	mark: "〈FIELD MANUAL〉",
	route: "/CONTENTS",
	rows: [
		{
			key: "EDITION",
			value: "01"
		},
		{
			key: "BUILT",
			value: AsOf
		},
		{
			key: "HOLDING",
			value: `${Totals.Routes}${Quad}ROUTES`
		},
		{
			key: "READS",
			value: `${Totals.Documents}${Quad}DOCUMENTS`
		},
		{
			key: "FORMS",
			value: `${Totals.Blocks}${Quad}BLOCKS`
		},
		{
			key: "DECLARED",
			value: `${Totals.Modules}${Quad}MODULES OUTSIDE BULK`
		}
	],
	authority: "SOURCE/SCRIPT/REGISTER.TS - EVERY FIGURE ON THIS PAGE IS COUNTED FROM THE TREE AND READ BACK THROUGH LIBRARY/INDEX/REGISTER.TS, SO THE STAMP AUTHENTICATES THE READING AND NOT THE PROSE.",
	state: "verified",
	note: `The mark is issued by the generator, not by an editor: ${Totals.Elements} element records, ${Totals.Blocks} blocks and ${Totals.Routes} routes were counted on the run that wrote this build.`
});
export { ReleaseStamp as n, DocumentStamp as t };
