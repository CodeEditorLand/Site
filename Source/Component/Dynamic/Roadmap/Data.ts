/**
 * Data - every row, label and derivation the roadmap band prints.
 *
 * The band is one offer in two states, not two editions to choose between, so
 * its body is a ledger per state rather than a matrix across editions: a matrix
 * would imply a choice the reader does not have, and its columns would have to
 * share a row axis the content does not give them (the two phases speak to
 * different capabilities). See the card's report for the verdict.
 *
 * Three tables live here:
 *
 * - `Manifest` - the phase vocabulary per tier. It is the same vocabulary the
 *   page already used: the roadmap subtitle names the three milestone labels
 *   ("active source, integration work in progress, or release preparation") and
 *   each tier takes one of them, plus the target and the signal it points at.
 * - `CapabilityLabels` - the label each of a tier's six capability sentences
 *   already carries in the page's manifest rows (`"EXTENSIONS: UNMODIFIED /
 *   COCOON"`). The rows are paired with `Tier.Feature` by position, which is
 *   how the manifest was built: it converts each feature sentence into one
 *   labelled row, in the same order, without changing the fact.
 * - `ElementRowOf` - one `Name\nRole\nDetail` string as a ledger row. The three
 *   lines are the three fields of a row, so nothing is dropped and nothing is
 *   reworded.
 */
import { DocPathOf } from "../Architecture/Data.js";

import type Tier from "../Interface/Tier/Pricing.js";

import type { Phase, PhaseRow } from "./Type.js";

/** The band's marker. Structure, not copy: it names the section. */
export const Kicker = "/ROADMAP";

/**
 * The phase vocabulary, keyed by the tier identifier the content uses.
 *
 * `Phase`, `Target` and `Signal` are the labels the milestone legend names;
 * `Status` is the state word the manifest carries for a tier whose content does
 * not state one itself (the `V1.0` tier states `WIP`, and the content's own word
 * wins - see `FactsOf`).
 */
const Manifest: Record<
	string,
	{
		readonly Phase: string;
		readonly Status: string;
		readonly Target: string;
		readonly Signal: string;
	}
> = {
	free: {
		Phase: "ACTIVE SOURCE",
		Status: "ACTIVE",
		Target: "NATIVE DESKTOP PATH",
		Signal: "NO CHROMIUM / NO ELECTRON / CC0",
	},
	progress: {
		Phase: "INTEGRATION",
		Status: "LOADING",
		Target: "V1.0",
		Signal: "SIGNED INSTALLERS / VERIFIED DOWNLOADS",
	},
};

/**
 * The label each capability sentence carries, per tier, in the content's order.
 *
 * The labels are the page's own: they were the left half of the manifest rows
 * this band used to print. Pairing them with `Tier.Feature` keeps both halves -
 * the label and the full sentence - instead of printing the condensed right
 * half and losing the sentence it was condensed from.
 */
const CapabilityLabels: Record<string, readonly string[]> = {
	free: [
		"EXTENSIONS",
		"WEBVIEW",
		"FIBERS",
		"TELEMETRY",
		"LICENSE",
		"TARGETS",
	],
	progress: [
		"MARKETPLACE",
		"COCOON",
		"VINE",
		"INSTALLERS",
		"ECHO",
		"DISTRIBUTION",
	],
};

/**
 * One `Name\nRole\nDetail` element string as a row.
 *
 * A row with fewer than three lines is legal - the parts that exist are
 * printed and the rest is simply absent, which is why a two-line string does
 * not throw. The key links to the element's documentation page, because the
 * `/Doc/<element>` routes are real pages.
 */
const ElementRowOf = (Element: string): PhaseRow => {
	const [Name = "", Role = "", Detail] = Element.split("\n");

	return {
		key: Name,
		value: Role,
		...(Detail ? { note: Detail } : {}),
		href: DocPathOf(Name),
	};
};

/**
 * The phase's standing, as labelled facts.
 *
 * `STATUS` is the content's own word when the tier states one (`V1.0` states
 * `WIP`) and the manifest's state word otherwise, so the qualifier a reader
 * sees is always the one the content asserts rather than a derivation
 * overwriting it.
 */
const FactsOf = (Identifier: string, Item: Tier): readonly string[] => {
	const Phase = Manifest[Identifier] ?? Manifest.free;

	const Status = Item.Status ?? Phase.Status;

	return [
		`PHASE: ${Phase.Phase}`,
		`STATUS: ${Status}`,
		`TARGET: ${Phase.Target}`,
		`SIGNAL: ${Phase.Signal}`,
	];
};

/**
 * The phases, in the order the content lists them.
 *
 * The marker is the tier's position, zero-padded the way the page already
 * padded it (`# RELEASE_01`). Everything else is the content's: the name, the
 * paragraph, the six element strings, the six capability sentences and the
 * action. The `Price`, `Popular` and `Highlighted` fields are deliberately not
 * read - see the band's own note.
 */
export const PhasesOf = (Tiers: readonly Tier[]): readonly Phase[] =>
	Tiers.map((Item, Index) => {
		const Labels = CapabilityLabels[Item.Identifier] ?? [];

		const ElementRows = (Item.Element ?? []).map(ElementRowOf);

		const CapabilityRows = Item.Feature.map((Feature, Position) => ({
			key:
				Labels[Position] ??
				`# ${String(Position + 1).padStart(2, "0")}`,
			value: Feature,
		}));

		return {
			marker: `# RELEASE_${String(Index + 1).padStart(2, "0")}`,
			name: Item.Name,
			...(Item.Description ? { body: Item.Description } : {}),
			facts: FactsOf(Item.Identifier, Item),
			rows: [...ElementRows, ...CapabilityRows],
			...(Item.CTA
				? { cta: { label: Item.CTA.Text, href: Item.CTA.Href ?? "" } }
				: {}),
		};
	});

/**
 * The band's standfirst, as paragraphs.
 *
 * The content writes it as two sentences separated by a blank line: what funds
 * the work, and what the milestone labels mean. The blank line is a paragraph
 * break, so the band prints two paragraphs instead of one run-on line - and the
 * legend survives, which is the only place the three milestone words appear
 * together.
 */
export const StandfirstOf = (Subtitle: string | undefined): readonly string[] =>
	(Subtitle ?? "")
		.split(/\n{2,}/)
		.map((Paragraph) => Paragraph.trim())
		.filter((Paragraph) => Paragraph.length > 0);
