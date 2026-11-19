// Source/Content/Home/Band.ts
/**
* The page's interval sequence, in reading order, by band id.
*
* The homepage is the page that taught this document its rhythm, so its sequence
* is the reference the four-rung ladder was drawn from: wide, wide, tight, wide,
* tight - which on a ladder with two rungs per register is turn, break, rest,
* turn, beat. It lives here with the bands' openings rather than in the five
* components, for the reason the openings live here: a page's sequence is one
* fact, and five literals in five files is five places for it to drift.
*
* `turn` is the widest interval and the one a chapter prints its rule for; on
* this page the first band's rule is cancelled (the hero already ends the page)
* and the method band's is drawn, which is why the wall's band - the longest in
* the document - is a `rest`: air is what a 4,300px band does not need.
*/
var Sequence = {
	features: "turn",
	pricing: "break",
	testimonials: "rest",
	method: "turn",
	download: "beat"
};
/** The roadmap's two-line stamp: the funder, then the phase in three inks. */
var RoadmapStamp = [{ Text: "FUNDING: NLNET / NGI0 COMMONS FUND" }, {
	Label: "PHASE",
	Terms: [
		{
			Text: "ACTIVE SOURCE",
			Ink: "var(--SpinegRPCFore)"
		},
		{
			Text: "INTEGRATION",
			Ink: "var(--SpineIPCFore)"
		},
		{
			Text: "RELEASE PREPARATION",
			Ink: "var(--SpineTCPFore)"
		}
	]
}];
/** The five bands below the hero, in the composition's order. */
var HomeBands = (T) => [
	{
		ID: "features",
		Kicker: "Features",
		Heading: T("home:features.title", { defaultValue: "VS CODE. WITHOUT ELECTRON." }),
		Standfirst: T("home:features.subtitle", { defaultValue: "Native speed. VS Code compatibility. No Chromium, no compromises." })
	},
	{
		ID: "pricing",
		Kicker: "Roadmap",
		Heading: T("home:roadmap.title", { defaultValue: "The Architecture Is Built. What Comes Next." }),
		Standfirst: "Two releases: active source today; v1.0 when signed installers ship. Each card prints its six elements and the six manifest rows it declares.",
		Stamp: RoadmapStamp
	},
	{
		ID: "testimonials",
		Kicker: "Architecture",
		Heading: T("home:architecture.title", { defaultValue: "Under the Hood" }),
		Standfirst: T("home:architecture.subtitle", { defaultValue: "Each element replaces one piece of the Electron stack. All inspectable in source." })
	},
	{
		ID: "method",
		Kicker: "Method",
		Heading: "How The Claim Is Checked",
		Standfirst: "Six stages build it, twelve facts describe what comes out, and three documented failures stop it before it opens. The source is public today; the release is not."
	},
	{
		ID: "download",
		Kicker: "Download",
		Heading: T("download:title", { defaultValue: "Download Land" }),
		Standfirst: T("download:subtitle", { defaultValue: "Source builds are active today. Public installers, signing and verification artifacts are still in preparation; until they ship, the build from source is the only install path, and the method band above names the six stages that build it." })
	}
];
/** The band a page section is named for, by id. */
var BandOf = (Bands, ID) => {
	const Found = Bands.find((Band) => Band.ID === ID);
	if (Found === void 0) throw new Error(`home band not declared: ${ID}`);
	return Found;
};
export { HomeBands as n, Sequence as r, BandOf as t };
