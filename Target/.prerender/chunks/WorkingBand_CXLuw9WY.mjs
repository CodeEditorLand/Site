import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment$1, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { A as Mountain, C as Worker, D as SideCar, E as Sky, F as Common, I as Cocoon, L as Air, M as Maintain, N as Grove, O as Rest, P as Echo, T as Vine, Yt as cn, Zt as createAstro, bt as Tone, ct as $$RecordLedger, ft as RegisterOf, j as Mist, k as Output, lt as $$Register, rt as GetI18n, w as Wind, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { t as CORNER_GEOMETRY } from "./Data_MnhqTNdc.mjs";
import { n as SealNeutral, t as FieldRecordSeal } from "./FieldRecordSeal_BQ3rw_aG.mjs";
import { t as FieldRecordStatus } from "./FieldRecordStatus_Ch02EVPq.mjs";
import { i as ElementFill, n as StampText, t as RouteText } from "./SemanticLedger_yaZHo2du.mjs";
import { t as Home_default } from "./Home_CMDi8mxV.mjs";
import { t as $$RecordTrace } from "./RecordTrace_C2mmJiIp.mjs";
import { n as WorkingOf } from "./Working_g109gLqv.mjs";
import { n as HomeBands, r as Sequence, t as BandOf } from "./Band__vm9e46K.mjs";
import { n as PlatformCards, t as ReleaseCards } from "./Roadmap_LppjVGl3.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { Apple, Box, Cpu, Globe, Layers3, Monitor, Network, Puzzle, Server, Terminal, Zap } from "lucide-react";
// Source/Component/Dynamic/Interface/Card/Jelly.ts
/**
* THE UNMAPPED ELEMENT - the ink surface's adverse state.
*
* A hue chosen by hashing the element's or the badge's name (FNV-1a) is an
* invented colour: no reader can decode it, two names that hash alike get one
* hue, and it collides with the spine palette where a hue MEANS a protocol. It
* is the exact defect this palette exists to prevent: "when a shade drifts, it
* looks approximate". A card whose element the system does not know takes the
* neutral insert (`--Card`, the white information box), and a badge whose
* domain the rules do not match takes `--Mute` (the creme recess). Both are
* honest: the surface says "this is a record, and this badge claims no domain"
* instead of claiming one at random.
*
* A caller that needs a stable ORDER rather than a stable colour sorts by name,
* which is legible, and the two predicates below are how a caller prints the
* absence instead of painting it.
*/
var JellyCardFill = (Id) => ElementFill(Id) ?? "var(--Card)";
/** The strip that files the properties the layer does not claim. */
var FiledLabel = "ALSO FILED";
/** The one architecture proof the layer is allowed: the runtime path. */
var RailLabel = "RUNTIME PATH";
/**
* The six elements' tints, in the baseline's positional order.
*
* `DELETED.md` #12 records the call the deleted band made for its six claim
* cards: `--jelly-fill: JellyCardFill(ElementOrder[Index % 6])`, "so each claim
* carried the semantic tint of its element (Mountain, Cocoon, Wind, Sky, Air,
* Echo, in that positional order)". The order is recovered here rather than
* re-invented: a claim is not an element, but the six claims are the six
* elements' arguments in the same positional sequence, and the tint is what makes
* a grid of records read as six filed claims rather than six white boxes.
*
* Position is the identity the content gives a property (`Id` is a translation
* key, not a name), so a tint resolved from the id would be a hash and two of the
* three claims can land on one colour. Resolving from position cannot: the six
* tints are distinct by construction, and a reordered set keeps its order's
* colours rather than shuffling them.
*/
var ElementOrder = [
	"Mountain",
	"Cocoon",
	"Wind",
	"Sky",
	"Air",
	"Echo"
];
/** The specimen observation the record has always carried. */
var ObservationLabel = "SPECIMEN";
/**
* Where a property is argued at length when it is not one of the three claims.
*
* Every destination is an existing documentation page that makes exactly this
* argument: `why-effect-ts.md` for fibers, `why-tauri.md` for the one source
* tree over the OS WebView, `air.md` for the persistent background daemon,
* `why-cc0.md` for the licence, `why-rust.md` for the native services and
* `cocoon.md` for the unmodified-extension host. A property with no entry has
* no page to point at, so the strip prints it without a link rather than
* inventing a route.
*
* The keys are the ids the content actually carries (`home:features.item.*`).
* The map this replaces was keyed on `architecture` / `cross-platform` /
* `tooling` / `opensource` - four ids no locale file has - so `DocOf[Item.Id]`
* never matched, every record rendered without an `href`, and the arrow the
* motion layer moves for a linked record name was never printed. Measured
* before the fix: 0 of 6 entries carried a destination.
*/
var DocOf = {
	designTokens: "/Doc/why-rust",
	componentLibrary: "/Doc/cocoon",
	documentation: "/Doc/why-effect-ts",
	versionControl: "/Doc/why-tauri",
	cicdIntegration: "/Doc/air",
	collaboration: "/Doc/why-cc0"
};
/**
* The six properties' ids, in the content's own order.
*
* Structure, not copy: an id is a key into `home:features.item.*`, never a word
* a reader sees, and the order is the order the content declares them in. It
* lives here rather than in the component because the component renders the set
* it is handed, and a set the component authored would be a second content
* table.
*/
var PropertyIds = [
	"designTokens",
	"componentLibrary",
	"documentation",
	"versionControl",
	"cicdIntegration",
	"collaboration"
];
/**
* The English copy, verbatim from `Locale/En/Home.json`.
*
* It is the `defaultValue` of every key below, which is the pattern the tree
* states in `DESIGN-COMPLETE.md` §4.5: English lives in the `defaultValue` and
* in the locale file, and a key is never deleted. It is duplicated rather than
* read because a module that imported the JSON would be a module that ships the
* whole locale file to resolve six sentences.
*/
var PropertyCopy = {
	designTokens: {
		title: "Native services where they count.",
		description: "Heavy editor work runs natively, not trapped in a web view. Window management, file I/O, and terminals are native Rust services - no serialized JSON IPC bridge."
	},
	componentLibrary: {
		title: "Unmodified extensions, no fork path.",
		description: "Your VS Code extensions run unmodified - no forks, no rewrites. A compatibility host implements the VS Code extension API surface."
	},
	documentation: {
		title: "Fibers, not Promises.",
		description: "Failures are typed, traceable, and cancellable - one supervised fiber never takes down the rest of the editor."
	},
	versionControl: {
		title: "One source tree, configured targets.",
		description: "Tauri uses the OS WebView on each platform - no bundled Chromium. One codebase compiles to native macOS, Windows, and Linux packages."
	},
	cicdIntegration: {
		title: "Background daemon, always running.",
		description: "Updates, indexing, signing, and health checks run in a persistent daemon that keeps working after the main window closes."
	},
	collaboration: {
		title: "CC0. No restrictions.",
		description: "Fork it, ship it, build commercial products on top of it. The entire codebase is CC0 public domain - no attribution required, no compliance headaches."
	}
};
/**
* The six properties as records, resolved from the copy.
*
* `EntriesOf` adapts a `FeatureItem[]` that some other module assembled; this
* one is the path the tree actually has, because the six properties are copy and
* nothing else - there is no `Content/Feature` table between the locale file and
* the grid. Both return the same shape, so the grid takes either.
*
* The marker is the property's place in the set, zero-padded the way the
* field-record grammar pads a marker. The claim and the paragraph are the
* content's own sentences - no truncation, no summary - so the band cannot lose
* the copy it prints.
*/
var ItemsOf = (T) => PropertyIds.map((Id, Index) => ({
	index: `# ${String(Index + 1).padStart(2, "0")}`,
	id: Id,
	name: T(`home:features.item.${Id}.title`, { defaultValue: PropertyCopy[Id]?.title ?? Id }),
	body: T(`home:features.item.${Id}.description`, { defaultValue: PropertyCopy[Id]?.description ?? "" }),
	...DocOf[Id] ? { href: DocOf[Id] } : {}
}));
/** What the grid prints when the copy resolved to nothing at all. */
var Empty = "No property is filed, so the grid prints nothing. The six are read from the home features copy, and a grid with no records is a locale file that lost six keys, not a page that failed to load.";
/** The three the layer claims, in the content's own order. */
var ClaimsOf = (Entries) => Entries.slice(0, 3);
/** The rest, which the strip files against the pages that argue them. */
var FiledOf = (Entries) => Entries.slice(3);
// Source/Component/Record/RecordFailure.astro
createAstro("https://editor.land");
var $$RecordFailure = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordFailure;
	const { failure } = Astro.props;
	const { index, name, symptom, cause, next, state, source, recovery, detail } = failure;
	const ToneOf = Tone(state) ?? "ink";
	const DeadEnd = next.trim() === "" || next.trim().toUpperCase() === "UNAVAILABLE";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["record-failure", DeadEnd && "record-failure--dead-end"], "class:list")}${addAttribute(ToneOf, "data-tone")} role="group"> <p class="record-failure__marker"> <span class="record-failure__hash" aria-hidden="true">
