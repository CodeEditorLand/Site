/**
 * Wire the copy controls inside RecordWell blocks.
 *
 * RecordWell ships the control but not its behaviour: the block's own contract
 * is that the caller hydrates `[data-record-well-copy]` from its island and
 * reads the payload from that element's `data-copy`. The sitewide
 * `WireCopyButtons()` in `Function/Utility/CopyCommand` cannot do it - it
 * resolves its source as the button's previous element sibling, which inside a
 * well is the title bar's label span, not the `<pre>`.
 *
 * So this is the caller side: one listener per control, the payload read from
 * the attribute the block already wrote, and the same 1800ms swap the jelly
 * buttons use, so two copy affordances on one page behave identically.
 */

/** How long the confirmation stays before the control returns to its own label. */
const Hold = 1800;

/** The word the control shows while the clipboard holds the payload. */
const Feedback = "copied";

export function WireWells(Selector: string = "[data-record-well-copy]"): void {
	const Buttons = Array.from(
		document.querySelectorAll<HTMLElement>(Selector),
	);

	for (const Button of Buttons) {
		const Label = Button.innerHTML;

		Button.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(Button.dataset.copy ?? "");
			} catch {
				// Clipboard unavailable or refused: leave the control as it was.
				return;
			}

			Button.textContent = Feedback;

			setTimeout(() => {
				Button.innerHTML = Label;
			}, Hold);
		});
	}
}
