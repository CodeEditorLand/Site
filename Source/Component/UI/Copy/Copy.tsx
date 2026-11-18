"use client";

import * as React from "react";

import { cn } from "../Utility";

import { CopiedInterval, CopyCopy, type CopyState } from "./Data";

/**
 * CopyReceipt - the copy affordance, in the row grammar.
 *
 * ─── IT IS A ROW, NOT AN ICON ──────────────────────────────────────────────
 *
 * `[mark] [label] [meta]` is the item grammar every control surface on the site
 * draws, and a copy control is a row that happens to be an action: `→ COPY
 * ROWS`, then `✓ COPIED` with the row count in the meta cell. It is not a
 * clipboard glyph in a 24px square, because an icon has no room to say *why* it
 * failed - and the reason is the half of the affordance that matters when the
 * world is unkind.
 *
 * ─── THE HOOK OWNS THE CLIPBOARD CONTRACT ──────────────────────────────────
 *
 * `useCopyReceipt` is the one place the site's copy states are decided: it asks
 * for the payload, writes it, and classifies the failure. `NotAllowedError` (and
 * a browser with no async clipboard at all) is `denied` - the permission is not
 * coming back this session, so the label stops offering a retry. Anything else
 * is `error` and keeps the retry, because it might clear.
 *
 * A `null` payload is `empty`, never an empty string written to the clipboard:
 * telling a reader their clipboard holds nothing is worse than telling them
 * there was nothing to copy.
 */

export interface CopyReceiptResult {
	State: CopyState;

	/** The figure the receipt prints in its meta cell, when the state has one. */
	Meta: string;

	Copy: () => void;

	/** Back to rest - called when the payload changes under a standing receipt. */
	Reset: () => void;
}

export const useCopyReceipt = (
	Payload: () => { Text: string; Meta: string } | null,
): CopyReceiptResult => {
	const [State, SetState] = React.useState<CopyState>("idle");

	const [Meta, SetMeta] = React.useState("");

	const Timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const Clear = React.useCallback(() => {
		if (Timer.current) clearTimeout(Timer.current);

		Timer.current = null;
	}, []);

	const Reset = React.useCallback(() => {
		Clear();

		SetState("idle");
		SetMeta("");
	}, [Clear]);

	React.useEffect(() => Clear, [Clear]);

	const Copy = React.useCallback(() => {
		const Next = Payload();

		if (Next === null) {
			SetState("empty");
			SetMeta("");

			return;
		}

		const Clipboard = navigator.clipboard;

		if (!Clipboard || typeof Clipboard.writeText !== "function") {
			SetState("denied");
			SetMeta(CopyCopy.denied.Meta);

			return;
		}

		Clipboard.writeText(Next.Text).then(
			() => {
				SetState("copied");
				SetMeta(Next.Meta);

				Clear();

				Timer.current = setTimeout(() => {
					SetState("idle");
					SetMeta("");
				}, CopiedInterval);
			},
			(Reason: unknown) => {
				const Denied =
					Reason instanceof DOMException &&
					Reason.name === "NotAllowedError";

				SetState(Denied ? "denied" : "error");
				SetMeta(Denied ? CopyCopy.denied.Meta : CopyCopy.error.Meta);
			},
		);
	}, [Clear, Payload]);

	return { State, Meta, Copy, Reset };
};

/**
 * The receipt itself. Presentational: it renders the state it is handed, so the
 * same object can be driven by the hook above or by a test's fixed state.
 */
export const CopyReceipt = ({
	State,
	Meta,
	Label,
	OnCopy,
	className,
}: {
	State: CopyState;

	/** The figure or the reason, printed in the meta cell. */
	Meta?: string;

	/** The row's words at rest; the state replaces them. */
	Label?: string;

	OnCopy: () => void;

	className?: string;
}) => {
	const Words = CopyCopy[State];

	const Text = State === "idle" && Label ? Label : Words.Label;

	return (
		<button
			type="button"
			className={cn("Copy", className)}
			data-state={State}
			aria-disabled={State === "empty" ? true : undefined}
			onClick={State === "empty" ? undefined : OnCopy}
		>
			<span className="Copy__Mark" aria-hidden="true">
				{Words.Mark}
			</span>
			<span className="Copy__Label">{Text}</span>
			{Meta || Words.Meta ? (
				<span className="Copy__Meta">{Meta || Words.Meta}</span>
			) : null}
		</button>
	);
};
