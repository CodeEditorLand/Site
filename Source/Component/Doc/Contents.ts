/**
 * Contents - the page's own contents list, marked as the reader scrolls.
 *
 * `DocContents` renders the list twice on an article: once in the sticky rail
 * (the pinned register, >= 1024px) and once as a collapsed disclosure above the
 * paper (the narrow-viewport register). Both carry `data-doc-contents`, and this
 * module wires every root it finds, so the two instances share one behaviour and
 * which of them is painted is the CSS's business, not this module's.
 *
 * Five rules it keeps:
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
 * - **The page has no scroll handler.** Position used to be resolved by a
 *   `scroll` listener comparing `window.scrollY` against offsets cached at wire
 *   time - which is cheap per event, but it is still a handler on the one event a
 *   reader generates sixty times a second, and the cache went stale the moment
 *   the document's geometry changed underneath it (a font landing, an image
 *   decoding, a block below the fold being laid out for the first time). An
 *   `IntersectionObserver` on the headings replaces both: the browser reports the
 *   crossings, the callback reads nothing from layout, and a reflow that moves a
 *   heading moves the observation with it, because the observation *is* the
 *   geometry.
 * - **One write per section change.** The callback maintains a set of ids inside
 *   the reading band; the current entry is the first of them in document order.
 *   Nothing is written unless the answer differs from the one already marked, so
 *   a reader scrolling through a section costs zero DOM writes.
 *
 * The band is the header's band, not a second opinion: `-25% 0px -60% 0px` is the
 * `rootMargin` `Component/Layout/Header.tsx` uses to decide which section the
 * running head is in. The two registers answer the same question about the same
 * page, so they are given the same answer by construction rather than by two
 * tuned thresholds drifting apart.
 *
 * The marking is a position, not a transition: nothing animates, so nothing needs
 * a reduced-motion branch.
 */

let Wired = false;

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
	const Targets = Array.from(Body.querySelectorAll<HTMLElement>("[id]")).filter(
		(Target) => Links.has(Target.id),
	);

	if (!Targets.length) return;

	/* No observer, no marking: the list is still a working jump list, which is
	   the contract this module has always kept on a browser it cannot use. */
	if (typeof IntersectionObserver === "undefined") return;

	/** The targets inside the reading band right now. */
	const InBand = new Set<string>();

	/** The id currently marked, so a frame with the same answer writes nothing. */
	let Marked: string | null = null;

	const Paint = (Current: string | null): void => {
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
	 * The current entry: the first target in document order that is inside the
	 * band. Reading `Targets` rather than `InBand` is what makes "first" mean
	 * *first in the document* - a `Set` iterates in insertion order, which is the
	 * order the crossings arrived in, and a reader scrolling back up would get the
	 * answer backwards.
	 *
	 * Nothing in the band means the reader is between two sections: the last mark
	 * stands, because a register that blanks itself between sections has lost the
	 * reader it was guiding.
	 */
	const Resolve = (): void => {
		for (const Target of Targets) {
			if (InBand.has(Target.id)) {
				Paint(Target.id);

				return;
			}
		}
	};

	const Observer = new IntersectionObserver(
		(Entries) => {
			for (const Entry of Entries) {
				if (Entry.isIntersecting) InBand.add(Entry.target.id);
				else InBand.delete(Entry.target.id);
			}

			Resolve();
		},
		{ rootMargin: "-25% 0px -60% 0px" },
	);

	for (const Target of Targets) Observer.observe(Target);
};

export default WireContents;
