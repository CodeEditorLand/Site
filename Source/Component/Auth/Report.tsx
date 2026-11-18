/**
 * AuthReport - one state inside the auth card.
 *
 * The baseline's card anatomy, as one block: an optional glyph tile, the
 * state's coded label, the state's title, one sentence saying what happened,
 * and the action the reader can take now. Verify's pending state is the
 * reference (`p-6 space-y-1.5 text-center` over `p-6 pt-0 space-y-6`), so every
 * other state a route can reach lands on the same surface instead of inventing
 * a second card. The title is an `h2`: the baseline prints an `h3` because the
 * baseline has no page heading, and the route's `AuthShell` now supplies the
 * `h1`.
 *
 * **`State` is the state's word, and it is the reason this block changed.**
 * Verify's five states (`PREPARING`, `LOADING`, `VERIFIED`, `INTERRUPTED`,
 * `UNAVAILABLE`) were carried by `Verify.json` and printed by nobody: the card
 * named the state in prose and the vocabulary never appeared. A state that
 * prints only as a sentence has lost its state exactly as much as one that
 * prints as a bare colour, so the label is now a required field of a report
 * that has a state, and it prints through `StateBadge` - the register's tone
 * table, the register's 2px marker, one of §1.5's eight words.
 *
 * A branch is never a bare word: the label names the state, the title says
 * which state of *this* route it is, the sentence says what it means and
 * `children` holds the action. A state with no sentence is not representable
 * here on purpose - and neither is an action that is silently dropped: the
 * block used to destructure `Children` while every call site passed React
 * children, so the action of every report on this surface rendered nowhere.
 */
import type { CSSProperties, ReactNode } from "react";

import { CircleAlert, CircleCheck, Loader2, Mail } from "lucide-react";

import { StateBadge } from "../Surface/StateBadge";

type Glyph = "alert" | "check" | "loading" | "mail";

const Glyphs: Record<Glyph, typeof Mail> = {
	alert: CircleAlert,

	check: CircleCheck,

	loading: Loader2,

	mail: Mail,
};

interface Props {
	/**
	 * The state's coded label, in the site's grammar: `STATUS: PREPARING`.
	 *
	 * Omitted only by the one form-shaped report that is not a state of the
	 * machine (`DynamicResetPassword`'s valid state renders the form itself).
	 * A caller passes a term from `State.ts`'s eight - through `StateLabel` in
	 * `DynamicStateReport`, or the route's own locale key - never a phrase.
	 */
	State?: string;

	/**
	 * The state's own name - an `h2`, one level under the shell's `h1`.
	 *
	 * The baseline prints it as an `h3` because the baseline has no page heading
	 * at all. Once `AuthShell` supplies the page's `h1` (`DESIGN-COMPLETE.md` §6
	 * X10), a state title one level under it is an `h2`; keeping the `h3` would
	 * skip a level between the page and its own state.
	 */
	Title: string;

	/** What happened, in one sentence (or one composed paragraph). */
	Sentence: ReactNode;

	/** The state's glyph. Omitted means no tile, like the reset form. */
	Glyph?: Glyph;

	/** `alert` for a failure the reader did not ask for. */
	Role?: "alert" | "status";

	/** The action block, laid out under the sentence. */
	children?: ReactNode;
}

const AuthReport = ({
	State,
	Title,
	Sentence,
	Glyph,
	Role,
	children,
}: Props) => {
	const Icon = Glyph ? Glyphs[Glyph] : null;

	return (
		<>
			<div className="flex flex-col space-y-1.5 p-6 text-center">
				{State && (
					<div className="auth-shell__status mb-3 flex justify-center">
						<StateBadge Label={State} />
					</div>
				)}

				{/* ─── THE LOADING GLYPH IS NOT A GLYPH ────────────────────────
				    `Glyph === "loading"` rendered `Loader2` with `animate-spin` in
				    the 48px tile. A spinner is a loop: it says "something is
				    happening" for as long as it turns and nothing else, and the
				    state's own word is already printed in the badge above it. A
				    loading report draws the busy arm instead - two bars in the
				    record grammar, the shape of the answer that has not arrived,
				    from the skeleton layer's own two tokens. The tile's fill is
				    kept so the card's anatomy does not change; only what stands
				    inside it does. */}
				{Glyph === "loading" ? (
					<div
						className="StateBusy StateBusy--stack flat mx-auto mb-4 w-40 justify-center bg-[color-mix(in_srgb,var(--Primary)_10%,transparent)] p-4"
						aria-busy="true"
						aria-hidden="true"
					>
						<span
							className="StateBusy__Bar"
							style={{ "--bar": "100%" } as CSSProperties}
						/>

						<span
							className="StateBusy__Bar"
							style={{ "--bar": "62%" } as CSSProperties}
						/>
					</div>
				) : Icon ? (
					<div className="flat mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[color-mix(in_srgb,var(--Primary)_10%,transparent)]">
						<Icon
							aria-hidden="true"
							className="h-6 w-6 text-primary"
						/>
					</div>
				) : null}

				<h3 className="type-heading">{Title}</h3>

				<p className="text-sm text-card-foreground opacity-70">
					{Sentence}
				</p>
			</div>

			{children && (
				<div
					className="space-y-6 p-6 pt-0"
					role={Role ?? undefined}

					aria-live="polite"
				>
					{children}
				</div>
			)}
		</>
	);
};

export { AuthReport };

export default AuthReport;
