import { y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Xt as renderScript } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Content/Artifact/Inset.ts
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/** The words a minute the site's own reading time is computed at. */
var Rate = 200;
/**
* The prose word count of a markdown body: fenced blocks removed, then split on
* whitespace. A fence is a command or an example and belongs to the well that
* prints it, not to the piece's length.
*/
var WordCount = (Body) => Body.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ").split(/\s+/).filter((Word) => Word.length > 0).length;
/**
* Three bars from three figures, normalised to the longest.
*
* The bars are labelled and valued, so the drawing is a reading aid and never the
* only place a number exists. A zero is kept as a zero-length bar rather than
* dropped: a piece with no sections has no sections, and the row says so.
*/
var Bars = (Figures) => {
	const Largest = Math.max(1, ...Figures.map((Figure) => Figure.amount));
	return Figures.map((Figure) => ({
		label: Figure.label,
		value: Figure.value,
		share: Figure.amount / Largest
	}));
};
/**
* The inset a blog article hangs in its margin.
*
* The piece's own extent, drawn. It is not a summary of the piece and it is not a
* table of contents - those are the summary ledger and the register above it -
* it is the one thing neither prints: how big the thing the reader has just
* started actually is.
*/
var PieceInset = (Input) => {
	const Words = WordCount(Input.body);
	return {
		index: "INSET_01",
		label: "THE SHAPE",
		figure: {
			caption: `The piece's own extent: ${Input.sections} sections, ${Words.toLocaleString("en-GB")} words of prose and ${Input.readTime.toLowerCase()}.`,
			source: Input.file,
			bars: Bars([
				{
					label: "SECTIONS",
					value: String(Input.sections).padStart(2, "0"),
					amount: Input.sections
				},
				{
					label: "WORDS",
					value: Words.toLocaleString("en-GB"),
					amount: Words
				},
				{
					label: "MINUTES",
					value: String(Input.minutes).padStart(2, "0"),
					amount: Input.minutes * Rate
				}
			])
		},
		body: `Read at ${Rate} words a minute, the piece is ${Input.readTime.toLowerCase()} of reading. The bars are its extent, not a claim about its quality - and the numbers beside them are the figures the bars are drawn from.`,
		source: `${Input.file}${Quad}WORD COUNT EXCLUDES FENCED CODE`
	};
};
/**
* The inset a manual page hangs in its margin.
*
* The page's extent and its place: how many sections it has, how long it is, and
* where it sits in its section - the last of which the page prints nowhere else,
* because `ORDER:` in the metadata strip is a number with no denominator.
*/
var PageInset = (Input) => {
	const Words = WordCount(Input.body);
	const Minutes = Math.max(1, Math.round(Words / Rate));
	return {
		index: "INSET_01",
		label: "THE EXTENT",
		figure: {
			caption: `${Input.sections} sections and ${Words.toLocaleString("en-GB")} words of prose: about ${Minutes} minutes at ${Rate} words a minute.`,
			source: Input.file,
			bars: Bars([
				{
					label: "SECTIONS",
					value: String(Input.sections).padStart(2, "0"),
					amount: Input.sections
				},
				{
					label: "WORDS",
					value: Words.toLocaleString("en-GB"),
					amount: Words
				},
				{
					label: "MINUTES",
					value: String(Minutes).padStart(2, "0"),
					amount: Minutes * Rate
				}
			])
		},
		body: `This is page ${String(Input.order).padStart(2, "0")} of ${String(Input.inSection).padStart(2, "0")} in ${Input.section}. The metadata strip prints the order without its denominator; this note prints both.`,
		source: `${Input.file}${Quad}ORDER FROM THE FRONTMATTER, COUNT FROM THE SECTION`
	};
};
// Source/Component/Dynamic/MermaidFallback.astro
var $$MermaidFallback = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/MermaidFallback.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/MermaidFallback.astro", void 0);
export { PageInset as n, PieceInset as r, $$MermaidFallback as t };
