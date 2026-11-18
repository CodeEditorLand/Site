// @vitest-environment node
/**
 * The roadmap band - recovered from `8b58843c5^:Source/Test/Component/DynamicPricing.test.tsx`
 * and re-pointed at the band that renders it today.
 *
 * The recovered test rendered `DynamicPricing`, the `.tsx` island that printed
 * one release manifest with a state per tier. That island was deleted with the
 * record-shaped homepage; the band's subject survived as `Home/RoadmapBand.astro`
 * - the same one offer in two states, as two release records, which is the
 * composition the baseline rendered. The test follows the subject: the same
 * claims about the two states, the standing they declare and the absence of a
 * price, asserted against the component that prints them now.
 *
 * Everything the deleted island asserted about its own shape - one manifest
 * surface, a `# CONDITIONS_01 /RELEASE STATE` kicker, a positional marker for a
 * capability with no label, a subtitle that prints as paragraphs - is in the
 * conflict register at the bottom, unweakened and unrun, with the reason.
 *
 * The band is an `.astro` component, so it is rendered through `astro/container`
 * under the `node` environment and parsed with `happy-dom`; see
 * `DynamicFeatures.test.tsx` for the same harness on the features band.
 */
import Renderer from "@astrojs/react/server.js";

import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { Window } from "happy-dom";

import type { Element as ParsedElement } from "happy-dom";

import { beforeAll, describe, expect, it } from "vitest";

import RoadmapBand from "../../Component/Home/RoadmapBand.astro";

/** The band's markup, rendered once: it is static and has no props. */
let Html = "";

/** The same markup as a queryable document. */
let Page: Window["document"];

beforeAll(async () => {
	const Container = await AstroContainer.create();

	Container.addServerRenderer({ renderer: Renderer, name: "@astrojs/react" });

	Html = await Container.renderToString(RoadmapBand);

	const Parsed = new Window({ url: "https://editor.land/" });

	Parsed.document.body.innerHTML = Html;

	Page = Parsed.document;
});

/** The first element matching a selector. Throws rather than returning null. */
const One = (
	Selector: string,

	Root: ParsedElement | Window["document"] | undefined = Page,
): ParsedElement => {
	const Found = Root?.querySelector(Selector) ?? null;

	if (Found === null) throw new Error(`No element matches \`${Selector}\`.`);

	return Found;
};

/** Every element matching a selector, in print order. */
const All = (
	Selector: string,

	Root: ParsedElement | Window["document"] | undefined = Page,
): ParsedElement[] => Array.from(Root?.querySelectorAll(Selector) ?? []);

/** The band's release records, in print order. */
const Cards = (): ParsedElement[] => All(".home-release");

/** One node's text, whitespace collapsed, for a whole-copy assertion. */
const Text = (Node: ParsedElement | null): string =>
	(Node?.textContent ?? "").replace(/\s+/g, " ").trim();

/** The stamp lines a release record declares, in print order. */
const StampOf = (Card: ParsedElement): string[] =>
	All(".home-release__stamp-line", Card).map((Line) => Text(Line));

