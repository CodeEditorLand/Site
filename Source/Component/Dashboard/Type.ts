/**
 * Type - the shapes the dashboard's privacy directory renders.
 *
 * The three blocks under `Privacy & Data Rights` are three different card
 * shapes, not one shape with three labels, so they are three types:
 *
 * - a right is a title, its income code, the statutory article the code
 *   answers to, one sentence, and an `Open form` footer;
 * - a support channel is a title, its income code, one sentence, and the
 *   address the request lands at;
 * - the erasure block is a single red card: a title, the code, and what the
 *   generated request contains.
 *
 * Declaring them separately keeps the template from growing a `kind` branch
 * and keeps a right from being printed with a mailbox under it.
 */

/** One card in the `Your Rights Under GDPR` grid. */
export interface RightsCard {
	/** `Data Access & Export`. */
	readonly title: string;

	/** `REACH` - printed in the blue code chip. */
	readonly code: string;

	/** `GDPR Art. 15 + 20` - printed under the chip. */
	readonly article: string;

	/** One sentence: what the form asks for. */
	readonly body: string;

	/** `/Contact/Reach`. */
	readonly href: string;
}

/** One card in the `Support & Assistance` grid. */
export interface SupportCard {
	/** `Technical Support`. */
	readonly title: string;

	/** `SCOUT`. */
	readonly code: string;

	/** One sentence: what the form is for. */
	readonly body: string;

	/** `support@editor.land` - the address the request lands at. */
	readonly address: string;

	/** `/Contact/Scout`. */
	readonly href: string;
}

/** The `Delete Account` block: one heading, one sentence, one red card. */
export interface EraseBlock {
	/** `Delete Account`. */
	readonly label: string;

	/** One sentence: what the block does, and that it cannot be undone. */
	readonly intro: string;

	/** `Permanent Account Deletion`. */
	readonly title: string;

	/** `ERASE`. */
	readonly code: string;

	/** What the generated erasure request contains. */
	readonly body: string;

	/** `/Contact/Erase`. */
	readonly href: string;
}

/** One labelled grid of request cards. */
export interface RequestGrid<Card> {
	/** `Your Rights Under GDPR` / `Support & Assistance`. */
	readonly label: string;

	/** One sentence: what the grid is for. */
	readonly intro: string;

	/** The cards, in the order the grid prints them. */
	readonly cards: readonly Card[];
}
