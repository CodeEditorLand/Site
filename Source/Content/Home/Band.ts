/**
 * The five bands' openings, in the order the page prints them.
 *
 * The order is the baseline's - hero, features, roadmap, architecture,
 * download - and it is data rather than markup so the page cannot drift from it
 * by editing one section and not the others.
 *
 * Two headings are written as literals instead of being read from the locale
 * files: the features heading is printed in the baseline's own upper case, and
 * the roadmap's stamp is a two-line mono block whose terms are printed in three
 * different inks. Neither is a translation of a sentence - one is a fixed
 * display string and the other is a record stamp - so both live here.
 */
import type { BandHead, HomeTranslate, StampLine } from "./Type.js";

/** The roadmap's two-line stamp: the funder, then the phase in three inks. */
const RoadmapStamp: readonly StampLine[] = [
	{ Text: "FUNDING: NLNET / NGI0 COMMONS FUND" },

	{
		Label: "PHASE",

		Terms: [
			{ Text: "ACTIVE SOURCE", Ink: "var(--SpinegRPCFore)" },

			{ Text: "INTEGRATION", Ink: "var(--SpineIPCFore)" },

			{ Text: "RELEASE PREPARATION", Ink: "var(--SpineTCPFore)" },
		],
	},
];

/** The four bands below the hero, in the baseline's order. */
export const HomeBands = (T: HomeTranslate): readonly BandHead[] => [
	{
		ID: "features",

		Kicker: "Features",

		Heading: T("home:features.title", {
			defaultValue: "VS CODE. WITHOUT ELECTRON.",
		}),

		Standfirst: T("home:features.subtitle", {
			defaultValue:
				"Native speed. VS Code compatibility. No Chromium, no compromises.",
		}),
	},

	{
		ID: "pricing",

		Kicker: "Roadmap",

		Heading: T("home:roadmap.title", {
			defaultValue: "The Architecture Is Built. Here Is What Comes Next.",
		}),

		Standfirst:
			"Two releases: the active source today, and v1.0 when signed installers ship. Each card prints the six elements it carries and the six manifest rows it declares.",

		Stamp: RoadmapStamp,
	},

	{
		ID: "testimonials",

		Kicker: "Architecture",

		Heading: T("home:architecture.title", {
			defaultValue: "Under the Hood",
		}),

		Standfirst: T("home:architecture.subtitle", {
			defaultValue:
				"Each element replaces one piece of the Electron stack. All inspectable in source.",
		}),
	},

	{
		ID: "method",

		Kicker: "Method",

		Heading: "How The Claim Is Checked",

		Standfirst:
			"Six stages build it, twelve facts describe what comes out, and three documented failures stop it before it opens. The source is public today; the release is not.",
	},

	{
		ID: "download",

		Kicker: "Download",

		Heading: T("download:title", { defaultValue: "Download Land" }),

		Standfirst: T("download:subtitle", {
			defaultValue:
				"Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.",
		}),
	},
];

/** The band a page section is named for, by id. */
export const BandOf = (Bands: readonly BandHead[], ID: string): BandHead => {
	const Found = Bands.find((Band) => Band.ID === ID);

	if (Found === undefined) {
		throw new Error(`home band not declared: ${ID}`);
	}

	return Found;
};
