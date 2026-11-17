/**
 * Data - the homepage hero band, as data.
 *
 * The band says four things in this order: the claim, the status, the evidence
 * and the entry. Every string and every row is here, so `DynamicHeroSection`
 * maps data and writes no copy, and a reviewer reads the band's whole content
 * in one place instead of between tags.
 *
 * English copy lives both here (the `defaultValue`) and in
 * `Source/Library/I18n/Locale/En/Home.json` under `hero.*` - change both or the
 * JSON silently overrides the call site (BRIDGE §8.6).
 *
 * Paths and hrefs are constants rather than keys: a locale must never be able
 * to break a destination, and the plate's file name is provenance, not prose.
 */
import type { HeroBand, Translate } from "./Type.js";

/** The evidence plate. It lives under `Public/`, so the path is the URL. */
const Plate = "/Evidence/Land/NightGlass-01.png";

/** The two destinations that exist today. Neither is a "coming soon". */
const Documentation = "/Doc";

const Source = "/Download";

/**
 * The band, resolved once per render.
 *
 * The four-element rail is the runtime path the card names (Mountain → Cocoon →
 * Sky → Wind), one line per element, and every line is a claim the tooltips in
 * `hero.scene.cards.*` already carried: the rail is that prose in the shape an
 * order is read in. The facts are the record's own two metadata blocks, kept
 * verbatim - `TARGET`/`LICENSE`/`SIGNAL` say what the record is,
 * `SPECIES`/`TEMP`/`WIND` are the specimen observation the field-record grammar
 * has always printed beside it.
 */
const HeroBandFor = (T: Translate): HeroBand => ({
	claim: {
		kicker: T("home:hero.claim.kicker", { defaultValue: "# LAND_01" }),

		runtime: T("home:hero.claim.runtime", { defaultValue: "RUST + TAURI" }),

		engine: T("home:hero.claim.engine", { defaultValue: "NO ELECTRON" }),

		route: T("home:hero.claim.route", { defaultValue: "/COMPAT: VS CODE" }),

		compat: T("home:hero.claim.compat", {
			defaultValue: "EXTENSIONS / UNMODIFIED",
		}),

		project: T("home:hero.claim.project", { defaultValue: "LAND:" }),

		relation: T("home:hero.claim.relation", {
			defaultValue: "EDITOR WITHOUT CHROMIUM",
		}),

		standfirst: T("home:hero.claim.standfirst", {
			defaultValue:
				"A native code editor with the soul of VS Code - and none of the browser. Built on Rust and Tauri, compatible with the extensions you already use.",
		}),
	},

	status: {
		copy: T("home:hero.status.copy", {
			defaultValue: "STATUS: SOURCE ACTIVE",
		}),

		chips: [
			T("home:hero.status.chip.release", { defaultValue: "PRE-RELEASE" }),

			T("home:hero.status.chip.installers", {
				defaultValue: "INSTALLERS PENDING",
			}),

			T("home:hero.status.chip.extensions", {
				defaultValue: "EXTENSION COVERAGE IN PROGRESS",
			}),
		],
	},

	steps: [
		{
			index: "01",

			label: T("home:hero.step.mountain.label", {
				defaultValue: "Mountain",
			}),

			line: T("home:hero.step.mountain.line", {
				defaultValue:
					"Native Rust backend: files, terminals, processes and gRPC IPC - no Electron main process.",
			}),
		},

		{
			index: "02",

			label: T("home:hero.step.cocoon.label", { defaultValue: "Cocoon" }),

			line: T("home:hero.step.cocoon.line", {
				defaultValue:
					"Extension host: unmodified VS Code extensions on the VS Code API surface.",
			}),
		},

		{
			index: "03",

			label: T("home:hero.step.sky.label", { defaultValue: "Sky" }),

			line: T("home:hero.step.sky.line", {
				defaultValue:
					"Astro UI in the operating system WebView; Tauri events bridged to the workbench APIs.",
			}),
		},

		{
			index: "04",

			label: T("home:hero.step.wind.label", { defaultValue: "Wind" }),

			line: T("home:hero.step.wind.line", {
				defaultValue:
					"Effect-TS workbench services, one typed layer stack per runtime target.",
			}),
		},
	],

	facts: [
		{
			key: T("home:hero.fact.target.label", { defaultValue: "TARGET" }),

			value: T("home:hero.fact.target.value", {
				defaultValue: "MACOS / WINDOWS / LINUX",
			}),
		},

		{
			key: T("home:hero.fact.license.label", { defaultValue: "LICENSE" }),

			value: T("home:hero.fact.license.value", { defaultValue: "CC0" }),
		},

		{
			key: T("home:hero.fact.signal.label", { defaultValue: "SIGNAL" }),

			value: T("home:hero.fact.signal.value", {
				defaultValue: "LOCAL-FIRST",
			}),
		},
	],

	/**
	 * The specimen observation. It is the second metadata block the hero has
	 * always carried, and it is not a card row:
	 * `DesignSystem-Components.md` §1 gives the hero record `TARGET / LICENSE /
	 * SIGNAL` and caps it at four rows, so the observation prints in
	 * `FeatureBand` (the `#features` layer), as the filed specimen ledger under
	 * the claims it qualifies.
	 */
	observation: [
		{
			key: T("home:hero.fact.species.label", { defaultValue: "SPECIES" }),

			value: T("home:hero.fact.species.value", {
				defaultValue: "NOCTUA PRONUBA",
			}),
		},

		{
			key: T("home:hero.fact.temp.label", { defaultValue: "TEMP" }),

			value: T("home:hero.fact.temp.value", { defaultValue: "16.2 C" }),
		},

		{
			key: T("home:hero.fact.wind.label", { defaultValue: "WIND" }),

			value: T("home:hero.fact.wind.value", {
				defaultValue: "01.8 KM/H",
			}),
		},
	],

	plate: {
		src: Plate,

		alt: T("home:hero.plate.alt", {
			defaultValue:
				"Rain-speckled glass reflecting a green light at night",
		}),

		caption: T("home:hero.plate.caption", {
			defaultValue:
				"Night glass: rain on the pane, one green light behind it.",
		}),

		provenance: Plate,
	},

	entry: [
		{
			label: T("home:hero.entry.documentation", {
				defaultValue: "/READ THE DOCUMENTATION",
			}),

			href: Documentation,
		},

		{
			label: T("home:hero.entry.source", {
				defaultValue: "/BUILD FROM SOURCE",
			}),

			href: Source,

			primary: true,
		},
	],

	program: [
		T("home:hero.program.verbs", {
			defaultValue: "WALK\u2001LISTEN\u2001SIGNAL",
		}),

		T("home:hero.program.values", {
			defaultValue: "NATIVE\u2001OPEN\u2001CROSS-PLATFORM",
		}),

		T("home:hero.program.actions", {
			defaultValue: "OPEN\u2001EDIT\u2001SHIP",
		}),
	].join("\u2001·\u2001"),
});

/**
 * The band with its own English defaults and no resolver.
 *
 * A caller that renders the hero without an i18n provider - a component test, a
 * preview - hands no `band` prop. The band then renders its real copy instead of
 * throwing or printing empty strings, which is the failure path this module
 * exists to keep boring.
 */
const HeroBandDefault = (): HeroBand =>
	HeroBandFor((_Key, Options) => Options.defaultValue);

export { HeroBandDefault, HeroBandFor };
