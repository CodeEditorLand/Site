/**
 * Type - the published shape of a record data card.
 *
 * A data card is a plain `div` that frames its children: it publishes no
 * content of its own, so its props are the host's class plus whatever HTML
 * attribute the host wants the frame to carry (a `data-*` hook, an `id`, an
 * `aria-*`). Those pass through to the outer `div` untouched.
 *
 * `className` is the published class prop - the React card's name, kept so the
 * call sites that predate the conversion do not have to move. `class` is
 * accepted as the same slot because that is how every `.astro` host in this
 * tree writes a class; both land on the frame in that order.
 */
export type Props = astroHTML.JSX.HTMLAttributes & {
	/** Extra classes from the host, appended after the block's own. */
	className?: string;
};
