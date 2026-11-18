// @vitest-environment node
/**
 * The features band - recovered from `8b58843c5^:Source/Test/Component/DynamicFeatures.test.tsx`
 * and re-pointed at the band that renders it today.
 *
 * The recovered test rendered `DynamicFeatures`, a `.tsx` island that was
 * deleted with the record-shaped homepage it belonged to. The band's subject
 * survived that deletion and lives on as `Home/FeatureBand.astro`: six element
 * records on a card each, the one architecture proof below them, and the
 * specimen observation that closes the band. So the file is the same file with
 * the same claims, pointed at the component that now makes them - and every
 * assertion that encoded the deleted shape is recorded in the conflict register
 * at the bottom instead of being weakened into silence.
 *
 * Why the container and not `@testing-library/react`: the band is an `.astro`
 * component, and an Astro component only renders in the server build. It is
 * rendered through `astro/container` under the `node` environment (the docblock
 * above) and parsed with `happy-dom`, the DOM this repository already depends on
 * that runs outside jsdom. `@astrojs/react`'s server renderer is registered
 * because the band's seals (`FieldRecordSeal`) are React components.
 */
import Renderer from "@astrojs/react/server.js";

import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { Window } from "happy-dom";

import type { Element as ParsedElement } from "happy-dom";

import { beforeAll, describe, expect, it } from "vitest";

import FeatureBand from "../../Component/Home/FeatureBand.astro";

/** The band's markup, rendered once: it is static and has no props. */
let Html = "";

/** The same markup as a queryable document. */
let Page: Window["document"];

beforeAll(async () => {
	const Container = await AstroContainer.create();

	Container.addServerRenderer({ renderer: Renderer, name: "@astrojs/react" });

	Html = await Container.renderToString(FeatureBand);

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

/** The band's cards, in print order. */
const Cards = (): ParsedElement[] => All("jelly-card.home-feature");

/** One node's text, whitespace collapsed, for a whole-copy assertion. */
const Text = (Node: ParsedElement | null): string =>
	(Node?.textContent ?? "").replace(/\s+/g, " ").trim();

describe("FeatureBand", () => {
	it("prints one record per element, marked by the element it names", () => {
		// The marker is the element's own record id. The deleted band numbered
		// its six claims by position (`# 01`); the record layer names the
		// element instead, so the marker is the identity both shapes can carry -
		// and the stronger one, because it survives a reorder.
		expect(Cards()).toHaveLength(6);

		expect(
			Cards().map((Card) => Text(One(".home-record__index", Card))),
		).toEqual([
			"# MOUNTAIN_01",

			"# COCOON_01",

			"# WIND_01",

			"# SKY_01",

			"# AIR_01",

			"# ECHO_01",
		]);
	});

	it("prints each record's own name, route and facts whole", () => {
		const Mountain = Cards()[0];

		// The name is the link out to the element's repository, printed as a
		// label - `MOUNTAIN:`, the colon the baseline printed.
		const Name = One(".home-record__link", Mountain);

		expect(Text(Name)).toBe("MOUNTAIN:");

		expect(Name.getAttribute("href")).toBe(
			"https://github.com/CodeEditorLand/Mountain",
		);

		expect(Text(One(".home-record__service", Mountain))).toBe(
			"RUST SERVICES",
		);

		// The four-row ledger, every key printed with its colon.
		expect(
			All(".home-record__key", Mountain).map((Key) => Text(Key)),
		).toEqual(["ROLE:", "BOUNDARY:", "LOAD:", "PHASE:"]);

		expect(
			All(".home-record__value", Mountain).map((Value) => Text(Value)),
		).toEqual(["FOUNDATION", "SYSTEM", "HEAVY", "CORE"]);
	});

	it("names the band by its own heading", () => {
		const Heading = One("#featuresHeading");

		// The band's one heading is an `h2` - the hero record owns the `h1` -
		// and the section points at it, so the band is a labelled region.
		expect(Heading.tagName).toBe("H2");

		expect(Text(Heading)).toBe("VS Code. Without Electron.");

		expect(One("#features").getAttribute("aria-labelledby")).toBe(
			"featuresHeading",
		);
	});

	it("prints the band's standfirst under its heading", () => {
		expect(Text(One(".home-band__standfirst"))).toBe(
			"Native speed. VS Code compatibility. No Chromium, no compromises.",
		);
	});

	it("puts every record on a card filled with its element's own tint", () => {
		// The fill is resolved from the record's own seal (`JellyCardFill`), not
		// from a position in the list: a reordered card keeps its element's
		// colour. The deleted band paired claims to fills positionally.
		const Fills = new Map(
			Cards().map((Card) => [
				Text(One(".home-record__index", Card)),

				Card.getAttribute("style"),
			]),
		);

		expect(Fills.get("# MOUNTAIN_01")).toContain(
			"--jelly-fill:var(--ExtensionRustMute)",
		);

		expect(Fills.get("# COCOON_01")).toContain(
			"--jelly-fill:var(--SpinegRPCMute)",
		);

		expect(Fills.get("# SKY_01")).toContain(
			"--jelly-fill:var(--SpineIPCMute)",
		);

		expect(Fills.get("# WIND_01")).toContain(
			"--jelly-fill:var(--OSMacOSMute)",
		);
	});

	it("does not print the runtime rail a second time", () => {
		// The four-step rail moved to the hero, where it is the proof of the
		// claim directly above it (`DynamicHeroSection`'s `hero-band__trace`).
		// Two copies of one rail on one page is a habit, not a proof, so the
		// band asserts the move rather than losing the claim: the steps are
		// still printed, once, one band up.
		expect(All(".record-stage")).toHaveLength(0);

		expect(Page.querySelector(".home-feature__rail")).toBeNull();
	});

	it("prints the specimen observation the record carries", () => {
		// `SPECIES:` / `TEMP:` / `WIND:` - the second metadata block the field
		// record prints beside its facts, and never inside the hero card.
		const Specimen = One(".home-feature__specimen");

		expect(Text(One(".home-feature__specimen-label", Specimen))).toBe(
			"SPECIMEN",
		);

		expect(
			All(".record-ledger__key", Specimen).map((Key) => Text(Key)),
		).toEqual(["SPECIES:", "TEMP:", "WIND:"]);

		expect(
			All(".record-ledger__value", Specimen).map((Value) => Text(Value)),
		).toEqual(["NOCTUA PRONUBA", "16.2 C", "01.8 KM/H"]);
	});
});

/**
 * The conflict register.
 *
 * Each entry below is an assertion the recovered test made that encodes the
 * shape the programme deleted - the six-claim record band with a positional
 * marker, a filing budget of three, and an `# OBSERVATION_01 /PROOF` kicker. The
 * band that renders today is the baseline's six element records, so the
 * assertion cannot be kept as written and must not be weakened to fit: it is
 * recorded here, with the reason, as a `todo`.
 */
describe("FeatureBand - conflicts with the deleted shape", () => {
	it.todo(
		"marks each claim by its position (`# 01`) - today's marker is the element's own `# MOUNTAIN_01`",
	);

	it.todo(
		"prints the claim's own title and paragraph - today the record prints the element's name, route and four facts",
	);

	it.todo(
		"opens on `# OBSERVATION_01 /PROOF` - today's band opens on `Features` under `VS Code. Without Electron.`",
	);

	it.todo(
		"prints the hero's explanation when the content has no subtitle - today the standfirst is the band's own content key",
	);

	it.todo(
		"files the fourth claim behind a `ClaimLimit` of three - today the band prints six records and has no filing budget",
	);
});