#
</span> ${index} <span class="record-failure__slash" aria-hidden="true">
/
</span> <span class="record-failure__name">${name}</span> </p> <p class="record-failure__status"> <span class="record-failure__status-key">STATUS:</span> <span class="record-failure__status-value"${addAttribute(ToneOf, "data-tone")}> ${state.toUpperCase()} </span> </p> <dl class="record-failure__fields"> <div class="record-failure__field"> <dt class="record-failure__key">SYMPTOM:</dt> <dd class="record-failure__value">${symptom}</dd> </div> <div class="record-failure__field"> <dt class="record-failure__key">CAUSE:</dt> <dd class="record-failure__value">${cause}</dd> </div> <div class="record-failure__field record-failure__field--next"> <dt class="record-failure__key">NEXT:</dt> <dd${addAttribute(["record-failure__value", DeadEnd && "record-failure__value--absent"], "class:list")}> ${DeadEnd ? "UNAVAILABLE" : next} ${recovery ? renderTemplate`<span class="record-failure__recovery"> <a${addAttribute(recovery.href, "href")}> <span aria-hidden="true">→</span> ${" "} ${recovery.label} </a> </span>` : null} </dd> </div> </dl> ${detail ? renderTemplate`<details class="record-failure__detail"> <summary class="record-failure__detail-summary"> <span class="record-failure__detail-key">DETAIL:</span>
WHAT THIS FAILURE REPRODUCES
${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <p class="record-failure__detail-body">${detail}</p> </details>` : null} <p class="record-failure__source"> <span class="record-failure__source-key">SOURCE:</span> ${source} </p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordFailure.astro", void 0);
// Source/Content/Home/Architecture.ts
/**
* The architecture band: all fifteen elements, one record card each.
*
* The band prints every element the product is made of - not a selection - and
* each card is the element's own `Content/Record/*.ts` entry plus the three
* things a record cannot carry: its glyph, its role chips and its description.
* The chips are the element's subtitle split at the em quad the locale files use
* as their only separator; the description is the element's own paragraph,
* printed whole.
*
* `Span` is the card's width in columns of the twelve-column masonry. The five
* widths (4, 5, 6, 7, 8) are the baseline's own distribution in its own order,
* which is what makes the band a staggered wall with ragged edges rather than an
* even grid of equal tiles.
*/
/**
* The element's glyph, from the element README header table. `◎` is the
* record set's neutral symbol and is used for the one element drawn as a symbol
* instead of an engraved figure - which is why `Seal` is a decision per element
* and not a fallback.
*/
var Glyphs = {
	air: "🪁",
	cocoon: "🦋",
	common: "🧑🏼‍🏭",
	echo: "📣",
	grove: "🌳",
	maintain: "💪🏼",
	mist: "🌫️",
	mountain: "⛰️",
	output: "⚫",
	rest: "⛱️",
	sidecar: "🚃",
	sky: "🌌",
	vine: "🌿",
	wind: "🍃",
	worker: "🍩"
};
/** The neutral symbol, for the element the record set draws as a symbol. */
var Symbol = "◎";
/** The elements drawn as a symbol rather than as an engraved seal. */
var Symbolic = /* @__PURE__ */ new Set(["Common"]);
/**
* The four records the wall prints at full depth.
*
* They are the four a reader meets in the order they meet them: the native host,
* the extension host, the service layer and the build. Each gets its three-step
* trace under its register; the other eleven print the register alone. That is
* the band's density rhythm - four annotated entries inside one tight wall of
* fifteen - and it is a decision per element, not a fallback.
*/
var Plates = /* @__PURE__ */ new Set([
	"cocoon",
	"maintain",
	"mountain",
	"wind"
]);
/**
* The register an element with no working prints.
*
* It is one row and it is the honest one: a record whose facts the tree does not
* carry says so, in the same grammar as every other register, rather than
* rendering an empty ledger. The empty state is composed, never a blank.
*/
var NoWorking = [{
	Label: "EVIDENCE",
	Value: "UNAVAILABLE",
	Note: "NO WORKING RECORDED FOR THIS ELEMENT"
}];
/**
* The element's English copy, as the `defaultValue` the band resolves against.
*
* Every string this band adds is `T(key, { defaultValue })`, and the rule is that
* the English copy lives in the `defaultValue` **and** in `Locale/En/Home.json`
* (`DESIGN.md` §4.4). An empty default would make the copy depend entirely on the
* resolver being live at the moment the band renders, and when it is not, the band
* would print fifteen records with no chips and an empty body instead of failing
* loudly. The locale module is the single source of truth and is imported here
* rather than re-typed, so the two can never drift.
*/
var English = (Key) => {
	return Home_default.architecture[Key] ?? {
		subtitle: "",
		description: ""
	};
};
/** One row of the table: the record, its width, and the order it prints in. */
var Order = [
	{
		Record: Air,
		Span: 5
	},
	{
		Record: Cocoon,
		Span: 7
	},
	{
		Record: Common,
		Span: 7
	},
	{
		Record: Echo,
		Span: 5
	},
	{
		Record: Grove,
		Span: 8
	},
	{
		Record: Maintain,
		Span: 4
	},
	{
		Record: Mist,
		Span: 6
	},
	{
		Record: Mountain,
		Span: 6
	},
	{
		Record: Output,
		Span: 8
	},
	{
		Record: Rest,
		Span: 4
	},
	{
		Record: SideCar,
		Span: 7
	},
	{
		Record: Sky,
		Span: 5
	},
	{
		Record: Vine,
		Span: 4
	},
	{
		Record: Wind,
		Span: 8
	},
	{
		Record: Worker,
		Span: 8
	}
];
/** `"/CHANNEL:AIR"` as its key and its value. */
var RouteOf$1 = (Record) => {
	const Line = Record.Route?.[0] ?? "";
	const Body = Line.startsWith("/") ? Line.slice(1) : Line;
	const Split = Body.indexOf(":");
	if (Split < 0) return {
		Key: Body,
		Value: ""
	};
	return {
		Key: Body.slice(0, Split),
		Value: Body.slice(Split + 1)
	};
};
/** The role chips: the subtitle split at the em quad the locale files use. */
var ChipsOf = (Subtitle) => Subtitle.split(" ").map((Chip) => Chip.trim()).filter((Chip) => Chip.length > 0);
/** One table row as the card's data. */
var CardOf$1 = (T) => ({ Record, Span }) => {
	const Key = Record.Id;
	const Working = WorkingOf(Key);
	return {
		Index: Record.Index,
		Title: Record.Title,
		Href: Record.Href,
		SealName: Record.Seal,
		Stamp: Record.Stamp ?? [],
		Route: RouteOf$1(Record),
		Service: Record.Route?.[1] ?? "",
		Status: {
			Label: Record.Status.Label,
			Value: Record.Status.Value
		},
		Metadata: Record.Metadata,
		Glyph: Glyphs[Key] ?? Symbol,
		Seal: Symbolic.has(Record.Seal) ? "symbol" : "figure",
		Symbol,
		Chips: ChipsOf(T(`home:architecture.${Key}.subtitle`, { defaultValue: English(Key).subtitle })),
		Body: T(`home:architecture.${Key}.description`, { defaultValue: English(Key).description }),
		Source: Record.Href,
		Span,
		Depth: Plates.has(Key) ? "plate" : "record",
		Register: Working?.Register ?? NoWorking,
		Trace: Working?.Trace ?? []
	};
};
/** The fifteen cards, in the baseline's order and at the baseline's widths. */
var ElementCards = (T) => Order.map(CardOf$1(T));
// Source/Content/Home/Feature.ts
/**
* The features band: six element records, one card each.
*
* The band prints records, not claims. Each card is the element's own
* `Content/Record/*.ts` entry - its marker, its two containment stamps, its
* route over the service line, its repository, its status and its four-row
* ledger - so the six cards are uniform by construction and no sentence is
* authored here.
*
* The six are the six the composition printed, in its own order. The other nine
* elements are not lost: they print in the architecture band two bands below this
* one, where all fifteen do.
*/
/**
* `"/HOST:MOUNTAIN"` as its key and its value.
*
* A record's route is written as one compact string because that is how the
* grammar prints it; the card needs the two halves in two inks, so the split
* happens here rather than in the template.
*/
var RouteOf = (Record) => {
	const Line = Record.Route?.[0] ?? "";
	const Body = Line.startsWith("/") ? Line.slice(1) : Line;
	const Split = Body.indexOf(":");
	if (Split < 0) return {
		Key: Body,
		Value: ""
	};
	return {
		Key: Body.slice(0, Split),
		Value: Body.slice(Split + 1)
	};
};
/** One record entry as the card's data. */
var CardOf = (Record) => ({
	Index: Record.Index,
	Title: Record.Title,
	Href: Record.Href,
	SealName: Record.Seal,
	Stamp: Record.Stamp ?? [],
	Route: RouteOf(Record),
	Service: Record.Route?.[1] ?? "",
	Status: {
		Label: Record.Status.Label,
		Value: Record.Status.Value
	},
	Metadata: Record.Metadata
});
/** The six cards, in the baseline's order. */
var FeatureCards = [
	Mountain,
	Cocoon,
	Wind,
	Sky,
	Air,
	Echo
].map(CardOf);
// Source/Content/Home/Stack.ts
/** The strip's own label, above the grid. */
var StackLabel = "TECH STACK";
/** The eight tiles, in the order the baseline printed them. */
var StackTiles = [
	{
		Name: "RUST CORE",
		Icon: "Cpu",
		Ink: "var(--SpineTCP)"
	},
	{
		Name: "TAURI UI",
		Icon: "Box",
		Ink: "var(--SpineIPC)"
	},
	{
		Name: "EFFECT-TS SERVICES",
		Icon: "Layers3",
		Ink: "var(--SpineWASM)"
	},
	{
		Name: "GRPC IPC",
		Icon: "Network",
		Ink: "var(--SpinegRPC)"
	},
	{
		Name: "EXTENSION HOST",
		Icon: "Puzzle",
		Ink: "var(--SpineWASM)"
	},
	{
		Name: "CROSS-PLATFORM",
		Icon: "Globe",
		Ink: "var(--SpineIPC)"
	},
	{
		Name: "VS CODE API",
		Icon: "Server",
		Ink: "var(--SpinegRPC)"
	},
	{
		Name: "OPEN SOURCE CC0",
		Icon: "Zap",
		Ink: "var(--SpineTCP)"
	}
];
/**
* How many tiles one row holds: the largest count that divides the set without
* leaving a short row, or the set itself when it is small enough to be one row.
*
* ─── WHY THE COUNT IS A DERIVATION AND NOT A STYLE ─────────────────────────
* A fixed column count is right for exactly the set it was written for: nine
* tiles in four columns leaves a row of one, and eight tiles in three leaves a
* row of two. A legend with a gap in it reads as a legend that lost a tile.
*
* So the count follows the SET, and the width only decides whether the set's own
* count still fits (`_Stack.scss` holds the floor and the arithmetic). Four
* divides eight, three divides nine, and a set with no divisor at all - seven,
* five, a prime - takes four and prints its short last row honestly, because a
* short row is a fact about the set and a hole is a fact about the layout.
*
* The small sets come first: one tile is one row, not a quarter of one.
*/
var StackTracks = (Tiles) => {
	if (Tiles.length <= 4) return Math.max(1, Tiles.length);
	for (const Tracks of [
		4,
		3,
		2
	]) if (Tiles.length % Tracks === 0 && Tiles.length / Tracks <= 4) return Tracks;
	return 4;
};
// Source/Component/Dynamic/Hero/Data.ts
/** The evidence plate. It lives under `Public/`, so the path is the URL. */
var Plate = "/Evidence/Land/NightGlass-01.png";
/** The two destinations that exist today. Neither is a "coming soon". */
var Documentation = "/Doc";
var Source = "/Download";
/**
* A ledger key, printed as the grammar prints it: `TARGET:`.
*
* The colon is grammar, not copy - it is part of the compact field-label form
* the record grammar defines - so it is added here rather than stored in five
* locale files where four of them would lose it. The translatable part is the
* word, and the word is what the locale files carry.
*/
var Label = (Word) => `${Word}:`;
/**
* The band, resolved once per render.
*
* The four-element rail is the runtime path the card names (Mountain → Cocoon →
* Sky → Wind), one line per element, and every line is a claim the tooltips in
* `hero.scene.cards.*` already carried: the rail is that prose in the shape an
* order is read in. The facts are the record's own two metadata blocks, kept
* verbatim - `TARGET`/`LICENSE`/`SIGNAL` say what the record is,
* `SPECIES`/`TEMP`/`WIND` are the specimen observation the field-record grammar
* has always printed beside it, and the hero prints only the first block (see
* `observation` below).
*/
var HeroBandFor = (T) => ({
	claim: {
		kicker: T("home:hero.claim.kicker", { defaultValue: "# LAND_01" }),
		runtime: T("home:hero.claim.runtime", { defaultValue: "RUST + TAURI" }),
		engine: T("home:hero.claim.engine", { defaultValue: "NO ELECTRON" }),
		route: T("home:hero.claim.route", { defaultValue: "/COMPAT: VS CODE" }),
		compat: T("home:hero.claim.compat", { defaultValue: "EXTENSIONS / UNMODIFIED" }),
		project: T("home:hero.claim.project", { defaultValue: "LAND:" }),
		relation: T("home:hero.claim.relation", { defaultValue: "EDITOR WITHOUT CHROMIUM" }),
		standfirst: T("home:hero.claim.standfirst", { defaultValue: "A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use." })
	},
	status: {
		copy: T("home:hero.status.copy", { defaultValue: "STATUS: SOURCE ACTIVE" }),
		chips: [
			T("home:hero.status.chip.release", { defaultValue: "PRE-RELEASE" }),
			T("home:hero.status.chip.installers", { defaultValue: "INSTALLERS PENDING" }),
			T("home:hero.status.chip.extensions", { defaultValue: "EXTENSION COVERAGE IN PROGRESS" })
		]
	},
	steps: [
		{
			index: "01",
			label: T("home:hero.step.mountain.label", { defaultValue: "Mountain" }),
			line: T("home:hero.step.mountain.line", { defaultValue: "Native Rust backend: files, terminals, processes and gRPC IPC - no Electron main process." })
		},
		{
			index: "02",
			label: T("home:hero.step.cocoon.label", { defaultValue: "Cocoon" }),
			line: T("home:hero.step.cocoon.line", { defaultValue: "Extension host: unmodified VS Code extensions on the VS Code API surface." })
		},
		{
			index: "03",
			label: T("home:hero.step.sky.label", { defaultValue: "Sky" }),
			line: T("home:hero.step.sky.line", { defaultValue: "Astro UI in the operating system WebView; Tauri events bridged to the workbench APIs." })
		},
		{
			index: "04",
			label: T("home:hero.step.wind.label", { defaultValue: "Wind" }),
			line: T("home:hero.step.wind.line", { defaultValue: "Effect-TS workbench services, one typed layer stack per runtime target." })
		}
	],
	facts: [
		{
			key: Label(T("home:hero.fact.target.label", { defaultValue: "TARGET" })),
			value: T("home:hero.fact.target.value", { defaultValue: "MACOS / WINDOWS / LINUX" })
		},
		{
			key: Label(T("home:hero.fact.license.label", { defaultValue: "LICENSE" })),
			value: T("home:hero.fact.license.value", { defaultValue: "CC0" })
		},
		{
			key: Label(T("home:hero.fact.signal.label", { defaultValue: "SIGNAL" })),
			value: T("home:hero.fact.signal.value", { defaultValue: "LOCAL-FIRST" })
		}
	],
	/**
	* The specimen observation. It is the second metadata block the hero has
	* always carried, and it is not a card row:
	* `DesignSystem-Components.md` §1 gives the hero record `TARGET / LICENSE /
	* SIGNAL` and caps it at four rows, so the observation prints in
	* `FeatureBand` (the `# OBSERVATION_01` band), as the filed specimen ledger
	* under the claims it qualifies.
	*/
	observation: [
		{
			key: Label(T("home:hero.fact.species.label", { defaultValue: "SPECIES" })),
			value: T("home:hero.fact.species.value", { defaultValue: "NOCTUA PRONUBA" })
		},
		{
			key: Label(T("home:hero.fact.temp.label", { defaultValue: "TEMP" })),
			value: T("home:hero.fact.temp.value", { defaultValue: "16.2 C" })
		},
		{
			key: Label(T("home:hero.fact.wind.label", { defaultValue: "WIND" })),
			value: T("home:hero.fact.wind.value", { defaultValue: "01.8 KM/H" })
		}
	],
	plate: {
		src: Plate,
		alt: T("home:hero.plate.alt", { defaultValue: "Rain-speckled glass reflecting a green light at night" }),
		caption: T("home:hero.plate.caption", { defaultValue: "Night glass: rain on the pane, one green light behind it." }),
		provenance: Plate
	},
	entry: [{
		label: T("home:hero.entry.documentation", { defaultValue: "/READ THE DOCUMENTATION" }),
		href: Documentation
	}, {
		label: T("home:hero.entry.source", { defaultValue: "/BUILD FROM SOURCE" }),
		href: Source,
		primary: true
	}],
	/**
	* The program line: three phrases, each an em-quad-separated run.
	*
	* U+2001 is the grammar's only separator, so it is the only one here - a
	* middle dot between the phrases is forbidden (`DESIGN.md` §1.5), and `→`
	* would claim a progression the three phrases are not. The line therefore
	* prints as one run of em-quad-separated verbs, and the grouping is carried
	* by the phrase order the data already has.
	*/
	program: [
		T("home:hero.program.verbs", { defaultValue: "WALK LISTEN SIGNAL" }),
		T("home:hero.program.values", { defaultValue: "NATIVE OPEN CROSS-PLATFORM" }),
		T("home:hero.program.actions", { defaultValue: "OPEN EDIT SHIP" })
	].join(" ")
});
/**
* The band with its own English defaults and no resolver.
*
* A caller that renders the hero without an i18n provider - a component test, a
* preview - hands no `band` prop. The band then renders its real copy instead of
* throwing or printing empty strings, which is the failure path this module
* exists to keep boring.
*/
var HeroBandDefault = () => HeroBandFor((_Key, Options) => Options.defaultValue);
// Source/Component/Dynamic/DynamicHeroSection.tsx
/**
* DynamicHeroSection - the homepage hero: the canonical **two-panel artifact**.
*
* `DesignSystem-Pages.md` §1, `DesignSystem-Components.md` §1 "Two-panel
* composition rules" and `DESIGN.md` §3.1 describe one shape, and this file
* renders it:
*
*   ┌────────────────────────────┬──────────────────────────────┐
*   │ FIELD RECORD (warm-white)  │ EVIDENCE (full-bleed, text-  │
*   │  # LAND_01          [SEAL] │ free image, object-fit:cover) │
*   │  〈RUST + TAURI〉          │                              │
*   │  ── hairline ──            │                              │
*   │  〈NO ELECTRON〉           │                              │
*   │  /COMPAT: VS CODE          │                              │
*   │  EXTENSIONS / UNMODIFIED   │                              │
*   │  WALK␁LISTEN␁SIGNAL …      │                              │
*   │  STATUS: SOURCE ACTIVE     │                              │
*   │  [MAJOR BLANK BAND 15-25%] │                              │
*   │  LAND:                     │                              │
*   │  ↳EDITOR WITHOUT CHROMIUM  │                              │
*   │  TARGET / LICENSE / SIGNAL │ caption ␁ provenance         │
*   │  [BUILD FROM SOURCE] /READ │                              │
*   └────────────────────────────┴──────────────────────────────┘
*   RUNTIME PATH  01 MOUNTAIN ─ 02 COCOON ─ 03 SKY ─ 04 WIND
*   TECH STACK    eight chips, one row
*
* The shape is a **panel with a foot**, and the foot is the composition's
* argument: the pair is the instrument (a claim beside its evidence), the trace
* is its wiring, and the stack is its legend. All three are one artifact and one
* screen.
*
* What each panel carries, and why the split is not decoration:
*
* 1. **The record panel** is the engineering: the index, the runtime claim, the
*    compatibility route, the program line, the release status, the blank band,
*    the subject, and the three metadata rows that say what the record is. One
*    left alignment line, one seal, one action. It is the half a reader
*    *reads*.
* 2. **The evidence panel** is the living counterweight: one image, full height,
*    `object-fit: cover`, with no text on it - `FieldRecordEvidence` "rejects
*    text overlays" because a picture with a caption over it is a poster, not
*    evidence. The caption and the provenance sit *below* the frame, where the
*    `RecordFigure` contract puts them, so the image stays text-free and the
*    claim of what it is evidence *of* still survives.
*
* The geometry is the documents', not this file's invention, and it lives in
* `Stylesheet/System/Component/Dynamic/_Hero.scss` - this file names classes and
* writes no style. `design_system.md`'s ratio blueprint sizes the pair: a
* three-track grid, `49fr 1px 51fr`, so the record panel measures 48.95-48.97% and
* the evidence panel 50.94-50.97% of the pair with the 1px hairline between them;
* the pair is padded `clamp(2rem, 5vw, 5rem)` on all four sides - the Portal
* hero's own outer inset - and the card is inset `2.75rem` block / `1.5rem`
* inline, which is the same `--card-padding-*` the Portal's `FieldRecordDataCard`
* publishes. The gutter's air comes from the pair's `column-gap`
* (`clamp(0.5rem, 1.5vw, 1.875rem)`), so the hairline stands between the panels
* rather than against either one, exactly as the Portal hero's does. The
* blueprint's separate 1.8-2.3% panel gap is not applied as a track - its own
* panel ranges already sum past 100% with a gap between them, so the ratio and
* the hairline win and the air is the gap. The 15-25% blank band is `flex-grow`
* over a floor of `--space-blank` - the token exists for exactly this band.
*
* On mobile the stack is card first, evidence second: the record arrives before
* the evidence (`DesignSystem-Components.md` §1).
*
* What is not in this band, and where the same strings are printed - the density
* budget (`DesignSystem-Grammar.md` §8) allows the hero one field record, one
* evidence image and one primary action, and nothing else:
*
* - the standfirst paragraph  -> `FeatureBand`, the `# OBSERVATION_01` band's
*   opening (the plain-language explanation belongs to the document structure,
*   `DesignSystem-Pages.md` §1);
* - the three status chips    -> `RoadmapBand`, the `# CONDITIONS_01` manifest's
*   stamped headers;
* - `SPECIES` / `TEMP` / `WIND` -> `FeatureBand`'s filed specimen ledger
*   (`Hero/Type.ts` `Metadata.observation`). The card keeps three rows; a
*   fourth block in it would break `DesignSystem-Components.md` §1's
*   `TARGET / LICENSE / SIGNAL` template and its four-row cap.
*
* Each is a move, not a deletion: the strings are the same strings, printed by
* the band whose layer owns them.
*
* The four-element rail is the hero's own: Mountain → Cocoon → Sky → Wind is the
* ordered process the claim asserts, so it prints as the panel's `RecordStage`
* (`DESIGN-COMPLETE.md` §5.2 row 3) - across the foot of the pair, never on the
* plate. `FeatureBand` prints no second copy, because the proof sits under the
* claim it proves and two copies of one rail on one page is not a proof, it is a
* habit. The steps are printed once.
*
* This stays a `.tsx` island because the page's `h1` and its record are one
* artifact and an `.astro` block cannot be imported from a `.tsx` file: the
* `Record*` blocks this record's ledger and evidence mount are `.astro`, and
* splitting the hero across two files would split the two-panel pair the person
* endorsed. The blocks therefore arrive as slots - `slot="ledger"` and
* `slot="stage"` - which Astro renders to HTML and hands this component as
* props (the React renderer's own slot bridge). The route carries the imports;
* this file places them. `FeatureBand` mounts the two blocks the hero's card
* cannot hold.
*/
/** The card's frame ink: the record panel is a warm-white Jelly surface. */
var CardInk = {
	"--jelly-fill": "var(--Card)",
	"--jelly-radius": "0",
	"--jelly-color-border-default": "var(--Border)",
	"--jelly-card-padding-block": "0",
	"--jelly-card-padding-inline": "0",
	"--jelly-card-font-size": "inherit",
	"--jelly-label": "var(--CardForeground)"
};
/**
* The action's Jelly ink.
*
* The same five properties `FieldRecordAction/Data.ts` hands the button arm.
* They are repeated as a mapping rather than imported because that constant is
* a *serialized CSS string* - the form an `.astro` element's `style` attribute
* takes - and React needs a property map.
*/
var ActionInk = {
	"--jelly-button-radius": "var(--RadiusButton)",
	"--jelly-button-height": "44px",
	"--jelly-button-padding-inline": "2.6rem",
	"--jelly-button-min-width": "0px",
	"--jelly-color-background-accent": "var(--Foreground)",
	"--jelly-color-foreground-on-accent": "var(--Background)"
};
/** The four corners, in the order `CornerMarks` prints them. */
var CORNERS = [
	"tl",
	"tr",
	"bl",
	"br"
];
/**
* Where a corner anchors its two arms. The values are `CornerMarks/Data.ts`'s
* own anchors, restated as the two style objects React needs; the *numbers*
* (inset, arm length, thickness, stem, ink, opacity) are read from that module,
* so the frame cannot drift from the block's.
*/
var ANCHOR = {
	tl: {
		block: "top",
		inline: "left",
		originH: "0 50%",
		originV: "50% 0"
	},
	tr: {
		block: "top",
		inline: "right",
		originH: "100% 50%",
		originV: "50% 0"
	},
	bl: {
		block: "bottom",
		inline: "left",
		originH: "0 50%",
		originV: "50% 100%"
	},
	br: {
		block: "bottom",
		inline: "right",
		originH: "100% 50%",
		originV: "50% 100%"
	}
};
/** One tick's box: its anchored edge, its arm span, and its slide origin.
*
* The numbers are the mark ladder's, read as tokens with `CornerMarks/Data.ts`'s
* values as the fallback - the same expression the Astro renderer emits, so the
* hero's frame and the component's frame are one frame and neither owns a
* number. The opacity is the GROUP's (`--mark-corner-ink`), so no tick carries
* one and the joint at each corner cannot double it. */
var TickStyle = (Corner, Axis) => {
	const Anchor = ANCHOR[Corner];
	const Inset = `var(--mark-inset, ${CORNER_GEOMETRY.Inset}px)`;
	return {
		position: "absolute",
		backgroundColor: CORNER_GEOMETRY.Color,
		top: Anchor.block === "top" ? Inset : void 0,
		bottom: Anchor.block === "bottom" ? Inset : void 0,
		left: Anchor.inline === "left" ? Inset : void 0,
		right: Anchor.inline === "right" ? Inset : void 0,
		width: Axis === "h" ? `var(--mark-arm, ${CORNER_GEOMETRY.Horizontal}px)` : `var(--mark-tick, ${CORNER_GEOMETRY.StemWidth}px)`,
		height: Axis === "h" ? `var(--mark-tick, ${CORNER_GEOMETRY.Thickness}px)` : `var(--mark-arm, ${CORNER_GEOMETRY.Vertical}px)`,
		transformOrigin: Axis === "h" ? Anchor.originH : Anchor.originV
	};
};
/** The eight ticks: per corner the horizontal arm first, then the vertical. */
var FRAME = CORNERS.flatMap((Corner) => ["h", "v"].map((Axis) => ({
	corner: Corner,
	axis: Axis,
	style: TickStyle(Corner, Axis)
})));
/** The record panel's picture-frame crosshairs (C19). */
var CornerFrame = () => /* @__PURE__ */ jsx("div", {
	"aria-hidden": "true",
	className: "CornerMarks pointer-events-none absolute inset-0",
	children: FRAME.map((Tick) => /* @__PURE__ */ jsx("span", {
		className: "CornerMarkTick",
		"data-corner": Tick.corner,
		"data-axis": Tick.axis,
		style: Tick.style
	}, `${Tick.corner}-${Tick.axis}`))
});
var DynamicHeroSection = ({ Content, Band, ClassName, ledger, stage }) => {
	const Hero = Band ?? HeroBandDefault();
	/** The page's own primary action, when it sets one. */
	const Primary = Content.PrimaryCTA?.Href;
	const Entry = Hero.entry.map((Destination) => Destination.primary && Primary ? {
		...Destination,
		href: Primary
	} : Destination);
	/**
	* The record offers one primary action (`DesignSystem-Grammar.md` §8) and
	* any further destination as a route line. Exactly one entry is marked
	* primary; the rest keep the `/LABEL` voice and read as routes, which is
	* what the field-record grammar has for a secondary destination.
	*
	* `at(0)` rather than `[0]` so a band handed no entries at all renders no
	* action instead of throwing on an undefined one.
	*/
	const Action = Entry.find((Destination) => Destination.primary) ?? Entry.at(0);
	const Routes = Entry.filter((Destination) => Destination !== Action);
	/**
	* The strip's wanted column count, derived from the set it prints.
	*
	* `StackTracks` is the data module's, not this file's: the count is a fact
	* about the tiles, and a component that recomputed it would be the second
	* place the number lived. The partial reads it as a CEILING - `max-inline-
	* size` per tile - so the count the set wants is also the count the row can
	* never exceed, and the width only decides whether the set's own count still
	* fits.
	*/
	const Tracks = StackTracks(StackTiles);
	/** Whether the record has an evidence plate to show at all. */
	const HasPlate = typeof Hero.plate.src === "string" && Hero.plate.src.trim().length > 0;
	return /* @__PURE__ */ jsxs("section", {
		id: "hero",
		"aria-labelledby": "hero-marker hero-claim",
		className: cn("hero-band", ClassName),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "hero-band__pair",
				"data-plate": HasPlate ? "rest" : "absent",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "hero-band__record",
						children: /* @__PURE__ */ jsx("jelly-card", {
							className: "hero-band__card",
							style: CardInk,
							children: /* @__PURE__ */ jsxs("div", {
								className: "CornerMarkShell hero-band__inset",
								children: [
									/* @__PURE__ */ jsx(CornerFrame, {}),
									/* @__PURE__ */ jsxs("div", {
										className: "hero-band__mark",
										children: [/* @__PURE__ */ jsx("p", {
											id: "hero-marker",
											className: "section-kicker hero-band__kicker",
											children: Hero.claim.kicker
										}), /* @__PURE__ */ jsx(FieldRecordSeal, {
											element: "Land",
											size: "m"
										})]
									}),
									/* @__PURE__ */ jsx("h1", {
										id: "hero-claim",
										className: "type-display hero-band__claim",
										children: /* @__PURE__ */ jsx(StampText, { Line: Hero.claim.runtime })
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "hero-band__stamps",
										children: [
											/* @__PURE__ */ jsxs("p", {
												className: "hero-band__stamp-pair",
												children: [/* @__PURE__ */ jsx("span", {
													className: "hero-band__engine",
													children: /* @__PURE__ */ jsx(StampText, { Line: Hero.claim.engine })
												}), /* @__PURE__ */ jsx("span", {
													className: "hero-band__route",
													children: /* @__PURE__ */ jsx(RouteText, { Line: Hero.claim.route })
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "type-meta hero-band__compat",
												children: Hero.claim.compat
											}),
											/* @__PURE__ */ jsx("p", {
												className: "type-meta hero-band__program",
												children: Hero.program
											})
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "hero-band__status",
										children: /* @__PURE__ */ jsx(FieldRecordStatus, {
											status: "active",
											copy: Hero.status.copy
										})
									}),
									/* @__PURE__ */ jsx("div", {
										"aria-hidden": "true",
										className: "hero-band__blank"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "type-section hero-band__subject",
										children: Hero.claim.project
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "type-meta hero-band__relation",
										children: [/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											children: "↳"
										}), Hero.claim.relation]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "hero-band__ledger",
										children: ledger ?? /* @__PURE__ */ jsx("dl", {
											className: "record-ledger record-ledger--1 hero-band__facts",
											children: Hero.facts.map((Fact) => /* @__PURE__ */ jsxs("div", {
												className: "record-ledger__row",
												children: [/* @__PURE__ */ jsx("dt", {
													className: "record-ledger__key",
													children: Fact.key
												}), /* @__PURE__ */ jsx("dd", {
													className: "record-ledger__value",
													children: Fact.value
												})]
											}, Fact.key))
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "hero-band__action",
										children: [Action ? /* @__PURE__ */ jsx("a", {
											className: "inline-block",
											href: Action.href,
											...Action.href.startsWith("http") ? {
												target: "_blank",
												rel: "noopener noreferrer"
											} : {},
											children: /* @__PURE__ */ jsx("jelly-button", {
												squish: true,
												style: ActionInk,
												children: /* @__PURE__ */ jsx("span", {
													className: "hero-band__action-label",
													children: Action.label
												})
											})
										}) : null, Routes.map((Destination) => /* @__PURE__ */ jsx("a", {
											className: "type-meta hero-band__destination",
											href: Destination.href,
											children: Destination.label
										}, Destination.href))]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": "true",
						className: "hero-band__gutter"
					}),
					/* @__PURE__ */ jsxs("figure", {
						className: "hero-band__evidence",
						children: [/* @__PURE__ */ jsx(FieldRecordEvidence, {
							alt: Hero.plate.alt,
							className: "hero-band__plate",
							position: "right",
							...Hero.plate.src === void 0 ? {} : { src: Hero.plate.src },
							...Hero.plate.state === void 0 ? {} : { state: Hero.plate.state }
						}), /* @__PURE__ */ jsxs("figcaption", {
							className: "type-meta hero-band__caption",
							children: [/* @__PURE__ */ jsx("span", { children: Hero.plate.caption }), /* @__PURE__ */ jsx("span", { children: Hero.plate.provenance })]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				"aria-labelledby": "hero-trace-label",
				className: "hero-band__trace",
				role: "group",
				children: [/* @__PURE__ */ jsx("p", {
					className: "hero-band__trace-label",
					id: "hero-trace-label",
					children: RailLabel
				}), stage]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hero-band__stack",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "hero-band__stack-label",
					children: [
						/* @__PURE__ */ jsx("span", { children: StackLabel }),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: " "
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hero-band__stack-count",
							children: `${String(StackTiles.length).padStart(2, "0")} TILES`
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					"aria-hidden": "true",
					className: "hero-band__stack-grid",
					"data-count": StackTiles.length,
					"data-tracks": Tracks,
					style: { "--stack-tracks": String(Tracks) },
					children: StackTiles.map((Tile) => {
						const Glyph = StackGlyphs[Tile.Icon] ?? Cpu;
						return /* @__PURE__ */ jsx("div", {
							className: "hero-band__stack-tile",
							children: /* @__PURE__ */ jsxs("div", {
								className: "hero-band__stack-inner",
								children: [/* @__PURE__ */ jsx(Glyph, {
									"aria-hidden": "true",
									className: "hero-band__stack-icon",
									size: 20,
									strokeWidth: 1.5,
									style: { color: Tile.Ink }
								}), /* @__PURE__ */ jsx("span", {
									className: "hero-band__stack-name",
									children: Tile.Name
								})]
							})
						}, Tile.Name);
					})
				})]
			})
		]
	});
};
/** The eight tile glyphs, by the name the strip's data carries. */
var StackGlyphs = {
	Box,
	Cpu,
	Globe,
	Layers3,
	Network,
	Puzzle,
	Server,
	Zap
};
// Source/Component/Home/Band.astro
createAstro("https://editor.land");
var $$Band = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Band;
	const { head, series, index = "01", rhythm = "beat" } = Astro.props;
	const IntervalOf = {
		rest: "rest",
		beat: "beat",
		break: "break",
		turn: "turn",
		wide: "break",
		tight: "beat"
	};
	const HeadingID = `${head.ID}Heading`;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(head.ID, "id")}${addAttribute(HeadingID, "aria-labelledby")} class="home-band"${addAttribute(IntervalOf[rhythm], "data-interval")}> <div class="home-band__inner"> <div class="home-band__head"> <p class="home-band__kicker"> ${series && renderTemplate`<span class="home-band__marker">${`# ${series}_${index}`}</span>`} ${series && renderTemplate`<span class="home-band__route" aria-hidden="true">
/
</span>`} <span class="home-band__name">${head.Kicker}</span> </p> <h2 class="home-band__heading"${addAttribute(HeadingID, "id")}> ${head.Heading} </h2> ${head.Standfirst && renderTemplate`<p class="home-band__standfirst">${head.Standfirst}</p>`} ${head.Stamp && renderTemplate`<div class="home-band__stamp"> ${head.Stamp.map((Line) => renderTemplate`<span class="home-band__stamp-line"> ${Line.Label && renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${Line.Label}: ` })}`} ${Line.Terms ? Line.Terms.map((Term, Index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${Index > 0 && " / "}<span${addAttribute(Term.Ink === void 0 ? void 0 : `color:${Term.Ink}`, "style")}> ${Term.Text} </span> ` })}`) : Line.Text} </span>`)} </div>`} </div> <div class="home-band__body"> ${renderSlot($$result, $$slots["default"])} </div> </div> </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/Band.astro", void 0);
// Source/Component/Home/Arrow.astro
var $$Arrow = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<svg class="home-record__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"> <path d="M15 3h6v6"></path> <path d="M10 14 21 3"></path> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path> </svg>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/Arrow.astro", void 0);
// Source/Component/Home/Tone.ts
/** The values that carry the specimen tone. */
var Specimen = /* @__PURE__ */ new Set(["ACTIVE", "VERIFIED"]);
/** The values that are deliberately quiet. */
var Quiet = /* @__PURE__ */ new Set(["PREPARING", "ARCHIVED"]);
/** Resolve a status value's tone. Case and spacing are the caller's to fix. */
var ToneOf = (Value) => {
	const Word = Value.trim().toUpperCase();
	if (Specimen.has(Word)) return "specimen";
	if (Quiet.has(Word)) return "quiet";
	return "ink";
};
// Source/Component/Home/RecordAnatomy.astro
createAstro("https://editor.land");
var $$RecordAnatomy = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordAnatomy;
	const { card } = Astro.props;
	return renderTemplate`${card.Stamp.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div class="home-record__stamps"> ${card.Stamp.map((Line) => renderTemplate`<p class="home-record__stamp"> <span class="home-record__bracket" aria-hidden="true">
〈
</span> <span class="home-record__stamp-text">${Line}</span> <span class="home-record__bracket" aria-hidden="true">
〉
</span> </p>`)} </div>`} <div class="home-record__route"> <p class="home-record__route-line"> <span class="home-record__slash" aria-hidden="true">
/
</span> <span class="home-record__route-key">${card.Route.Key}</span> <span class="home-record__route-value">:${card.Route.Value}</span> </p> <p class="home-record__service">${card.Service}</p> </div> ${renderSlot($$result, $$slots["after-route"])} <div class="home-record__status"> <span class="home-record__status-key">${card.Status.Label}:</span> <span class="home-record__status-value"${addAttribute(ToneOf(card.Status.Value), "data-tone")}> ${card.Status.Value} </span> </div> <dl class="home-record__meta"> ${card.Metadata.map((Row) => renderTemplate`<div class="home-record__row"> <dt class="home-record__key">${Row.Label}:</dt> <dd class="home-record__value">${Row.Value}</dd> </div>`)} </dl> ${renderSlot($$result, $$slots["default"])}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/RecordAnatomy.astro", void 0);
// Source/Component/Home/ElementCard.astro
createAstro("https://editor.land");
var $$ElementCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ElementCard;
	const { card } = Astro.props;
	const Seal = card.SealName;
	const Href = card.Source ?? card.Href;
	const RegisterRows = card.Register.map((Row) => ({
		key: `${Row.Label}:`,
		value: Row.Value,
		note: Row.Note,
		code: Row.Code,
		links: Row.Href === void 0 ? void 0 : [{
			text: Row.Value,
			href: Row.Href
		}]
	}));
	const ManualRoute = card.Register.find((Row) => Row.Label === "MANUAL")?.Value ?? "UNAVAILABLE";
	const TraceSteps = card.Trace.map((Step) => ({
		index: Step.Index,
		path: Step.Path,
		note: Step.Note
	}));
	return renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "home-card home-element",
		"data-depth": card.Depth,
		"style": `--masonry-col:${card.Span}`
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<article class="home-record"> <div class="home-record__head"> <span class="home-record__index">${card.Index}</span> <span class="home-record__seal" aria-hidden="true"> ${card.Seal === "symbol" ? renderTemplate`${renderComponent($$result, "SpecimenSeal", SealNeutral, { "className": "home-record__figure" })}` : renderTemplate`${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
		"element": Seal,
		"size": "s",
		"className": "home-record__figure"
	})}`} </span> </div> <div class="home-record__name-row"> <span class="home-record__name"> ${Href === void 0 ? card.Title : renderTemplate`<a class="home-record__name-link"${addAttribute(Href, "href")} target="_blank" rel="noopener noreferrer"> ${card.Title} </a>`} </span> <span class="home-record__glyph" aria-hidden="true"> ${card.Glyph} </span> ${Href !== void 0 && renderTemplate`<a class="home-record__source"${addAttribute(Href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`Open ${card.Title} source`, "aria-label")}> ${renderComponent($$result, "Arrow", $$Arrow, {})} </a>`} </div> ${card.Chips.length > 0 && renderTemplate`<ul class="home-record__chips"> ${card.Chips.map((Chip) => renderTemplate`<li class="home-record__chip"> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"shape": "square",
		"style": "--jelly-fill:var(--OSMacOSMute);--jelly-label:var(--CardForeground);--jelly-badge-radius:0;--jelly-badge-font-size:14px"
	}, { "default": ($$result) => renderTemplate` ${Chip} ` })} </li>`)} </ul>`} ${renderComponent($$result, "RecordAnatomy", $$RecordAnatomy, { "card": card }, { "default": ($$result) => renderTemplate` <p class="home-record__body">${card.Body}</p> <div class="home-record__working"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": RegisterRows,
		"density": "register",
		"register": RegisterOf("WORKING", RegisterRows),
		"state": RegisterRows.length === 0 ? "empty" : "rest",
		"empty": "NO WORKING IS RECORDED FOR THIS ELEMENT YET: THE RECORD PRINTS ITS OWN FACTS AND NAMES NO SOURCE."
	})} ${card.Depth === "plate" && renderTemplate`${renderComponent($$result, "RecordTrace", $$RecordTrace, { "trace": {
		steps: TraceSteps,
		label: card.Title,
		source: ManualRoute,
		empty: "NO TRACE IS RECORDED FOR THIS ELEMENT: ITS MANUAL PAGE NAMES NO FILE."
	} })}`} </div> ` })} </article> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/ElementCard.astro", void 0);
// Source/Component/Home/ArchitectureBand.astro
createAstro("https://editor.land");
var $$ArchitectureBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArchitectureBand;
	const T = GetI18n();
	const Head = BandOf(HomeBands(T), "testimonials");
	const Cards = Astro.props.cards ?? ElementCards(T);
	return renderTemplate`${renderComponent($$result, "Band", $$Band, {
		"head": Head,
		"series": "CLASSIFICATION",
		"rhythm": Sequence.testimonials
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="home-element__grid"> ${Cards.map((Card) => renderTemplate`${renderComponent($$result, "ElementCard", $$ElementCard, { "card": Card })}`)} </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/ArchitectureBand.astro", void 0);
// Source/Component/Home/FeatureCard.astro
createAstro("https://editor.land");
var $$FeatureCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FeatureCard;
	const { card } = Astro.props;
	const Seal = card.SealName;
	const Fill = JellyCardFill(card.SealName);
	return renderTemplate`${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "home-card home-feature",
		"style": `--jelly-fill:${Fill}`
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<article class="home-record"> <div class="home-record__head"> <span class="home-record__index">${card.Index}</span> <span class="home-record__seal" aria-hidden="true"> ${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
		"element": Seal,
		"size": "s",
		"className": "home-record__figure"
	})} </span> </div> ${renderComponent($$result, "RecordAnatomy", $$RecordAnatomy, { "card": card }, { "after-route": ($$result) => renderTemplate`<div class="home-record__link-row"> <a class="home-record__link"${addAttribute(card.Href, "href")} target="_blank" rel="noopener noreferrer"> ${card.Title}: ${renderComponent($$result, "Arrow", $$Arrow, {})} </a> </div>` })} </article> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/FeatureCard.astro", void 0);
// Source/Component/Home/FeatureBand.astro
createAstro("https://editor.land");
var $$FeatureBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FeatureBand;
	const { cards = FeatureCards, of = FeatureCards } = Astro.props;
	const T = GetI18n();
	const Head = BandOf(HomeBands(T), "features");
	const Observation = HeroBandFor(T).observation;
	const Ceiling = (Count) => {
		if (Count <= 1) return 1;
		if (Count % 3 === 0) return 3;
		if (Count % 2 === 0) return 2;
		return 3;
	};
	const CeilingOf = Ceiling(cards.length);
	const Remainder = CeilingOf === 0 ? 0 : cards.length % CeilingOf;
	const Subset = cards.length === 0 || cards.length === of.length ? void 0 : RegisterOf("RECORDS", cards);
	return renderTemplate`${renderComponent($$result, "Band", $$Band, {
		"head": Head,
		"series": "OBSERVATION",
		"rhythm": Sequence.features
	}, { "default": ($$result) => renderTemplate`${cards.length === 0 ? renderTemplate`${maybeRenderHead($$result)}<p class="home-feature__empty"> <span class="home-feature__empty-key">RECORDS:</span>${" "} <span class="home-feature__empty-value">UNAVAILABLE</span> <span class="home-feature__empty-note">
The plate files no record: the band was handed an empty set, and
				an empty plate is stated rather than drawn as an empty grid.
</span> </p>` : renderTemplate`<div class="home-feature__grid PageShell__row"${addAttribute(cards.length, "data-count")}${addAttribute(Remainder, "data-remainder")}${addAttribute(CeilingOf, "data-tracks")}${addAttribute(`--row-tracks:${CeilingOf}`, "style")}> ${cards.map((Card) => renderTemplate`${renderComponent($$result, "FeatureCard", $$FeatureCard, { "card": Card })}`)} </div>`}${Subset && renderTemplate`<div class="home-feature__subset">  ${renderComponent($$result, "Register", $$Register, {
		"register": Subset,
		"class": "home-feature__subset-register"
	})} <p class="home-feature__subset-row"> <span class="home-feature__subset-key">SELECTION:</span>${" "} ${`${String(cards.length).padStart(2, "0")} OF ${String(of.length).padStart(2, "0")}`} </p> </div>`}<div class="home-feature__specimen"> <p class="home-feature__specimen-label">${ObservationLabel}</p> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": Observation,
		"class": "home-feature__specimen-ledger"
	})} </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/FeatureBand.astro", void 0);
// Source/Component/Home/PlatformCard.astro
createAstro("https://editor.land");
var $$PlatformCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PlatformCard;
	const { card } = Astro.props;
	const Glyph = {
		Apple,
		Monitor,
		Terminal
	}[card.Icon] ?? Monitor;
	return renderTemplate`${maybeRenderHead($$result)}<div class="home-platform"> <div class="home-platform__id"> <span class="home-platform__index">${card.Index}</span> <h3 class="home-platform__name"${addAttribute(`color:${card.Ink}`, "style")}> ${renderComponent($$result, "Glyph", Glyph, {
		"className": "home-platform__icon",
		"size": 18,
		"aria-hidden": "true"
	})} ${card.Name} </h3> <p class="home-platform__architecture"> <span class="home-record__bracket" aria-hidden="true">
〈
</span> ${card.Architecture} <span class="home-record__bracket" aria-hidden="true">
〉
</span> </p> </div> <div class="home-platform__facts"> <p class="home-platform__route"> <span class="home-record__slash" aria-hidden="true">
/
</span> <span class="home-record__route-key">CHANNEL</span> <span class="home-record__route-value">: ${card.Channel}</span> </p> <dl class="home-platform__ledger"> <div class="home-platform__row"> <dt class="home-platform__key">Version:</dt> <dd class="home-platform__value">${card.Version}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">Size:</dt> <dd class="home-platform__value">${card.Size}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">SIGNING:</dt> <dd class="home-platform__value">${card.Signing}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">WEBVIEW:</dt> <dd class="home-platform__value">${card.Webview}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">MINIMUM:</dt> <dd class="home-platform__value">${card.Minimum}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">CHECKSUM:</dt> <dd class="home-platform__value">${card.Checksum}</dd> </div> <div class="home-platform__row"> <dt class="home-platform__key">TOOLCHAIN:</dt> <dd class="home-platform__value">${card.Toolchain}</dd> </div> </dl>  <p class="home-platform__note"> <span class="home-record__status-key">NOTE:</span> ${card.Note} </p> <p class="home-platform__status"> <span class="home-record__status-key">${card.Status.Label}</span> <span class="home-record__status-value"${addAttribute(ToneOf(card.Status.Value), "data-tone")}> ${card.Status.Value} </span> </p> <div class="home-platform__action"> <a class="home-platform__anchor"${addAttribute(card.Action.Href, "href")}> ${renderComponent($$result, "jelly-button", "jelly-button", {
		"class": "PlatformDownloadButton",
		"style": "--jelly-button-radius:var(--RadiusButton);--jelly-button-height:40px;--jelly-button-padding-inline:1.25rem;--jelly-button-min-width:0px;--jelly-color-background-accent:var(--Foreground);--jelly-color-foreground-on-accent:var(--Background)"
	}, { "default": ($$result) => renderTemplate` ${card.Action.Label} ` })} </a> </div> </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/PlatformCard.astro", void 0);
// Source/Component/Home/PlatformBand.astro
createAstro("https://editor.land");
var $$PlatformBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PlatformBand;
	const { cards = PlatformCards } = Astro.props;
	const T = GetI18n();
	const Head = BandOf(HomeBands(T), "download");
	return renderTemplate`${renderComponent($$result, "Band", $$Band, {
		"head": Head,
		"series": "ACTION",
		"rhythm": Sequence.download
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "jelly-card", "jelly-card", {
		"class": "home-platform__manifest",
		"data-count": cards.length
	}, { "default": ($$result) => renderTemplate` ${cards.length === 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="home-platform__absent"> <p class="home-platform__absent-line"> <span class="home-platform__absent-key">ARTIFACTS:</span> <span class="home-platform__absent-value">UNAVAILABLE</span> </p> <p class="home-platform__absent-note">
No artefact is filed for any platform, so the manifest has no
					row to print. Nothing is downloadable yet: every build is
					made from source, and the source is the record this page
					points at.
</p> <p class="home-platform__absent-line"> <span class="home-platform__absent-key">CHANNEL:</span> <span class="home-platform__absent-value">SOURCE</span> </p> </div>` : cards.map((Card) => renderTemplate`${renderComponent($$result, "PlatformCard", $$PlatformCard, { "card": Card })}`)} ` })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/PlatformBand.astro", void 0);
// Source/Component/Home/ReleaseCard.astro
createAstro("https://editor.land");
var $$ReleaseCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ReleaseCard;
	const { card } = Astro.props;
	const Primary = card.Index === "# RELEASE_01";
	return renderTemplate`${maybeRenderHead($$result)}<article class="home-release"> <div class="home-release__head"> <div class="home-release__stamp"> <span class="home-release__index">${card.Index}</span> ${card.Stamp.map((Line) => renderTemplate`<span class="home-release__stamp-line"> ${Line.map((Span) => renderTemplate`<span${addAttribute(Span.Ink === void 0 ? void 0 : `color:${Span.Ink}`, "style")}> ${Span.Text} </span>`)} </span>`)} </div> <div class="home-release__action"> ${Primary ? renderTemplate`<a class="home-release__anchor"${addAttribute(card.Action.Href, "href")} target="_blank" rel="noopener noreferrer"> ${renderComponent($$result, "jelly-button", "jelly-button", {
		"block": true,
		"style": "--jelly-button-radius:var(--RadiusButton);--jelly-button-height:44px;--jelly-button-padding-inline:2.6rem;--jelly-button-min-width:0px;--jelly-color-background-accent:var(--Foreground);--jelly-color-foreground-on-accent:var(--Background)"
	}, { "default": ($$result) => renderTemplate` ${card.Action.Label} ` })} </a>` : renderTemplate`<a class="home-release__destination"${addAttribute(card.Action.Href, "href")} target="_blank" rel="noopener noreferrer"> <span aria-hidden="true">/</span> ${card.Action.Label} </a>`} </div> <h3 class="home-release__title">${card.Title}</h3> </div> <div class="home-release__body"> <p class="home-release__section">Elements</p> <ul class="home-release__list"> ${card.Elements.map((Element) => renderTemplate`<li class="home-release__item"> <a class="home-release__element"${addAttribute(Element.Href, "href")}${addAttribute(`color:${Element.Ink}`, "style")}> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"shape": "square",
		"style": "--jelly-fill:var(--SpineIPCMute);--jelly-label:currentColor;--jelly-badge-radius:0px;--jelly-badge-font-size:0.78em"
	}, { "default": ($$result) => renderTemplate` ${Element.Name} ` })} </a> <span class="home-release__role">${Element.Role}</span> <span class="home-release__line"> ${Element.Before} ${Element.Badge && renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${" "}${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"shape": "square",
		"style": "--jelly-fill:var(--SpineIPCMute);--jelly-label:currentColor;--jelly-badge-radius:0px;--jelly-badge-font-size:0.78em"
	}, { "default": ($$result) => renderTemplate` ${Element.Badge} ` })}${" "}` })}`} ${Element.After} </span> </li>`)} </ul> <p class="home-release__section">Manifest</p> <ul class="home-release__manifest"> ${card.Manifest.map((Line) => renderTemplate`<li class="home-release__manifest-row"> <span>${Line}</span> </li>`)} </ul> </div> </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/ReleaseCard.astro", void 0);
// Source/Component/Home/RoadmapBand.astro
createAstro("https://editor.land");
var $$RoadmapBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RoadmapBand;
	const T = GetI18n();
	const Head = BandOf(HomeBands(T), "pricing");
	const States = Astro.props.cards ?? ReleaseCards;
	return renderTemplate`${renderComponent($$result, "Band", $$Band, {
		"head": Head,
		"series": "CONDITIONS",
		"rhythm": Sequence.pricing
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "jelly-card", "jelly-card", { "class": "home-manifest" }, { "default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="home-manifest__grid"> ${States.map((Card, Index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate` ${Index > 0 && renderTemplate`<div class="home-manifest__gutter" aria-hidden="true"></div>`} ${renderComponent($$result, "ReleaseCard", $$ReleaseCard, { "card": Card })} ` })}`)} </div> ` })} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/RoadmapBand.astro", void 0);
// Source/Content/Home/Working.ts
/**
* The build's six stages, from `Content/doc/build-pipeline.md`.
*
* The `Path` is what the manual gives for the stage: a submodule path, a
* command, a generated file, a script. It is printed in the mono register
* because every one of them is a literal.
*/
var BuildTrace = [
	{
		Index: "01",
		Path: "Dependency/Microsoft/Dependency/Editor",
		Note: "VS CODE PLATFORM COMPILE"
	},
	{
		Index: "02",
		Path: "pnpm prepublishOnly",
		Note: "WIND COCOON OUTPUT SKY WORKER"
	},
	{
		Index: "03",
		Path: "extensions.manifest.json",
		Note: "PREBAKE WRITES THE EXTENSION INDEX"
	},
	{
		Index: "04",
		Path: "cargo build -p Mountain",
		Note: "THE NATIVE BACKEND"
	},
	{
		Index: "05",
		Path: "pnpm tauri build",
		Note: "THE APPLICATION BUNDLE"
	},
	{
		Index: "06",
		Path: "Maintain/Script/SignBundle.sh",
		Note: "QUARANTINE STRIPPED ENTITLEMENTS RE-APPLIED"
	}
];
/**
* What the build produces, as twelve facts.
*
* Six of the twelve cannot be answered today and print `UNAVAILABLE` with the
* reason under them. That is the band's honest centre: the source builds, and no
* release artifact exists to describe. A register that dropped those six rows
* would be a shorter lie.
*/
var ReleaseRegister = [
	{
		Label: "VERSION",
		Value: "UNAVAILABLE",
		Note: "NO PUBLISHED RELEASE"
	},
	{
		Label: "CHANNEL",
		Value: "PUBLIC"
	},
	{
		Label: "ARTIFACTS",
		Value: "0",
		Note: "NOTHING TO DOWNLOAD"
	},
	{
		Label: "SIGNATURE",
		Value: "UNAVAILABLE",
		Note: "NOTHING TO SIGN"
	},
	{
		Label: "CHECKSUM",
		Value: "UNAVAILABLE",
		Note: "NOTHING TO DIGEST"
	},
	{
		Label: "SIZE",
		Value: "UNAVAILABLE",
		Note: "NOTHING TO MEASURE"
	},
	{
		Label: "TARGETS",
		Value: "3",
		Note: "MACOS WINDOWS LINUX"
	},
	{
		Label: "TOOLCHAIN",
		Value: "RUST TAURI NODE 24"
	},
	{
		Label: "STAGES",
		Value: "6",
		Note: "/DOC/BUILD-PIPELINE"
	},
	{
		Label: "BUILT BY",
		Value: "Maintain/Debug/Build.sh",
		Code: true
	},
	{
		Label: "VERIFIED BY",
		Value: "UNAVAILABLE",
		Note: "NO PUBLISHED DIGEST"
	},
	{
		Label: "AS OF",
		Value: "c0ebf97fc",
		Code: true,
		Note: "THE BASELINE THIS PAGE DESCRIBES"
	}
];
/**
* The three documented failures, in the order a first run meets them: the window
* opens blank, the bundle crashes on a missing field, the signed app is refused.
*/
var Failures = [
	{
		Index: "FAILURE_01",
		Name: "BLANK WORKBENCH",
		Symptom: "THE WINDOW OPENS AND THE WORKBENCH STAYS BLANK THE EXTENSION HOST NEVER ACTIVATES",
		Cause: "COCOON DID NOT CONNECT WITHIN THE 30 SECOND GRPC BUDGET PORT 50051 OR 50052 ALREADY IN USE",
		Next: "lsof -i :50051 -i :50052 KILL THE ORPHAN OR CHANGE THE PORTS IN .env.Land",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING"
	},
	{
		Index: "FAILURE_02",
		Name: "PATH ARGUMENT",
		Symptom: "THE BUNDLED WORKBENCH CRASHES AT STARTUP WITH THE path ARGUMENT MUST BE OF TYPE STRING",
		Cause: "ISandboxConfiguration.profiles WAS MISSING IN MOUNTAIN'S ConstructSandboxConfiguration",
		Next: "REBUILD MOUNTAIN AFTER ANY CHANGE TO InitializationData.rs THEN WIPE THE VITE CACHE",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING"
	},
	{
		Index: "FAILURE_03",
		Name: "DAMAGED BUNDLE",
		Symptom: "GATEKEEPER REFUSES THE APP AS DAMAGED OR INCOMPLETE codesign --verify REPORTS not signed",
		Cause: "TAURI DOES NOT RE-SIGN THE BUNDLE AFTER IT COPIES THE COCOON NODE BINARY INTO THE .app",
		Next: "BundleLevel=debug sh Maintain/Script/SignBundle.sh AFTER EVERY BUILD",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING"
	}
];
/**
* The band's own labels.
*
* The head - kicker, heading, standfirst - is `Content/Home/Band.ts`'s, like
* every other band's: a second copy here would be two places to change the
* sentence the band opens on. What lives here is what belongs to the artifacts:
* the trace's label, the register's name and the band's provenance line.
*/
var WorkingBandCopy = {
	Footnote: "SOURCE: /DOC/BUILD-PIPELINE /DOC/TROUBLESHOOTING EVERY FIGURE ON THIS BAND IS READ FROM THE MANUAL, NOT MEASURED AT RUNTIME",
	TraceLabel: "BUILD",
	RegisterLabel: "WORKING_01"
};
// Source/Component/Home/WorkingBand.astro
var $$WorkingBand = createComponent(($$result, $$props, $$slots) => {
	const T = GetI18n();
	const Head = BandOf(HomeBands(T), "method");
	const RegisterRows = ReleaseRegister.map((Row) => ({
		key: `${Row.Label}:`,
		value: Row.Value,
		note: Row.Note,
		code: Row.Code
	}));
	const FailureNotes = Failures.map((Failure) => ({
		index: Failure.Index,
		name: Failure.Name,
		symptom: Failure.Symptom,
		cause: Failure.Cause,
		next: Failure.Next,
		state: Failure.State,
		source: Failure.Source
	}));
	const TraceSteps = BuildTrace.map((Step) => ({
		index: Step.Index,
		path: Step.Path,
		note: Step.Note
	}));
	return renderTemplate`${renderComponent($$result, "Band", $$Band, {
		"head": Head,
		"series": "METHOD",
		"rhythm": Sequence.method
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="home-working"> <div class="home-working__split"> <div class="home-working__trace"> ${renderComponent($$result, "RecordTrace", $$RecordTrace, { "trace": {
		steps: TraceSteps,
		label: WorkingBandCopy.TraceLabel,
		source: "/DOC/BUILD-PIPELINE"
	} })} </div> <div class="home-working__gutter" aria-hidden="true"></div> <div class="home-working__register"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": RegisterRows,
		"density": "register",
		"register": RegisterOf(WorkingBandCopy.RegisterLabel, RegisterRows),
		"empty": "THE RELEASE RECORD IS NOT WRITTEN YET: NO ARTIFACT EXISTS TO DESCRIBE."
	})} </div> </div> <div class="home-working__failures"> ${FailureNotes.map((Failure) => renderTemplate`<div class="home-working__failure"> ${renderComponent($$result, "RecordFailure", $$RecordFailure, { "failure": Failure })} </div>`)} </div> <p class="home-working__footnote">${WorkingBandCopy.Footnote}</p> </div> ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Home/WorkingBand.astro", void 0);
export { ItemsOf as C, FiledOf as S, $$RecordFailure as _, $$PlatformCard as a, Empty as b, $$ArchitectureBand as c, $$Arrow as d, $$Band as f, ElementCards as g, FeatureCards as h, $$PlatformBand as i, $$ElementCard as l, HeroBandFor as m, $$RoadmapBand as n, $$FeatureBand as o, DynamicHeroSection as p, $$ReleaseCard as r, $$FeatureCard as s, $$WorkingBand as t, $$RecordAnatomy as u, ClaimsOf as v, JellyCardFill as w, FiledLabel as x, ElementOrder as y };
