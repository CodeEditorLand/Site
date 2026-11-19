"use client";

import { toast, Toaster as Sonner, type ToasterProps } from "sonner";

import * as React from "react";

import { cn } from "./Utility";

// ─── Theme note ───────────────────────────────────────────────────────────────
// One theme: the creme field with white inserts, no dark mode. next-themes is not
// wired up (there is no ThemeProvider in the Astro root), so `theme` is the literal
// "light" and the toaster never follows the OS - the site has nothing to follow it
// to.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sonner - a receipt for an action that has already happened.
 *
 * ─── A TOAST IS THE SHORTEST RECORD THE SITE PRINTS ──────────────────────
 * It has the record's four parts at the size of a slip at the corner: the state
 * word, the one sentence, the provenance, and - when the action can be taken back -
 * the undo. So the toaster is themed as the slip (`--Popover` fill, one `--Divider`
 * edge, radius 0, no shadow) and `SonnerReceipt` prints the same anatomy inline,
 * where it can be read without pressing anything.
 *
 * ─── A RECEIPT THAT OUTLIVES ITS SUBJECT IS A RECEIPT THAT LIES ──────────
 * The family's one behavioural rule: a receipt is dismissed when the action it
 * describes is undone, and an undo dismisses the receipt it undoes. `Notify.receipt`
 * returns the id so a caller can do exactly that, and `Notify.dismiss` is the one
 * way to take it back.
 *
 * ─── NO TWO-SECOND RECEIPTS ──────────────────────────────────────────────
 * Four seconds by default, not two: a sentence a reader has to read twice is not a
 * receipt, and the site's own copy is measured, not clipped. `Notify.failed` stands
 * for six - a refusal carries a cause and a door, which is two sentences.
 */

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--Popover)",
					"--normal-text": "var(--PopoverForeground)",
					"--normal-border": "var(--Border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

interface ReceiptInput {
	/** The state word the receipt reports: `VERIFIED`, `UNAVAILABLE`, `ARCHIVED`. */
	state: string;

	/** The one sentence. */
	line: string;

	/** The undo, when the action can be taken back. */
	undo?: { label: string; onClick: () => void };

	/** How long the receipt stands, in milliseconds. Default 4000. */
	duration?: number;
}

/**
 * Notify - the family's receipts, in the record grammar.
 *
 * `Notify.receipt` prints `STATE ␁ LINE` with an optional undo, and returns the
 * toast's id so the caller can dismiss it when the action it describes is undone.
 * `Notify.dismiss` is that dismissal, and `Notify.clear` takes every receipt off the
 * page - which is what a route change should do, because a receipt for an action on
 * the page you just left is a receipt about the wrong page.
 */
const Notify = {
	receipt({
		state,
		line,
		undo,
		duration = 4000,
	}: ReceiptInput): string | number {
		return toast(`${state}\u2001${line}`, {
			duration,
			...(undo === undefined
				? {}
				: { action: { label: undo.label, onClick: undo.onClick } }),
		});
	},

	/** A failed action: the destructive ink on the receipt's leading edge. */
	failed(line: string, undo?: ReceiptInput["undo"]): string | number {
		return toast.error(`UNAVAILABLE\u2001${line}`, {
			duration: 6000,
			...(undo === undefined
				? {}
				: { action: { label: undo.label, onClick: undo.onClick } }),
		});
	},

	/** A completed action: the accent on the receipt's leading edge. */
	verified(line: string, undo?: ReceiptInput["undo"]): string | number {
		return toast.success(`VERIFIED\u2001${line}`, {
			duration: 4000,
			...(undo === undefined
				? {}
				: { action: { label: undo.label, onClick: undo.onClick } }),
		});
	},

	dismiss(id?: string | number): void {
		toast.dismiss(id);
	},

	clear(): void {
		toast.dismiss();
	},
};

interface SonnerReceiptProps {
	/** The state word the receipt reports. */
	state: string;

	/** The one sentence. */
	line: string;

	/** The undo's label. A receipt without an undo is a receipt without a door. */
	action?: string;

	/** `success` and `error` set the leading edge's ink. */
	type?: "default" | "success" | "error";

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * SonnerReceipt - the receipt, printed inline.
 *
 * The same anatomy as the toast, at the same register, without the fixed position:
 * a reader with JS off, or a sheet that must show the state without asking anyone to
 * press a button, prints this.
 */
function SonnerReceipt({
	state,
	line,
	action,
	type = "default",
	className,
}: SonnerReceiptProps) {
	return (
		<div className={cn("SonnerReceipt", className)} data-type={type}>
			<p className="SonnerReceipt__Head">
				<span className="SonnerReceipt__Mark" aria-hidden="true">
					#
				</span>
				<span className="SonnerReceipt__Word">{state}</span>
			</p>

			<p className="SonnerReceipt__Line">{line}</p>

			{action === undefined ? null : (
				<span className="SonnerReceipt__Action">
					<span aria-hidden="true">↳</span> {action}
				</span>
			)}
		</div>
	);
}

export { Toaster, Notify, SonnerReceipt };
