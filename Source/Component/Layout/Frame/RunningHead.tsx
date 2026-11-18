// RunningHead - the strip under the bar, read as a printed running head.
//
// A dossier's running head states two things on every page: which record you are
// holding, and which part of it you are in. This renders both, plus the position
// figure, in the band K4 restored - `.HeaderStrip` is still the header's last
// child and `.HeaderStatus` is still the keeper line reading
// `STATUS: ACTIVE␁PRE-RELEASE`. Nothing here replaces it; the cells are added
// around it.
//
// The section cell is printed by CSS, not by state. Every part of the record is
// rendered, one at a time is inked by the `html[data-section]` rule in
// `Component/Layout/_Frame.scss`, and `Base.astro` writes that attribute from the
// route server-side. So the running head is correct at first paint, correct with
// JavaScript off, and cannot shift when the island hydrates - which is the whole
// requirement: the head never jumps between pages.
//
// Grammar: `#` opens the record, `/` introduces the part, U+2001 separates the
// series index from its name (`03␁DOCUMENTATION`) and the position figure
// (`03␁/␁10`). No middot, no colon without a value, no second separator.

import {
	FrameClosing,
	FrameExtent,
	FrameLabel,
	FrameSections,
	FrameUnfiled,
} from "./Data.js";

import type { HeaderTranslate } from "../Header/Type.js";

interface RunningHeadProps {
	/** The record's name, as the bar's wordmark prints it. */
	Logo: string;

	/** The header's translator, so a locale file can rename a part. */
	Translate: HeaderTranslate;
}

const RunningHead = ({ Logo, Translate }: RunningHeadProps) => (
	<>
		<p className="HeaderRunningHead">
			<span className="HeaderRecordMarker" aria-hidden="true">
				#
			</span>

			<a className="HeaderRecordName" href="/">
				{Logo}
			</a>

			<span className="HeaderSectionDivider" aria-hidden="true">
				/
			</span>

			{[...FrameSections, FrameClosing, FrameUnfiled].map((Section) => (
				<span
					key={Section.Key}
					className="HeaderSection"
					data-section={Section.Key}
				>
					<span className="HeaderSectionIndex">{Section.Index}</span>
					{"\u2001"}
					{FrameLabel(Section, Translate)}
				</span>
			))}

			{/*
			 * The page's composition language, printed after its part: the record,
			 * the part, then how the part is composed (`/ 03␁DOCUMENTATION / READING`).
			 *
			 * It is printed, not passed: all five answers are rendered and the
			 * `html[data-layout]` rule in `Layout/_Frame.scss` inks the one that
			 * matches, exactly as the part is. `Base.astro` writes that attribute
			 * from `Shell/Language.ts`'s route register, so the head cannot
			 * disagree with the page's shell - and it is right with JavaScript
			 * off. `◎` is the answer for a page with no language: one artifact,
			 * no tracks.
			 */}
			<span className="HeaderLayoutDivider" aria-hidden="true">
				/
			</span>

			<span className="HeaderLayout">
				{["reading", "workspace", "audit", "plate", "record"].map(
					(Key) => (
						<span
							key={Key}
							className="HeaderLayoutWord"
							data-layout={Key}
						>
							{Key.toUpperCase()}
						</span>
					),
				)}
			</span>
		</p>

		{/*
		 * The reader's own status: where this page stands in the document. It is
		 * a figure, not a badge - it repeats the section's series index, so it is
		 * hidden from assistive technology rather than read twice.
		 *
		 * The unfiled record prints `◎␁/␁10` rather than nothing: the mark is
		 * the fact (this page belongs to no part), and keeping the figure the
		 * same width on every page is what stops the status line from shifting
		 * when the reader moves between a filed and an unfiled one.
		 */}
		<p className="HeaderPosition" aria-hidden="true">
			{[...FrameSections, FrameClosing, FrameUnfiled].map((Section) => (
				<span key={Section.Key} data-section={Section.Key}>
					{Section.Index}
					{"\u2001/\u2001"}
					{FrameExtent}
				</span>
			))}
		</p>
	</>
);

export { RunningHead };

export default RunningHead;
