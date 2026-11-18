/**
 * Contents - the page's own contents list, marked as the reader scrolls.
 *
 * `DocContents` renders the list twice on an article: once in the sticky rail
 * (the pinned register, >= 1024px) and once as a collapsed disclosure above the
 * paper (the narrow-viewport register). Both carry `data-doc-contents`, and this
 * module wires every root it finds, so the two instances share one behaviour and
 * which of them is painted is the CSS's business, not this module's.
 *
 * Four rules it keeps:
 *
 * - **It reads the DOM, it does not guess.** The anchors point at the ids the
 *   markdown pipeline wrote, and the marked element is whatever element carries
 *   that id - a `##` heading on an article, a section wrapper on the index. No
 *   slug is re-derived here, so a link and its target cannot disagree.
 * - **The current entry is a location, not a page.** `aria-current="location"`
 *   is the value for "the reader is here within this document"; `page` belongs
 *   to the rail's tree, which marks the document itself.
 * - **Nothing is required.** With JavaScript off the list is still a list of
 *   anchors that jump to their headings; only the marking is absent. No entry is
 *   hidden, no entry is disabled, and the list is never re-ordered.
 * - **The scroll handler reads one number and nothing else.** Every target's
 *   position is measured once, when the module wires and again when the viewport
 *   changes; a scroll frame then compares `window.scrollY` against cached offsets
 *   and touches the DOM only when the current section actually changes. Measuring
 *   per frame - or worse, appending a probe element per frame to resolve
 *   `--HeaderHeight` - forces a layout on a page that is ten thousand pixels tall
 *   with a hundred code blocks in it, and a manual that stutters while you read it
 *   is not a well-made tool.
 *
 * The marking is a position, not a transition: nothing animates, so nothing needs
 * a reduced-motion branch.
 */

/** A heading is "reached" once it clears the sticky header by this much. */
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

export const WireContents = (): void => {
	if (Wired) return;

	Wired = true;

	const Roots = Array.from(
		document.querySelectorAll<HTMLElement>("[data-doc-contents]"),
	);

	if (!Roots.length) return;

	const Body = document.querySelector<HTMLElement>(".doc-article__body");

	if (!Body) return;

	/** Every anchor in every root, filed by the id it points at. */
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

	/**
	 * The targets, in document order: any element the list points at. On an
	 * article these are the body's `##` headings; on the index they are the
	 * section wrappers, which is where the anchor lives there.
	 */
	const Targets = Array.from(
		Body.querySelectorAll<HTMLElement>("[id]"),
	).filter((Target) => Links.has(Target.id));

	if (!Targets.length) return;

	/** Each target's distance from the top of the document, measured on demand. */
	let Offsets: number[] = [];

	let Header = 0;

	const Measure = (): void => {
		Header = HeaderHeight();

		Offsets = Targets.map(
			(Target) => Target.getBoundingClientRect().top + window.scrollY,
		);
	};

	let Marked: string | null = null;

	/** Which target the reader has passed, from the cached offsets alone. */
	const Mark = (): void => {
		const Line = window.scrollY + Header + Land;

		let Current: string | null = null;

		for (let Position = 0; Position < Targets.length; Position++) {
			if (Offsets[Position]! <= Line) Current = Targets[Position]!.id;
			else break;
		}

		if (Current === Marked) return;

		Marked = Current;

		for (const [Id, Found] of Links) {
			const IsCurrent = Id === Current;

			for (const Link of Found) {
				Link.classList.toggle("doc-contents__link--current", IsCurrent);

				if (IsCurrent) Link.setAttribute("aria-current", "location");
				else Link.removeAttribute("aria-current");
			}
		}
	};

	/**
	 * The scroll handler calls `Mark` directly rather than through a frame
	 * callback: `Mark` reads one number and compares it against cached offsets, so
	 * it costs a loop of arithmetic and no layout - and `requestAnimationFrame` is
	 * paused in a background tab, which would leave the rail showing the section
	 * the reader left.
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

	/* Fonts and images land after the first measure and move every heading; one
	   re-measure on load is what keeps the marks honest on a page with a diagram
	   in it. */
	window.addEventListener("load", Remeasure, { once: true });

	Remeasure();
};

export default WireContents;