describe("RoadmapBand", () => {
	it("prints one release record per state of the one offer", () => {
		// Two states, two records, and the marker names the phase rather than
		// the position.
		expect(Cards()).toHaveLength(2);

		expect(
			Cards().map((Card) => Text(One(".home-release__index", Card))),
		).toEqual(["# RELEASE_01", "# RELEASE_02"]);

		// The state's name is the record's own heading.
		expect(
			Cards().map((Card) => Text(One(".home-release__title", Card))),
		).toEqual(["ACTIVE NOW", "V1.0"]);
	});

	it("prints the two states as one manifest plate, not two cards", () => {
		// One surface, one gutter, two columns: the release state is a
		// manifest (`DesignSystem-Grammar.md` §8), and the page's second spread
		// rhymes with its first - a state beside its successor.
		expect(All("jelly-card.home-manifest")).toHaveLength(1);

		// And nothing else is a Jelly card in this band: a card inside a card
		// is the one thing `DESIGN.md` §1.3 forbids.
		expect(All("jelly-card")).toHaveLength(1);

		expect(All(".home-manifest__gutter")).toHaveLength(1);

		// One ink action in the artifact, and only one: the state a reader can
		// act on today. The state a reader can watch carries its destination as
		// the site's route line.
		expect(All("jelly-button")).toHaveLength(1);

		expect(Text(One(".home-release__destination"))).toBe("/TRACK PROGRESS");

		// Neither action may render in Jelly's default blue: the ink is the
		// site's, and a bright accent that is in neither the palette nor the
		// accent is an identity break.
		expect(Html).not.toMatch(
			/jelly-color-background-accent:(?!var\(--Foreground\))/,
		);
	});

	it("names the band by its own heading, and states the conditions under it", () => {
		const Heading = One("#pricingHeading");

		expect(Heading.tagName).toBe("H2");

		expect(Text(Heading)).toBe(
			"The Architecture Is Built. Here Is What Comes Next.",
		);

		expect(One("#pricing").getAttribute("aria-labelledby")).toBe(
			"pricingHeading",
		);

		// The band's stamp: who funds it and the three labels the two states
		// are read through.
		const Stamp = Text(One(".home-band__stamp"));

		expect(Stamp).toContain("FUNDING: NLNET / NGI0 COMMONS FUND");

		expect(Stamp).toContain(
			"PHASE: ACTIVE SOURCE / INTEGRATION / RELEASE PREPARATION",
		);
	});

	it("states each release's standing as labelled facts", () => {
		const [Active, Next] = Cards();

		const ActiveStamp = StampOf(Active);

		expect(ActiveStamp).toContain("STATUS: ACTIVE");

		expect(ActiveStamp).toContain("TARGET: NATIVE DESKTOP PATH");

		expect(ActiveStamp).toContain(
			"SIGNAL: NO CHROMIUM / NO ELECTRON / CC0",
		);

		// And the phase the state belongs to, in the containment stamp.
		expect(ActiveStamp).toContain("〈 ACTIVE SOURCE 〉");

		const NextStamp = StampOf(Next);

		expect(NextStamp).toContain("STATUS: LOADING");

		expect(NextStamp).toContain("TARGET: V1.0");

		expect(NextStamp).toContain(
			"SIGNAL: SIGNED INSTALLERS / VERIFIED DOWNLOADS",
		);
	});

	it("prints each element row as name, role and detail, with the name as a link", () => {
		const Rows = All(".home-release__item", Cards()[0]);

		expect(Rows).toHaveLength(6);

		const Mountain = Rows[0];

		const Key = One(".home-release__element", Mountain);

		expect(Text(Key)).toBe("Mountain");

		expect(Key.getAttribute("href")).toBe("/Doc/mountain");

		expect(Text(One(".home-release__role", Mountain))).toBe(
			"Native Backend",
		);

		// The detail line keeps the sentence and lifts the technology into a
		// badge of its own.
		const Line = Text(One(".home-release__line", Mountain));

		expect(Line).toContain("Replaces");

		expect(Line).toContain("Electron");

		expect(Line).toContain("main process, no bundled Chromium");
	});

	it("prints each capability under the label the manifest gave it", () => {
		const Manifest = All(".home-release__manifest-row", Cards()[0]).map(
			(Row) => Text(Row),
		);

		expect(Manifest).toHaveLength(6);

		expect(Manifest).toContain("EXTENSIONS: UNMODIFIED / COCOON");

		expect(Manifest).toContain("WEBVIEW: OS NATIVE / TAURI");

		expect(Manifest).toContain("LICENSE: CC0 / NO RESTRICTIONS");

		expect(Manifest).toContain("TARGETS: MACOS / WINDOWS / LINUX");
	});

	it("prints no price, no billing toggle and no popular badge", () => {
		// A price of nothing is not a price: the band prints what the two
		// states are, not what they cost.
		expect(Html).not.toMatch(/Most Popular/i);

		expect(Html).not.toMatch(/\/month/i);

		expect(Html).not.toMatch(/Monthly/i);

		expect(Html).not.toMatch(/\$\s?\d/);
	});
});

/**
 * The conflict register.
 *
 * The recovered test asserted the shape of the deleted island - one manifest
 * surface with two states inside it, a `# CONDITIONS_01 /RELEASE STATE` kicker,
 * the hero's three missing-capability qualifiers, a content `Status` that
 * overrides the manifest's, positional markers for unlabelled capabilities, and
 * a subtitle that prints as paragraphs. None of that is the band's shape today,
 * and none of it can be asserted without inventing markup. Each is recorded
 * here as a `todo`, with the reason, so the claim is not lost and the count does
 * not fall.
 */
describe("RoadmapBand - conflicts with the deleted shape", () => {
	it.todo(
		"prints one manifest surface carrying both states - today each state is its own record, on its own card",
	);

	it.todo(
		"opens on `# CONDITIONS_01 /RELEASE STATE` - today's band opens on `Roadmap` and states `PHASE:` in its stamp",
	);

	it.todo(
		"prints the hero's `PRE-RELEASE` / `INSTALLERS PENDING` / `EXTENSION COVERAGE IN PROGRESS` qualifiers - today's `SIGNAL:` rows carry the conditions per state",
	);

	it.todo(
		"keeps a content `Status` word over the manifest's - today the release data carries the word itself (`STATUS: LOADING`)",
	);

	it.todo(
		"marks a capability the manifest has no label for by its position (`# 01`) - today every manifest row prints its own `KEY:`",
	);

	it.todo(
		"prints a subtitle as one paragraph per block - the band prints a stamp instead of a standfirst, one or the other by design",
	);
});
