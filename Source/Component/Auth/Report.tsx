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
 * **`State` is the state's word, and it is what makes the report a state.** A
 * state that prints only as a sentence has lost its state exactly as much as one
 * that prints as a bare colour, so a report that has a state carries the label -
 * a term from `State.ts`'s eight, printed through `StateBadge`: the register's
 * tone table, the register's 2px marker, one of §1.5's words. The prop is
 * optional because one form-shaped report is not a state of the machine
 * (`DynamicResetPassword`'s valid arm renders the form itself).
 *
 * A branch is never a bare word: the label names the state, the title says
 * which state of *this* route it is, the sentence says what it means and
 * `children` holds the action. A state with no sentence is not representable
 * here on purpose - and neither is an action that is silently dropped: an
 * action passed as React children must render, and `Action` exists so a report
 * outside an island can print one too.
 *
 * **The three fields that complete the block.** Each one is inside the block
 * because a report without it has no answer:
 *
 * - `Heading` - the title is an `h2` under the shell's `h1`. `2` is the default;
 *   `3` exists for the one nesting case, where a report sits inside another
 *   report's subject.
 * - `Facts` - a report could say what happened and not what it was made of. The
 *   window a link was open for, the cause the provider returned and the route a
 *   retry goes to print as `KEY: value` rows under the sentence.
 * - `Action` - the one thing a reader can click, expressible as data, so a
 *   state rendered outside an island (the specimen sheet, a link-shaped ending)
 *   can print its action at all.
 */
import type { CSSProperties, ReactNode } from "react";

import { CircleAlert, CircleCheck, Loader2, Mail } from "lucide-react";

import { StateBadge } from "../Surface/StateBadge";

import type { AuthAction, AuthFact } from "./Type.js";

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

	/**
	 * The heading level of the state's title.
	 *
	 * `2` (the default) is the level the report prints: the shell above it
	 * supplies the page's `h1`, so the state is one level under the page. An
	 * `h3` here would skip a level. `3` is for the one place a report is nested
	 * inside another report's subject, and it is the only reason the level is a
	 * prop rather than a constant.
	 */
	Heading?: 2 | 3;

	/**
	 * The facts the state is made of: the window, the cause, the retry.
	 *
	 * A report's sentence says what happened; these print under it in the
	 * record grammar (`KEY: value`), because the one thing a reader under stress
	 * wants after the sentence is the fact they can check and the next thing to
	 * do. Additive: a report that passes none renders exactly as it did.
	 */
	Facts?: readonly AuthFact[];

	/**
	 * The report's one action, as data.
	 *
	 * `children` remains the way a form-shaped report hands in its own buttons
	 * (they carry handlers). A report that is only a state - every row of a
	 * specimen sheet, a link-shaped ending - passes its action here, so the
	 * block does not need a second wrapper to print the one thing a reader can
	 * click. Rendered only when `children` is absent: one action per report.
	 */
	Action?: AuthAction;

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
	Heading = 2,
	Facts,
	Action,
	Role,
	children,
}: Props) => {
	const Icon = Glyph ? Glyphs[Glyph] : null;

	const HeadingTag = Heading === 3 ? "h3" : "h2";

	return (
		<>
			<div className="flex flex-col space-y-1.5 p-6 text-center">
				{State && (
					<div className="auth-shell__status mb-3 flex justify-center">
						<StateBadge Label={State} />
					</div>
				)}

				{/* ─── THE LOADING GLYPH IS NOT A GLYPH ────────────────────────
				    A spinner is a loop: it says "something is happening" for
				    as long as it turns and nothing else, and the state's own
				    word is already printed in the badge above it. A loading
				    report draws the busy arm instead - two bars in the record
				    grammar, the shape of the answer that has not arrived,
				    from the skeleton layer's own two tokens. The tile's fill
				    is kept so the card's anatomy does not change; only what
				    stands inside it does. */}
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

				<HeadingTag className="type-heading">{Title}</HeadingTag>

				<p className="text-sm text-card-foreground opacity-70">
					{Sentence}
				</p>

				{/* ─── THE STATE'S FACTS ──────────────────────────────────────
				    The sentence says what happened; these say what the reader
				    can check and what happens next. They print in the record
				    grammar every other fact on this surface uses, at the meta
				    step, so a report is auditable without a second block. */}
				{Facts && Facts.length > 0 ? (
					<dl className="auth-shell__facts">
						{Facts.map((Fact) => (
							<div className="auth-shell__fact" key={Fact.key}>
								<dt className="auth-shell__fact-key">
									{Fact.key}
								</dt>
								<dd className="auth-shell__fact-value">
									{Fact.code ? (
										<code>{Fact.value}</code>
									) : (
										Fact.value
									)}
								</dd>
							</div>
						))}
					</dl>
				) : null}
			</div>

			{children ? (
				<div
					className="space-y-6 p-6 pt-0"
					role={Role ?? undefined}

					aria-live="polite"
				>
					{children}
				</div>
			) : Action ? (
				<div
					className="space-y-6 p-6 pt-0"
					role={Role ?? undefined}

					aria-live="polite"
				>
					<a
						className="auth-shell__primary auth-shell__report-action"
						href={Action.href}
					>
						{Action.label}

						<span aria-hidden="true">{"\u2001"}</span>
						<span aria-hidden="true">&#8594;</span>
					</a>
				</div>
			) : null}
		</>
	);
};

export { AuthReport };

export default AuthReport;
