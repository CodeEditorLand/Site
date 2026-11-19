// FrameRail - the dossier's thumb index.
//
// A printed manual's table of contents lives in the margin as cut tabs: you find
// a part by its number, and the tab you are in is pulled out. That is this
// element, and it is one element in three states:
//
//   < 1024px  the rows of the header's existing drawer, under an `INDEX:` field
//             label - no new toggle, no second nav landmark
//   1024-1280 nothing: the bar carries the four /LABEL destinations and the
//             running head carries the position; an index needs margin to live
//             in and there is none at this width
//   >= 1280px a fixed column at the page's left edge, digits only, vertically
//             centred - it never overlaps content because `band-inner` keeps the
//             container at 72rem (at 1280px the text column starts at 104px)
//
// The active tab is marked by shape and weight, not by colour: the tab turns
// white (the pulled-out tab lying on the creme field), its digit goes to ink at
// weight 500, and a 2px ink rule closes its inner edge. Ink - not the accent,
// which stays the nav's *route* marker, so the two registers are still
// distinguishable in greyscale.
//
// Which tab is active is decided by `html[data-section]`, written server-side by
// `Base.astro`; the SCSS loop in `Component/Layout/_Frame.scss` does the rest.
// Nothing here reads the path, so the index is correct before hydration and
// stays correct when the drawer opens.

import {
	FrameClosing,
	FrameExtent,
	FrameLabel,
	FrameSections,
} from "./Data.js";

import type { HeaderTranslate } from "../Header/Type.js";

interface RailProps {
	/** The header's translator, so a locale file can rename a part. */
	Translate: HeaderTranslate;
}

const Rail = ({ Translate }: RailProps) => (
	<nav
		className="FrameRail"
		id="FrameRail"
		aria-label={Translate("index.label", {
			defaultValue: "Dossier index",
		})}
	>
		<p className="FrameRailLabel">
			<span className="FrameRailMark" aria-hidden="true">
				#
			</span>

			<span className="FrameRailWord">
				{Translate("index.field", { defaultValue: "INDEX:" })}
			</span>

			{/*
			 * The register's figure. A register line without its count is the
			 * defect `RegisterLine.ts` exists to remove, and this one carried
			 * `# INDEX:` over ten tabs and no number - the reader could not tell
			 * how much of the document the rail was showing. The extent is
			 * `FrameSections.length`, so the figure cannot outlive the tabs.
			 */}
			<span className="FrameRailSep" aria-hidden="true">
				{"\u2001"}
			</span>

			<span className="FrameRailCount">{FrameExtent}</span>
		</p>

		{FrameSections.map((Section) => {
			const Label = FrameLabel(Section, Translate);

			return (
				<a
					key={Section.Key}
					className="FrameRailTab"
					href={Section.Href}
					data-section={Section.Key}
					title={`${Section.Index}\u2001/\u2001${Label}`}
					aria-label={`${Section.Index} ${Label}`}
				>
					<span className="FrameRailIndex">{Section.Index}</span>

					<span className="FrameRailName">{Label}</span>
				</a>
			);
		})}

		{/*
		 * The index itself, closing the rail.
		 *
		 * The ten tabs above are the parts; this is the page that lists them, so
		 * it is not an eleventh tab - it carries the grammar's relation mark
		 * (`↳`) where a part carries its number, and it is printed quieter than
		 * the series so the ten keep their shape. It is the one row that makes
		 * the index reachable by click from every page, including the widths
		 * where the rail is hidden (the footer carries the same door).
		 */}
		<a
			className="FrameRailTab FrameRailTabClosing"
			href={FrameClosing.Href}
			data-section={FrameClosing.Key}
			title={`${FrameClosing.Index}\u2001/\u2001${FrameLabel(FrameClosing, Translate)}`}
			aria-label={FrameLabel(FrameClosing, Translate)}
		>
			<span className="FrameRailIndex" aria-hidden="true">
				{FrameClosing.Index}
			</span>

			<span className="FrameRailName">
				{FrameLabel(FrameClosing, Translate)}
			</span>
		</a>
	</nav>
);

export { Rail };

export default Rail;
