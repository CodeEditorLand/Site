/**
 * AuthReport - one state inside the auth card.
 *
 * The baseline's card anatomy, as one block: an optional glyph tile, the
 * state's `h3` title, one sentence saying what happened, and the action the
 * reader can take now. Verify's pending state is the reference (`p-6
 * space-y-1.5 text-center` over `p-6 pt-0 space-y-6`), so every other state a
 * route can reach lands on the same surface instead of inventing a second
 * card.
 *
 * A branch is never a bare word: the title names the state, the sentence says
 * what it means and `Children` holds the action. A state with no sentence is
 * not representable here on purpose.
 */
import type { ReactNode } from "react";

import { CircleAlert, CircleCheck, Loader2, Mail } from "lucide-react";

type Glyph = "alert" | "check" | "loading" | "mail";

const Glyphs: Record<Glyph, typeof Mail> = {
	alert: CircleAlert,
	check: CircleCheck,
	loading: Loader2,
	mail: Mail,
};

interface Props {
	/** The state's own name - an `h3`, the level the baseline prints. */
	Title: string;

	/** What happened, in one sentence (or one composed paragraph). */
	Sentence: ReactNode;

	/** The state's glyph. Omitted means no tile, like the reset form. */
	Glyph?: Glyph;

	/** `alert` for a failure the reader did not ask for. */
	Role?: "alert" | "status";

	/** The action block, laid out under the sentence. */
	Children?: ReactNode;
}

const AuthReport = ({ Title, Sentence, Glyph, Role, Children }: Props) => {
	const Icon = Glyph ? Glyphs[Glyph] : null;

	return (
		<>
			<div className="flex flex-col space-y-1.5 p-6 text-center">
				{Icon && (
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[color-mix(in_srgb,var(--Primary)_10%,transparent)] flat">
						<Icon
							aria-hidden="true"
							className={
								Glyph === "loading"
									? "h-6 w-6 animate-spin text-primary"
									: "h-6 w-6 text-primary"
							}
						/>
					</div>
				)}

				<h3 className="font-mono text-2xl font-medium tracking-tight">
					{Title}
				</h3>

				<p className="text-card-foreground text-sm opacity-70">{Sentence}</p>
			</div>

			{Children && (
				<div
					className="space-y-6 p-6 pt-0"
					role={Role ?? undefined}
					aria-live="polite"
				>
					{Children}
				</div>
			)}
		</>
	);
};

export { AuthReport };

export default AuthReport;
