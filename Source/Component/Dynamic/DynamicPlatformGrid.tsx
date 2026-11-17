import type { CSSProperties } from "react";

import type Content from "../Interface/Content/Grid/Platform.js";

import { Caption, Columns, Footnote, Kicker, RowsOf } from "./Platform/Data.js";

import type { PlatformRow } from "./Platform/Type.js";

/**
 * The platforms - what exists today, per platform, as a matrix.
 *
 * The band used to print three near-identical download cards, each with a
 * `Download for <platform>` button, a `Version: Pre-release` row, a
 * `Size: Coming Soon` row and a `SIGNING: IN PREPARATION` row. Three cards that
 * say the same thing in the same order are not a comparison, and a download
 * button for a file that is not published is the one dishonest control on the
 * page. The matrix says the same facts in one table, where the two empty
 * columns are the statement: source builds exist, installers and signatures do
 * not.
 *
 * What was removed with the cards, and why:
 *
 * - **The download button.** It called the Workers download API for a URL that
 *   the content itself says is not published yet (`Size: Coming Soon`,
 *   `SIGNING: IN PREPARATION`). Nothing is lost: the Download page carries the
 *   build path, and the band's caption names it.
 * - **The Workers `Download.GetLatest` fetch.** It only ran when no platforms
 *   were passed, which never happens from `HomePage.tsx`, and its fallbacks
 *   were three invented file sizes (`45.2 MB`, `48.7 MB`, `41.3 MB`) and a
 *   requirements list no file in the tree states. A fabricated number is worse
 *   than no number.
 * - **The noise scatter and the loading/error branches.** A printed table has
 *   neither a card to scatter nor a request to wait on.
 *
 * The markup is the Record layer's published class API (`record-band`,
 * `record-matrix`) rather than the `.astro` blocks: this component is a child
 * of the page's `ErrorBoundary` inside `HomePage.tsx`, and an `.astro`
 * component cannot be imported from a `.tsx` file (BRIDGE §2.1).
 *
 * The matrix sits on a `jelly-card`, which is the surface the three platform
 * cards carried, and the custom properties are the ones those cards set. One
 * of them changes owner: `--jelly-color-border-default` used to be each
 * platform's accent (`PlatformColorMap[Platform.Name]`), and a single matrix
 * has no single platform to take an accent from - so it carries the site
 * hairline (`var(--Border)`), the value the shared `JellyCardStyle` gives every
 * card that has no element of its own.
 */
interface Props {
	readonly Content: Content;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "PlatformsHeading";

/**
 * A cell's classes: the block's own, the centre modifier the columns ask for,
 * and the mark modifier when the value is one of the two the stylesheet names.
 */
const CellClass = (Value: string): string => {
	const Mark =
		Value === "yes"
			? " record-matrix__cell--yes"
			: Value === "no"
				? " record-matrix__cell--no"
				: "";

	return `record-matrix__cell record-matrix__cell--center${Mark}`;
};

/** A header cell's classes: its own, plus the centre modifier. */
const ColumnClass = (Align: "left" | "center" | undefined): string =>
	`record-matrix__column${Align === "center" ? " record-matrix__column--center" : ""}`;

const PlatformGrid = ({ Content, ClassName }: Props) => {
	const { Title, Subtitle, Platforms } = Content;

	const Rows = RowsOf(Platforms ?? []);

	return (
		<section
			id="download"
			aria-labelledby={HeadingId}
			className={`record-band record-band--canvas ${ClassName ?? ""}`.trim()}
		>
			<div className="record-band__inner">
				<p className="record-band__kicker">{Kicker}</p>
				<h2 id={HeadingId} className="record-band__heading">
					{Title}
				</h2>
				{Subtitle ? (
					<p className="record-band__standfirst">{Subtitle}</p>
				) : null}

				{Rows.length > 0 ? (
					<div className="record-band__body">
						<jelly-card
							style={
								{
									"--jelly-color-border-default":
										"var(--Border)",
									"--jelly-fill": "var(--Card)",
									"--jelly-radius": "0",
									"--jelly-card-padding-block": "0",
									"--jelly-card-padding-inline": "0",
									"--jelly-card-font-size": "inherit",
								} as CSSProperties
							}
						>
							<div className="record-matrix platform-matrix">
								<table className="record-matrix__table">
									<caption className="record-matrix__caption">
										{Caption}
									</caption>
									<thead>
										<tr className="record-matrix__head">
											<td />
											{Columns.map((Column) => (
												<th
													key={Column.label}
													scope="col"
													className={ColumnClass(
														Column.align,
													)}
													style={
														Column.ink
															? ({
																	"--col-ink": `var(--${Column.ink})`,
																} as CSSProperties)
															: undefined
													}
												>
													{Column.label}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{Rows.map((Row: PlatformRow) => (
											<tr
												className="record-matrix__row"
												key={Row.label}
											>
												<th
													scope="row"
													className="record-matrix__label"
												>
													{Row.label}
													{Row.note ? (
														<span className="platform-matrix__note">
															{Row.note}
														</span>
													) : null}
												</th>
												{Row.cells.map(
													(Cell, Index) => (
														<td
															key={
																Columns[Index]
																	?.label ??
																Index
															}
															className={CellClass(
																Cell,
															)}
														>
															{Cell}
														</td>
													),
												)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</jelly-card>
					</div>
				) : null}

				<p className="record-band__footnote">{Footnote}</p>
			</div>
		</section>
	);
};

export { PlatformGrid as DynamicPlatformGrid };

export default PlatformGrid;
