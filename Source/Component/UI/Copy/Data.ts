/**
 * The copy affordance's words, and its five states.
 *
 * ─── WHY A RECEIPT AND NOT A TOAST ─────────────────────────────────────────
 *
 * The site already has three wired copy patterns (`WireCodeBlockCopyButtons`,
 * `WireCopyButtons`, `RichTextCopyButton`) and they share one contract: the
 * label changes to "Copied" for 1800 ms. That is a toast's timing, and a toast
 * is a thing that tells the reader something happened and then takes the
 * evidence away. The control built here states the outcome *where the control
 * is*, in the record grammar, and it keeps the state until the thing it copied
 * changes - so a reader who looks back a minute later still knows whether the
 * clipboard holds what they think it does.
 *
 * ─── FIVE STATES, AND THE TWO THAT MATTER ──────────────────────────────────
 *
 *   idle       `→ COPY ROWS`                  nothing has been asked yet
 *   copied     `✓ COPIED ␁ 13 ROWS`           the clipboard holds this payload
 *   denied     `◎ DENIED ␁ CLIPBOARD UNAVAILABLE`  the browser refused, and it
 *                                                will refuse again: the meta
 *                                                cell says so, and the label
 *                                                does not offer a retry that
 *                                                cannot work
 *   error      `◎ INTERRUPTED ␁ TRY AGAIN`    the write failed for a reason
 *                                                that may clear
 *   empty      `◎ NOTHING TO COPY`            there is no payload, and the
 *                                                control says that rather than
 *                                                copying an empty string
 *
 * `denied` and `error` are different facts and they get different next steps.
 * Collapsing them into "copy failed" would be the one thing the brief forbids:
 * a state that does not tell the reader what to do.
 */

export type CopyState = "idle" | "copied" | "denied" | "error" | "empty";

export const CopyCopy = {
	idle: { Mark: "→", Label: "COPY", Meta: "" },

	copied: { Mark: "✓", Label: "COPIED", Meta: "" },

	denied: { Mark: "◎", Label: "DENIED", Meta: "CLIPBOARD UNAVAILABLE" },

	error: { Mark: "◎", Label: "INTERRUPTED", Meta: "TRY AGAIN" },

	empty: { Mark: "◎", Label: "NOTHING TO COPY", Meta: "" },
} as const;

/**
 * How long a *copied* receipt stands before it returns to rest.
 *
 * The site's wired controls use 1800 ms; this control keeps the receipt until
 * its payload changes, so the timer exists only to stop a stale "copied" from
 * outliving the session's attention. A failure receipt is never timed out - a
 * reader who missed it would be left believing the copy worked.
 */
export const CopiedInterval = 8000;
