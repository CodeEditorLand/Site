/**
 * Wire the copy control inside RecordWell blocks.
 *
 * The block renders a `jelly-icon-button` - the design system's element, not a
 * hand-rolled `<button>` - with the raw command on `data-copy-payload`, and
 * leaves it `hidden` until this module binds it. Three consequences:
 *
 * - With JavaScript off the control never leaves `hidden`: the well prints its
 *   command and nothing else. No inert button, no empty focus stop, and every
 *   line of the `<pre>` is still selectable.
 * - With no clipboard API (an insecure context) the control stays hidden too. A
 *   copy button that cannot copy is absent, not dead.
 * - `WireCopyButtons()` in `Function/Utility/CopyCommand` cannot bind it: that
 *   resolves its source as the button's previous element sibling, which inside a
 *   well is the title bar's label span, not the `<pre>`. The payload therefore
 *   rides `data-copy-payload`, which the sitewide `jelly-icon-button[data-copy]`
 *   selector does not claim.
 *
 * The behaviour is the one contract every copy control on the site shares
 * (`DesignSystem-Components.md` §4.1): `navigator.clipboard.writeText`, the copy
 * icon swapped for a check, `label` / `aria-label` / `title` reading "Copied"
 * for 1800ms, then the original icon and label back.
 */

/** How long the confirmation stays before the control returns to its own label. */
const Hold = 1800;

/** The word the control reads while the clipboard holds the payload. */
const Feedback = "Copied";

/** The glyph the control shows while the clipboard holds the payload. */
const CheckMark = `<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	style="color: var(--jelly-label)"
	aria-hidden="true"
><path d="M20 6 9 17l-5-5" /></svg>`;

/** The clipboard write, or nothing when the context cannot copy at all. */
const Clipboard =
	typeof navigator === "undefined"
		? undefined
		: navigator.clipboard?.writeText?.bind(navigator.clipboard);

function Bind(
	Button: HTMLElement,

	Write: (Text: string) => Promise<void>,
): void {
	const Label = Button.getAttribute("label") ?? "Copy to clipboard";

	const Icon = Button.innerHTML;

	Button.addEventListener("click", async () => {
		try {
			await Write(Button.dataset.copyPayload ?? "");
		} catch {
			// Clipboard refused or unavailable: leave the control as it was.
			return;
		}

		Button.innerHTML = CheckMark;

		Button.setAttribute("label", Feedback);

		Button.setAttribute("aria-label", Feedback);

		Button.setAttribute("title", Feedback);

		setTimeout(() => {
			Button.innerHTML = Icon;

			Button.setAttribute("label", Label);

			Button.setAttribute("aria-label", Label);

			Button.setAttribute("title", Label);
		}, Hold);
	});

	Button.hidden = false;
}

export function WireWells(Selector: string = "[data-record-well-copy]"): void {
	if (!Clipboard) return;

	const Buttons = Array.from(
		document.querySelectorAll<HTMLElement>(Selector),
	);

	for (const Button of Buttons) {
		if (Button.dataset.copyWired === "true") continue;

		Button.dataset.copyWired = "true";

		Bind(Button, Clipboard);
	}
}
