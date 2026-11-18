/**
 * TrustContents - the clause rail's marking and its position figure.
 *
 * The rail answers two questions while the reader is inside a legal document:
 * *which clause am I in*, and *where am I in the document*. The first is
 * `aria-current="location"` on the row plus the ink, the weight and the 2px
 * rule the stylesheet draws; the second is the `§NN` printed in the rail's head.
 *
 * Four rules it keeps:
 *
 * - **It reads the DOM, it does not guess.** The anchors point at the ids the
 *   clauses already carried, and the marked element is whatever element carries
 *   that id. No slug and no number is re-derived here, so a row, its clause and
 *   the figure in the head cannot disagree.
 * - **The current entry is a location, not a page.** `aria-current="location"`
 *   is the value for "the reader is here within this document".
 * - **Nothing is required.** With JavaScript off the list is a working jump
 *   list; only the marking and the figure are absent - the figure's cell
 *   reserves its width in the stylesheet, so nothing reflows when it arrives.
 * - **The scroll handler reads one number and nothing else.** Every target's
 *   offset is measured when the module wires, on resize and once on load; a
 *   scroll frame compares `window.scrollY` against the cached offsets and
 *   touches the DOM only when the current clause actually changes. A legal
 *   document is ten thousand pixels of prose, and a contents rail that forces a
 *   layout every frame is a rail that stutters while you read.
 *
 * The marking is a position, not a transition: nothing animates, so nothing
 * needs a reduced-motion branch.
 *
 * **Deliberately separate from `Doc/Contents.ts`.** That module is bound to the
 * article body and to the manual's own row class, and it marks a tree as well
 * as a contents list; this one marks a clause list and writes a figure. The two
 * share a measurement discipline, not a DOM. Unifying them is a card of its own,
 * not a copy-paste: the doc module would have to take its body selector, its row
 * class and its figure as parameters, and both surfaces would then have to be
 * re-read to prove nothing moved.
 */

/** A clause is "reached" once it clears the sticky header by this much. */
const Land = 24;

let Wired = false;

/**
 * The sticky header's height in pixels.
 *
 * `--HeaderHeight` is a `calc()` of two other custom properties, so its computed
 * value is still a token stream rather than a length. A probe element sized from
 * the token resolves it exactly, whatever the header's parts add up to.
 */
const HeaderHeight = (): number => {
	const Probe = document.createElement("div");

	Probe.style.cssText =
		"position:absolute;visibility:hidden;pointer-events:none;block-size:var(--HeaderHeight);inset-block-start:0";

	document.body.appendChild(Probe);

	const Height = Probe.getBoundingClientRect().height;

	Probe.remove();

	return Height;
};

export const WireTrustContents = (): void => {
	if (Wired) return;

	Wired = true;

	const Roots = Array.from(
		document.querySelectorAll<HTMLElement>("[data-trust-contents]"),
	);

	if (!Roots.length) return;

	const Body = document.querySelector<HTMLElement>(".reading-document__body");

	if (!Body) return;

	/** Every anchor in every register, filed by the id it points at. */
	const Links = new Map<string, HTMLAnchorElement[]>();

	for (const Root of Roots) {
		for (const Link of Root.querySelectorAll<HTMLAnchorElement>(
			'a[href^="#"]',
		)) {
			const Id = decodeURIComponent(
				(Link.getAttribute("href") ?? "").slice(1),
			);

			if (!Id) continue;

			const Found = Links.get(Id) ?? [];

			Found.push(Link);

			Links.set(Id, Found);
		}
	}

	/** The clauses, in document order: the body's elements the list points at. */
	const Targets = Array.from(
		Body.querySelectorAll<HTMLElement>("[id]"),
	).filter((Target) => Links.has(Target.id));

	if (!Targets.length) return;

	/** The figure in each rail's head; both registers may carry one. */
	const Figures = Array.from(
		document.querySelectorAll<HTMLElement>("[data-trust-position]"),
	);

	let Offsets: number[] = [];

	let Header = 0;

	const Measure = (): void => {
		Header = HeaderHeight();

		Offsets = Targets.map(
			(Target) => Target.getBoundingClientRect().top + window.scrollY,
		);
	};

	let Marked: string | null = null;

	const Mark = (): void => {
		const Line = window.scrollY + Header + Land;

		let Current: HTMLElement | null = null;

		for (let Position = 0; Position < Targets.length; Position++) {
			if (Offsets[Position]! <= Line) Current = Targets[Position]!;
			else break;
		}

		const Id = Current?.id ?? null;

		if (Id === Marked) return;

		Marked = Id;

		for (const [Target, Found] of Links) {
			const IsCurrent = Target === Id;

			for (const Link of Found) {
				Link.classList.toggle(
					"trust-contents__link--current",

					IsCurrent,
				);

				if (IsCurrent) Link.setAttribute("aria-current", "location");
				else Link.removeAttribute("aria-current");
			}
		}

		/* The figure prints the clause's own number, read back off its row -
		   never recomputed from the position in the list. */
		const Number =
			(Id &&
				document
					.querySelector<HTMLElement>(
						`.trust-contents__link[href="#${CSS.escape(Id)}"] [data-trust-number]`,
					)
					?.textContent?.trim()) ||
			"";

		for (const Figure of Figures) Figure.textContent = Number;
	};

	/**
	 * The scroll handler calls `Mark` directly rather than through a frame
	 * callback: `Mark` reads one number and compares it against cached offsets,
	 * so it costs a loop of arithmetic and no layout - and
	 * `requestAnimationFrame` is paused in a background tab, which would leave
	 * the rail showing the clause the reader left.
	 */
	const Schedule = (): void => {
		Mark();
	};

	const Remeasure = (): void => {
		Measure();

		Marked = null;

		Mark();
	};

	window.addEventListener("scroll", Schedule, { passive: true });

	window.addEventListener("resize", Remeasure);

	/* Fonts and images land after the first measure and move every clause; one
	   re-measure on load is what keeps the marks honest on a document with
	   figures and lists in it. */
	window.addEventListener("load", Remeasure, { once: true });

	Remeasure();
};

export default WireTrustContents;
