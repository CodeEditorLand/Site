/**
 * Occurrence-level context rules for the markdown pass (Phase 3g): keyed by
 * page key (.md basename, no extension) then term; each rule splits a term's
 * meaning by the ENCLOSING SENTENCE of each occurrence, so the same term can
 * link in one sentence and stay plain in another on the SAME page.
 *
 * Rule shape:
 *   { when: <sentence-regex source>, then: <URL | false> }
 * Semantics (per text-path match, resolution order):
 *   page override (LinkIndexOverrides) -> context rules (first `when` that
 *   matches the match's enclosing sentence; `then: false` = plain text,
 *   URL = pinned) -> global index -> plain text. First-match-wins and
 *   deterministic: rules are consulted in array order, and the FIRST rule
 *   whose `when` matches decides. The inline-code path is unchanged (whole
 *   span lookups have no enclosing sentence; their page override still
 *   applies).
 *
 * Sentence window: the text-node value split on /[.!?]\s+/ and newlines;
 * the segment containing the match. If the node value is a fragment (no
 * sentence boundary inside the value - e.g. a bold/italic span or a value
 * cut by inline markup), +/-80 chars around the match within the value
 * (clamped to the value bounds) is used instead.
 *
 * Regexes are compiled ONCE at module load (the cache pattern): per-render
 * resolution tests the precompiled regexes and never recompiles a `when`
 * source. Compilation uses the `i` flag - sentence matching is
 * case-insensitive so "Terminal pane" and "terminal pane" both hit the same
 * rule.
 *
 * Seed rules:
 *  - troubleshooting.Terminal: the page's "Terminal not opening" / "terminal
 *    pane" contexts are prose, not the VS Code Terminal API -> plain.
 *  - getting-started.Editor: an "Editor UI" sentence would unlink, but the
 *    reviewed page override (getting-started pins the Editor repo) wins -
 *    the precedence is exercised by the unit tests.
 *  - installation.shell: the canonical example shape from the brief (shell
 *    profile contexts plain, extension-host/VS Code contexts pinned). Dormant
 *    today: "shell" is not an index term (pure-lowercase noise never links),
 *    so no occurrence ever reaches these rules.
 */

export interface LinkIndexContextRule {
	when: string;

	then: string | false;
}

export const LinkIndexContextRules: Record<
	string,
	Record<string, LinkIndexContextRule[]>
> = {
	troubleshooting: {
		Terminal: [{ when: "Terminal not opening|terminal pane", then: false }],
	},

	"getting-started": {
		Editor: [{ when: "Editor UI|editor window", then: false }],
	},

	installation: {
		shell: [
			{
				when: "shell profile|\\.zshrc|\\.bashrc|\\.zprofile",
				then: false,
			},

			{
				when: "extension host|VS Code",

				then: "https://github.com/CodeEditorLand/Mountain/tree/Current/Source/Environment/Terminal/ShellIntegration.rs",
			},
		],
	},
};

/** One compiled rule: the `when` regex precompiled once at module load. */
interface CompiledContextRule {
	regex: RegExp;

	then: string | false;
}

/** The module-load cache: page -> term -> compiled rules, built ONCE. */
const Cache: Record<string, Record<string, CompiledContextRule[]>> = {};

for (const Page of Object.keys(LinkIndexContextRules)) {
	const Terms = LinkIndexContextRules[Page];

	Cache[Page] = {};

	for (const Term of Object.keys(Terms)) {
		Cache[Page][Term] = Terms[Term].map((Rule) => ({
			regex: new RegExp(Rule.when, "i"),

			then: Rule.then,
		}));
	}
}

/**
 * The sentence containing [Start, End) in a text-node value: the segment of
 * the value (split on /[.!?]\s+/ and newlines) that contains the match. When
 * the node value is a fragment - no sentence boundary inside the value at
 * all - +/-80 chars around the match (clamped) is used instead.
 */
export const SentenceWindowOf = (
	Value: string,

	Start: number,

	End: number,
): string => {
	const Split = Value.split(/([.!?]\s+|\n)/);

	let Cursor = 0;

	for (let I = 0; I < Split.length; I += 2) {
		const Segment = Split[I];

		const SegStart = Cursor;

		const SegEnd = Cursor + Segment.length;

		const Delimiter = Split[I + 1] ?? "";

		if (Start >= SegStart && Start < SegEnd) {
			if (Split.length === 1) {
				// fragment node: no boundary inside the value
				return Value.slice(
					Math.max(0, Start - 80),

					Math.min(Value.length, End + 80),
				);
			}

			return Segment;
		}

		Cursor = SegEnd + Delimiter.length;
	}

	return Value.slice(
		Math.max(0, Start - 80),

		Math.min(Value.length, End + 80),
	);
};

/**
 * Resolve a text-path match through the context rules: the first compiled
 * rule whose `when` matches the enclosing sentence wins. Returns undefined
 * when the page/term has no rules or none match; false = plain text, URL =
 * pinned. Consults the precompiled cache only - never recompiles.
 */
export const ContextRuleOf = (
	PageKey: string | undefined,

	Term: string,

	Value: string,

	Start: number,

	End: number,
): string | false | undefined => {
	if (!PageKey) return undefined;

	const Rules = Cache[PageKey]?.[Term];

	if (!Rules || Rules.length === 0) return undefined;

	const Sentence = SentenceWindowOf(Value, Start, End);

	for (const Rule of Rules) {
		if (Rule.regex.test(Sentence)) return Rule.then;
	}

	return undefined;
};
